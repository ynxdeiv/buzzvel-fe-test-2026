import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { Category, SectionIntro as SectionIntroContent } from "@/types/content";
import { CategoryCard } from "./CategoryCard";

export type CategoriesProps = {
  intro: SectionIntroContent;
  categories: Category[];
};

export function Categories({ intro, categories }: CategoriesProps) {
  return (
    <Section id="courses" tone="white" aria-labelledby="categories-title">
      <SectionIntro content={intro} titleId="categories-title" className="max-w-140" />
      <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-5">
        {categories.map((category) => (
          <li key={category.title}>
            <CategoryCard category={category} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
