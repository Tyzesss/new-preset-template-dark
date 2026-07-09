import { jeleniaGoraPreset } from "./jelenia-gora";
import { krakowPreset } from "./krakow";
import type { SitePreset } from "./types";
import { warszawaPreset } from "./warszawa";
import { wroclawPreset } from "./wroclaw";

export type PresetId = "warszawa" | "krakow" | "wroclaw" | "jelenia-gora";

export const PRESETS: Record<PresetId, SitePreset> = {
  warszawa: warszawaPreset,
  krakow: krakowPreset,
  wroclaw: wroclawPreset,
  "jelenia-gora": jeleniaGoraPreset,
};

export const PRESET_IDS = Object.keys(PRESETS) as PresetId[];

const DEFAULT_PRESET_ID: PresetId = "jelenia-gora";

export function getActivePreset(): SitePreset {
  const raw = import.meta.env.VITE_CITY_PRESET as string | undefined;
  if (raw && raw in PRESETS) {
    return PRESETS[raw as PresetId];
  }
  return PRESETS[DEFAULT_PRESET_ID];
}

export type { GalleryItem, ReviewItem, SitePreset } from "./types";
