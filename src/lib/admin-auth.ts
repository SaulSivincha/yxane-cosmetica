import "server-only";

import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const sessionCookieName = "yxane_admin_session";
const sessionDurationMs = 1000 * 60 * 60 * 8;
const passwordKeyLength = 64;

type SessionPayload = {
  adminId: string;
  expiresAt: number;
};

function getSessionSecret() {
  const secret =
    process.env.ADMIN_SESSION_SECRET ??
    process.env.DIRECT_URL ??
    process.env.DATABASE_URL;

  if (!secret) {
    throw new Error("Missing ADMIN_SESSION_SECRET environment variable.");
  }

  return secret;
}

function signPayload(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
}

function encodeSession(payload: SessionPayload) {
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = signPayload(body);

  return `${body}.${signature}`;
}

function decodeSession(value?: string): SessionPayload | null {
  if (!value) {
    return null;
  }

  const [body, signature] = value.split(".");

  if (!body || !signature) {
    return null;
  }

  const expectedSignature = signPayload(body);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as SessionPayload;

    if (!payload.adminId || payload.expiresAt < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, passwordKeyLength).toString("hex");

  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(password: string, passwordHash: string) {
  const [algorithm, salt, storedHash] = passwordHash.split(":");

  if (algorithm !== "scrypt" || !salt || !storedHash) {
    return false;
  }

  const hash = scryptSync(password, salt, passwordKeyLength);
  const storedHashBuffer = Buffer.from(storedHash, "hex");

  return (
    hash.length === storedHashBuffer.length &&
    timingSafeEqual(hash, storedHashBuffer)
  );
}

export async function createAdminSession(adminId: string) {
  const cookieStore = await cookies();
  const expiresAt = Date.now() + sessionDurationMs;

  cookieStore.set(sessionCookieName, encodeSession({ adminId, expiresAt }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();

  cookieStore.delete(sessionCookieName);
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const payload = decodeSession(cookieStore.get(sessionCookieName)?.value);

  if (!payload) {
    return null;
  }

  return prisma.adminUser.findUnique({
    where: { id: payload.adminId },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  });
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
}

export async function canRegisterAdmin() {
  const adminCount = await prisma.adminUser.count();

  if (adminCount === 0) {
    return true;
  }

  return Boolean(await getCurrentAdmin());
}
