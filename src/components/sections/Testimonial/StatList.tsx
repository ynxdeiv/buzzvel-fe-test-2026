import type { Stat } from "@/types/content";

export type StatListProps = {
  stats: Stat[];
};

/** Key numbers; label comes first in the DOM so screen readers read "active learners: 24K+". */
export function StatList({ stats }: StatListProps) {
  return (
    <dl className="grid grid-cols-3 gap-4 lg:w-100 lg:shrink-0 lg:grid-cols-1 lg:gap-5 lg:border-l lg:border-line-1 lg:pl-12">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse justify-end">
          <dt className="pt-1 text-body-1 text-text-tertiary">{stat.label}</dt>
          <dd className="font-heading text-mobile-h1 text-primary-blue lg:text-desktop-h1">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
