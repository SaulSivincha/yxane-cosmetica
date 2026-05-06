export type NavigationKey = "home" | "shop" | "find-us";

export type NavigationItem = {
  key: NavigationKey;
  label: string;
  href: string;
};

export const routes = {
  home: "/",
  shop: "/compra",
  findUs: "/encuentranos",
  admin: "/admin",
  adminLogin: "/admin/login",
  product: (productId: string) => `/productos/${productId}`,
} as const;

export const primaryNavigation: NavigationItem[] = [
  { key: "home", label: "Inicio", href: routes.home },
  { key: "shop", label: "Compra", href: routes.shop },
  { key: "find-us", label: "Encuéntranos", href: routes.findUs },
];

export function getActiveNavigation(pathname: string): NavigationKey {
  if (pathname.startsWith(routes.shop) || pathname.startsWith("/productos")) {
    return "shop";
  }

  if (pathname.startsWith(routes.findUs)) {
    return "find-us";
  }

  return "home";
}
