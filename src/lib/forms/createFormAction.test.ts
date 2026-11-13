import { describe, expect, it, vi } from "vitest";
import { contactSchema } from "@/lib/schemas/contact";
import { createFormAction } from "./createFormAction";

// `server-only` throws outside a React Server Components bundle; the logic under test is plain TS.
vi.mock("server-only", () => ({}));

const valid = { name: "  Ada Lovelace ", email: " ada@example.com ", question: "Do you offer team plans?" };

describe("createFormAction", () => {
  it("calls the handler with the parsed (trimmed) data", async () => {
    const handler = vi.fn();
    const action = createFormAction(contactSchema, handler);

    await expect(action(valid)).resolves.toEqual({ ok: true });
    expect(handler).toHaveBeenCalledWith({
      name: "Ada Lovelace",
      email: "ada@example.com",
      question: "Do you offer team plans?",
    });
  });

  it("returns the Zod messages per field and never calls the handler for invalid input", async () => {
    const handler = vi.fn();
    const action = createFormAction(contactSchema, handler);

    const result = await action({ name: "", email: "nope", question: "short" });

    expect(result).toEqual({
      ok: false,
      fieldErrors: {
        name: expect.arrayContaining(["Please enter your name."]),
        email: ["This email doesn’t look right — try name@example.com."],
        question: ["Add a little more detail (at least 10 characters)."],
      },
    });
    expect(handler).not.toHaveBeenCalled();
  });

  it("reports a failure without leaking the error when the handler throws", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const action = createFormAction(contactSchema, () => {
      throw new Error("SQLITE_BUSY: database is locked");
    });

    await expect(action(valid)).resolves.toEqual({ ok: false });
  });
});
