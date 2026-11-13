import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { FooterContent } from "@/types/content";
import { Logo } from "./Logo";

export type FooterProps = {
  content: FooterContent;
};

export function Footer({ content }: FooterProps) {
  return (
    <footer className="bg-background-darkblue pt-15 pb-5 [--focus-ring:var(--color-secondary-yellow)] lg:pt-20 lg:pb-10">
      <Container>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo tone="light" className="inline-block" />
            <p className="mt-3 text-body-1 text-text-white-tertiary md:max-w-60">{content.tagline}</p>
          </div>

          {content.columns.map((column) => {
            const headingId = `footer-${column.title.toLowerCase()}`;
            return (
              <nav key={column.title} aria-labelledby={headingId}>
                <Eyebrow as="h2" id={headingId} tone="footer">
                  {column.title}
                </Eyebrow>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-body-1 text-text-white-tertiary transition-colors hover:text-text-white-primary motion-reduce:transition-none"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
        </div>

        <div className="mt-12 border-t border-text-secondary pt-6 lg:mt-16">
          <p className="text-center text-caption text-text-white-secondary md:text-left">{content.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
