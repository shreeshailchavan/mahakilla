// src/data/forts.ts

// export type Fort = {
//   name: string;
//   slug: string;
//   fortName: string;
//   keyFigures: string[];
//   description: string; // matches FortDetail
//   location: string;
//   period: string; // matches FortDetail
//   history: string; // matches FortDetail
//   architectureHighlights: string;
//   image: string;
//   images: string[];
// };

// export async function fetchForts(): Promise<Fort[]> {
//   const res = await fetch("/data/forts_formatted_plain_arch.json", {
//     headers: { "Cache-Control": "no-cache" },
//   });
//   if (!res.ok) {
//     throw new Error(`Failed to load forts: ${res.status} ${res.statusText}`);
//   }

//   const rawData = await res.json();
//   if (!Array.isArray(rawData)) {
//     throw new Error("Invalid forts data format — expected an array");
//   }

//   // Map raw JSON to UI-compatible structure
//   return rawData.map((f) => ({
//     name: f.name,
//     slug: f.slug,
//     fortName: f.fortName,
//     keyFigures: f.keyFigures ?? [],
//     description: f.historySummary || "", // UI uses description
//     location: f.location || "",
//     period: f.era || "", // UI uses period
//     history: f.historySummary || "", // For now, using same as summary
//     architectureHighlights: f.architectureHighlights || "",
//     image: f.image || "",
//     images: f.images ?? [],
//   }));
// }


// src/data/forts.ts
export type Fort = {
  name: string;
  slug: string;
  fortName: string;
  keyFigures: string[];
  description: string; // matches FortDetail
  location: string;
  period: string; // matches FortDetail
  history: string; // matches FortDetail
  architectureHighlights: string;
  image: string;
  images: string[];
};

// Helper to check if an image URL is valid & fort-related
async function isValidFortImage(url: string): Promise<boolean> {
  if (!url) return false;

  // Simple keyword filter
  const isFortRelated = url.toLowerCase().includes("fort");
  if (!isFortRelated) return false;

  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchForts(): Promise<Fort[]> {
  const res = await fetch("/data/forts_formatted_plain_arch.json", {
    headers: { "Cache-Control": "no-cache" },
  });

  if (!res.ok) {
    throw new Error(`Failed to load forts: ${res.status} ${res.statusText}`);
  }

  const rawData = await res.json();
  if (!Array.isArray(rawData)) {
    throw new Error("Invalid forts data format — expected an array");
  }

  // Validate image URLs & filter out invalid ones
  const forts: Fort[] = [];
  for (const f of rawData) {
    const validImage = await isValidFortImage(f.image);
    if (!validImage) continue;

    forts.push({
      name: f.name,
      slug: f.slug,
      fortName: f.fortName,
      keyFigures: f.keyFigures ?? [],
      description: f.historySummary || "",
      location: f.location || "",
      period: f.era || "",
      history: f.historySummary || "",
      architectureHighlights: f.architectureHighlights || "",
      image: f.image || "",
      images: f.images ?? [],
    });
  }
  console.log(forts)
  return forts;
}
