import type { CategoryConfig, CategorySlug } from "@/types/article";

export const categories: CategoryConfig[] = [
  {
    slug: "education",
    label: "Education",
    shortLabel: "Education",
    introduction:
      "Coverage of Alabama's colleges, universities, technical programs, and K-12 schools, from workforce training in Huntsville to rural classrooms across the Black Belt.",
    navigationOrder: 1,
  },
  {
    slug: "healthcare",
    label: "Healthcare",
    shortLabel: "Healthcare",
    introduction:
      "Reporting on hospitals, clinics, and public health across Alabama, including rural access, maternal care, telehealth, and the workforce behind patient care.",
    navigationOrder: 2,
  },
  {
    slug: "business-leaders",
    label: "Business Leaders",
    shortLabel: "Business",
    introduction:
      "Profiles and updates on entrepreneurs and executives building companies across Alabama's manufacturing, technology, hospitality, and service industries.",
    navigationOrder: 3,
  },
  {
    slug: "finance-economy",
    label: "Finance & Economy",
    shortLabel: "Finance",
    introduction:
      "Analysis of banking, industry, and regional development across Alabama, from Mobile's port activity to Huntsville's aerospace economy and statewide housing trends.",
    navigationOrder: 4,
  },
  {
    slug: "community",
    label: "Community",
    shortLabel: "Community",
    introduction:
      "Stories from neighborhoods, small towns, and civic life across Alabama, covering libraries, parks, volunteer efforts, and local preservation projects.",
    navigationOrder: 5,
  },
  {
    slug: "beauty-wellness",
    label: "Beauty & Wellness",
    shortLabel: "Wellness",
    introduction:
      "A measured look at salons, fitness studios, and wellness trends across Alabama communities, from Gulf Coast spas to Birmingham fitness culture.",
    navigationOrder: 6,
  },
];

export const categoryMap: Record<CategorySlug, CategoryConfig> = categories.reduce(
  (acc, category) => {
    acc[category.slug] = category;
    return acc;
  },
  {} as Record<CategorySlug, CategoryConfig>
);

export function getCategory(slug: string): CategoryConfig | undefined {
  return categories.find((category) => category.slug === slug);
}

export function isCategorySlug(slug: string): slug is CategorySlug {
  return categories.some((category) => category.slug === slug);
}

export const categorySlugs: CategorySlug[] = categories.map((category) => category.slug);
