export const SERVICE_SLUGS = ["full-stack", "erp", "schnittstellen", "ki"] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
