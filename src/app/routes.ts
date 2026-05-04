export type PageId =
  | "home"
  | "shop"
  | "product"
  | "find-us";

export type NavItem = {
  id: PageId;
  label: string;
};

export const primaryNav: NavItem[] = [
  { id: "home", label: "Inicio" },
  { id: "shop", label: "Compra" },
  { id: "find-us", label: "Encuéntranos" },
];

export function pageGroup(page: PageId): PageId {
  if (page === "product") return "shop";
  return page;
}
