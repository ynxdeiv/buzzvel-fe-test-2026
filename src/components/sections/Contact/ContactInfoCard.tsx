import { Icon } from "@/components/ui/Icon";
import type { ContactChannel } from "@/types/content";

export type ContactInfoCardProps = {
  channel: ContactChannel;
};

export function ContactInfoCard({ channel }: ContactInfoCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-background-light-yellow p-4 lg:p-5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-blue-light">
        <Icon name={channel.icon} />
      </span>
      <p className="flex flex-col gap-0.5 text-body-1 lg:gap-1">
        <span className="text-text-primary">{channel.label}</span>
        {channel.href ? (
          <a href={channel.href} className="text-primary-blue underline-offset-4 hover:underline">
            {channel.value}
          </a>
        ) : (
          <span className="text-text-tertiary">{channel.value}</span>
        )}
      </p>
    </div>
  );
}
