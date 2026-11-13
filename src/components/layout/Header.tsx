import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { NavigationContent } from "@/types/content";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export type HeaderProps = {
  navigation: NavigationContent;
};

export function Header({ navigation }: HeaderProps) {
  return (
    <header id="top" className="border-b border-line-1 bg-background-light-yellow">
      <Container className="flex h-17 items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] lg:h-17.25">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-8">
            {navigation.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-body-1 text-text-secondary transition-colors hover:text-text-primary motion-reduce:transition-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center justify-end gap-2 md:flex">
          <ButtonLink href={navigation.login.href} variant="ghost" size="compact">
            {navigation.login.label}
          </ButtonLink>
          <ButtonLink href={navigation.cta.href} size="sm">
            {navigation.cta.label}
          </ButtonLink>
        </div>

        <MobileNav navigation={navigation} />
      </Container>
    </header>
  );
}
