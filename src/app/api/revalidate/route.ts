import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { revalidatePrismicPages } from "@prismicio/next";

type PrismicWebhookBody = {
  type?: unknown;
  secret?: unknown;
  documents?: unknown;
};

function isValidSecret(received: unknown): boolean {
  const expected = process.env.PRISMIC_WEBHOOK_SECRET;
  if (!expected || typeof received !== "string") return false;

  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Prismic webhook: revalidates cached pages when content is published.
 * Disabled (401) unless PRISMIC_WEBHOOK_SECRET is set and matches the webhook secret.
 */
export async function POST(request: Request) {
  let body: PrismicWebhookBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValidSecret(body.secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (
    body.type === "api-update" &&
    Array.isArray(body.documents) &&
    body.documents.every((id) => typeof id === "string")
  ) {
    revalidatePrismicPages(body.documents);
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
