import type { Scheme as BackendScheme } from "../backend.d";
import type { Scheme } from "../data/schemes";

const ADMIN_PASSWORD = "admin123";

function toBackendScheme(s: Scheme): BackendScheme {
  return {
    id: s.id,
    name: s.name,
    state: s.state,
    category: s.category,
    benefit: s.benefit,
    benefitAmountNumeric: BigInt(Math.round(s.benefit_amount_numeric)),
    eligibility: s.eligibility,
    documents: s.documents.join("|"),
    applyLink: s.apply_link,
    description: s.description,
    tags: s.tags,
  };
}

function fromBackendScheme(s: BackendScheme): Scheme {
  return {
    id: s.id,
    name: s.name,
    state: s.state,
    category: s.category,
    benefit: s.benefit,
    benefit_amount_numeric: Number(s.benefitAmountNumeric),
    eligibility: s.eligibility,
    documents: s.documents
      .split("|")
      .map((d) => d.trim())
      .filter(Boolean),
    apply_link: s.applyLink,
    description: s.description,
    tags: s.tags,
    slug:
      s.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim() || s.id,
  };
}

export async function fetchSchemesFromCanister(
  actor: { getAllSchemes: () => Promise<BackendScheme[]> } | null,
): Promise<Scheme[]> {
  if (!actor) return [];
  try {
    const backendSchemes = await actor.getAllSchemes();
    return backendSchemes.map(fromBackendScheme);
  } catch (err) {
    console.warn("Failed to fetch from canister, using localStorage:", err);
    return [];
  }
}

export async function addSchemeToCanister(
  actor: { addScheme: (s: BackendScheme, pw: string) => Promise<void> } | null,
  scheme: Scheme,
): Promise<void> {
  if (!actor) return;
  try {
    await actor.addScheme(toBackendScheme(scheme), ADMIN_PASSWORD);
  } catch (err) {
    console.warn("Failed to add scheme to canister:", err);
  }
}

export async function updateSchemeInCanister(
  actor: {
    updateScheme: (s: BackendScheme, pw: string) => Promise<void>;
  } | null,
  scheme: Scheme,
): Promise<void> {
  if (!actor) return;
  try {
    await actor.updateScheme(toBackendScheme(scheme), ADMIN_PASSWORD);
  } catch (err) {
    console.warn("Failed to update scheme in canister:", err);
  }
}

export async function deleteSchemeFromCanister(
  actor: { deleteScheme: (id: string, pw: string) => Promise<void> } | null,
  id: string,
): Promise<void> {
  if (!actor) return;
  try {
    await actor.deleteScheme(id, ADMIN_PASSWORD);
  } catch (err) {
    console.warn("Failed to delete scheme from canister:", err);
  }
}
