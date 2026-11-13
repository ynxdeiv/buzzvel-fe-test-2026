import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import type { Category } from "@/types/content";

export type CategoryCardProps = {
  category: Category;
};

/**
 * Whole card is clickable through a stretched link, but only "Explore" is the link,
 * so screen readers get a short name ("Explore Product Design") instead of the full card.
 */
export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <article className="group relative flex h-full min-h-50 flex-col rounded-2xl border border-line-1 bg-background-white p-6 transition-[border-color,box-shadow] hover:border-primary-blue hover:shadow-card has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary-blue motion-reduce:transition-none lg:min-h-65 lg:p-7">
      <Tag className="mt-0.5 mb-5 self-start">{category.number}</Tag>
      <Heading as="h3" size="card">
        {category.title}
      </Heading>
      <Text size="body" tone="tertiary" className="mt-3">
        {category.description}
      </Text>
      <a
        href={category.href}
        className="mt-auto inline-flex items-center gap-2 pt-6 text-body-1 font-bold text-text-primary after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
      >
        Explore<span className="sr-only"> {category.title}</span>
        <Icon
          name="arrow-dark"
          className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
        />
      </a>
    </article>
  );
}
