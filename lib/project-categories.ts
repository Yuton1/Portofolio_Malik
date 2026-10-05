export const PROJECT_CATEGORIES = [
    "Graphic Design",
    "Motion Design",
    "UI/UX",
    "Web Development",
  ] as const;
  
  export type ProjectCategory =
    (typeof PROJECT_CATEGORIES)[number];