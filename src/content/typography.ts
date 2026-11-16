// Russian screen typography: a short preposition, conjunction or particle must not
// hang at the end of a line, so it is bound to the next word with a no-break space.

const NBSP = " ";

const SHORT_WORDS = [
  "в", "во", "с", "со", "к", "ко", "о", "об", "обо", "у", "и", "а", "но", "да", "не", "ни",
  "на", "за", "по", "от", "до", "из", "изо", "без", "для", "при", "под", "над", "про", "через",
  "или", "что", "как", "то", "же", "ли", "бы", "уж",
];

const HANGING = new RegExp(
  `(^|[\\s(«"—])(${SHORT_WORDS.join("|")}) (?=\\S)`,
  "giu",
);

export function bindShortWords(text: string): string {
  // Apply twice so chains like «и в» are both bound.
  return text.replace(HANGING, `$1$2${NBSP}`).replace(HANGING, `$1$2${NBSP}`);
}

/** Apply bindShortWords to every string inside a copy object, keeping its shape. */
export function typographRu<T>(value: T): T {
  if (typeof value === "string") return bindShortWords(value) as T;
  if (Array.isArray(value)) return value.map((item) => typographRu(item)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, key === "src" || key.endsWith("Href") || key === "email" || key === "linkedin" || key === "whatsapp" || key === "telegram" ? item : typographRu(item)]),
    ) as T;
  }
  return value;
}
