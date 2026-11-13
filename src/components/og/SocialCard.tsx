import { brandColors as color } from "@/lib/brand";

export type SocialCardProps = {
  logoSrc: string;
  photoSrc: string;
  eyebrow: string;
  title: string;
  badge: { value: string; label: string };
  socialProof: string;
  rating: string;
};

/**
 * 1200×630 share image, rendered by Satori (next/og): inline styles only, flexbox layout,
 * colors from `brandColors`. Mirrors the hero: copy on the left, photo with its shapes on the right.
 */
export function SocialCard({ logoSrc, photoSrc, eyebrow, title, badge, socialProof, rating }: SocialCardProps) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        padding: "64px 80px",
        backgroundColor: color.backgroundLightYellow,
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 600 }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> only */}
        <img src={logoSrc} width={108} height={34} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 2.4,
              textTransform: "uppercase",
              color: color.primaryBlue,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 20,
              fontFamily: "Plus Jakarta Sans",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.09,
              letterSpacing: -1.7,
              color: color.textPrimary,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{ display: "flex", alignItems: "center", fontSize: 22, fontWeight: 600, color: color.textSecondary }}
        >
          <span style={{ color: color.textPrimary }}>{socialProof}</span>
          <span style={{ margin: "0 14px" }}>·</span>
          <span>{`★ ${rating}`}</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 96,
          right: 40,
          width: 120,
          height: 450,
          borderRadius: 24,
          backgroundColor: color.backgroundOrange,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 420,
          right: 430,
          width: 120,
          height: 120,
          borderRadius: 999,
          backgroundColor: color.primaryBlueLight,
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> only */}
      <img
        src={photoSrc}
        width={420}
        height={502}
        alt=""
        style={{ position: "absolute", top: 64, right: 80, borderRadius: 28, objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          top: 96,
          right: 380,
          display: "flex",
          alignItems: "center",
          padding: "12px 18px",
          borderRadius: 14,
          backgroundColor: color.backgroundWhite,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          fontSize: 20,
          fontWeight: 600,
          color: color.textPrimary,
        }}
      >
        <span
          style={{
            marginRight: 10,
            padding: "4px 8px",
            borderRadius: 8,
            backgroundColor: color.primaryBlueLight,
            color: color.primaryBlue,
          }}
        >
          {badge.value}
        </span>
        {badge.label}
      </div>
    </div>
  );
}
