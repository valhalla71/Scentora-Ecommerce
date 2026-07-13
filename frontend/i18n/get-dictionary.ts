import "server-only";

import type { Locale } from "./config";
import type {
  CommonDictionary,
  Dictionary,
  HomeDictionary,
  LayoutDictionary,
} from "./types";

const namespaces = ["common", "layout", "home"] as const;

type Namespace = (typeof namespaces)[number];

type NamespaceModule = CommonDictionary | LayoutDictionary | HomeDictionary;

async function loadNamespace(
  locale: Locale,
  namespace: Namespace,
): Promise<NamespaceModule> {
  switch (namespace) {
    case "common":
      return import(`./dictionaries/${locale}/common.json`).then(
        (module) => module.default as CommonDictionary,
      );
    case "layout":
      return import(`./dictionaries/${locale}/layout.json`).then(
        (module) => module.default as LayoutDictionary,
      );
    case "home":
      return import(`./dictionaries/${locale}/home.json`).then(
        (module) => module.default as HomeDictionary,
      );
  }
}

/**
 * Loads all translation namespaces for a locale.
 * Namespaces are code-split — only the active locale bundle is fetched.
 */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => [
      namespace,
      await loadNamespace(locale, namespace),
    ] as const),
  );

  return Object.fromEntries(entries) as Dictionary;
}
