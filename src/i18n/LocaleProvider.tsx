"use client";

import { createContext, useContext, type ReactNode } from "react";
import { getDictionary, type Dictionary } from "@/content";
import { defaultLocale, type Locale } from "./config";

const LocaleContext = createContext<Locale>(defaultLocale);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function useDictionary(): Dictionary {
  return getDictionary(useLocale());
}
