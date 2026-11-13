import type { SiteCopy } from "@/content";

export type DemoInput = {
  name: string;
  company: string;
  email: string;
};

export type DemoField = keyof DemoInput;

export type FieldErrors = Partial<Record<DemoField, string>>;

const namePattern = /^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u;
const companyPattern = /^[\p{L}\p{M}\p{N}][\p{L}\p{M}\p{N}\s.&,'’()-]*$/u;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function emptyDemoInput(): DemoInput {
  return { name: "", company: "", email: "" };
}

export type DemoErrorMessages = SiteCopy["demo"]["errors"];

export function validateDemo(
  input: DemoInput,
  messages: DemoErrorMessages,
): { errors: FieldErrors; value: DemoInput } {
  const name = input.name.trim();
  const company = input.company.trim();
  const email = input.email.trim();
  const errors: FieldErrors = {};

  if (!name) errors.name = messages.nameRequired;
  else if (name.length > 80) errors.name = messages.nameLength;
  else if (!namePattern.test(name)) errors.name = messages.nameChars;

  if (!company) errors.company = messages.companyRequired;
  else if (company.length > 120) errors.company = messages.companyLength;
  else if (!companyPattern.test(company)) errors.company = messages.companyChars;

  if (!email) errors.email = messages.emailRequired;
  else if (email.length > 254) errors.email = messages.emailLength;
  else if (!emailPattern.test(email)) errors.email = messages.emailFormat;

  return { errors, value: { name, company, email } };
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
