import { NextResponse, type NextRequest } from "next/server";

const sessionCookieName = "yxane_admin_session";

function getSessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    process.env.DIRECT_URL ??
    process.env.DATABASE_URL ??
    ""
  );
}

function bytesToHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function base64UrlToString(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const paddingLength = (4 - (base64.length % 4)) % 4;

  return atob(base64.padEnd(base64.length + paddingLength, "="));
}

async function signPayload(payload: string) {
  const secret = getSessionSecret();

  if (!secret) {
    return "";
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );

  return bytesToHex(signature);
}

async function hasValidAdminSession(request: NextRequest) {
  const session = request.cookies.get(sessionCookieName)?.value;

  if (!session) {
    return false;
  }

  const [body, signature] = session.split(".");

  if (!body || !signature) {
    return false;
  }

  const expectedSignature = await signPayload(body);

  if (signature !== expectedSignature) {
    return false;
  }

  try {
    const payload = JSON.parse(base64UrlToString(body)) as {
      adminId?: string;
      expiresAt?: number;
    };

    return Boolean(
      payload.adminId &&
        payload.expiresAt &&
        payload.expiresAt > Date.now(),
    );
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminLoginRoute =
    pathname === "/admin/login" || pathname === "/admin/registro";
  const hasAdminSession = await hasValidAdminSession(request);

  if (hasAdminSession && !isAdminRoute) {
    return NextResponse.redirect(new URL("/admin/pedidos", request.url));
  }

  if (hasAdminSession && isAdminLoginRoute) {
    return NextResponse.redirect(new URL("/admin/pedidos", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
