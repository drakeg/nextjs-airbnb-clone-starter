export function parsePhotoUrls(value) {
  const raw = String(value ?? "")
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

  const unique = [...new Set(raw)].slice(0, 5);

  for (const url of unique) {
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      throw new Error("Each photo must be a valid URL.");
    }

    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("Photo URLs must use http or https.");
    }
  }

  return unique;
}
