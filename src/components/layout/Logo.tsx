import type { ComponentProps } from "react";
import { Icon } from "@/components/ui/Icon";

export type LogoProps = Omit<ComponentProps<"a">, "href" | "children"> & {
  tone?: "dark" | "light";
};

/** "luma." wordmark linking back to the top of the page. */
export function Logo({ tone = "dark", ...props }: LogoProps) {
  return (
    <a href="#top" {...props}>
      <Icon name={tone === "dark" ? "logo-dark" : "logo-light"} alt="Luma — back to top" loading="eager" />
    </a>
  );
}
