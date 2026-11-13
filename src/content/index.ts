import type { Locale } from "@/i18n/config";
import { publication } from "./claims";
import { demoCase as enDemoCase } from "./en/demo-case";
import { copy as enCopy } from "./en/site";
import { implementation as enImplementation, story as enStory } from "./en/story";
import { demoCase as ruDemoCase } from "./ru/demo-case";
import { copy as ruCopy } from "./ru/site";
import { implementation as ruImplementation, story as ruStory } from "./ru/story";

/** Same shape as the English copy, with every string literal widened to `string`. */
export type Widen<T> = T extends string
  ? string
  : T extends number | boolean
    ? T
    : T extends readonly (infer U)[]
      ? readonly Widen<U>[]
      : { readonly [K in keyof T]: Widen<T[K]> };

export type SiteCopy = Widen<typeof enCopy>;
export type StoryCopy = Widen<typeof enStory>;
export type DemoCaseCopy = Widen<typeof enDemoCase>;
export type ImplementationCopy = Widen<typeof enImplementation>;

export type Dictionary = {
  locale: Locale;
  copy: SiteCopy;
  story: StoryCopy;
  demoCase: DemoCaseCopy;
  implementation: ImplementationCopy["fallback"] | ImplementationCopy["confirmed"];
};

const dictionaries: Record<Locale, Omit<Dictionary, "implementation"> & { allImplementation: ImplementationCopy }> = {
  en: { locale: "en", copy: enCopy, story: enStory, demoCase: enDemoCase, allImplementation: enImplementation },
  ru: { locale: "ru", copy: ruCopy, story: ruStory, demoCase: ruDemoCase, allImplementation: ruImplementation },
};

export function getDictionary(locale: Locale): Dictionary {
  const { allImplementation, ...rest } = dictionaries[locale];
  return {
    ...rest,
    implementation: publication.confirmedImplementation ? allImplementation.confirmed : allImplementation.fallback,
  };
}
