export const publication = {
  proof: false,
  ownershipDetails: false,
  extendedSecurity: false,
  aiPermissionChecks: false,
  confirmedImplementation: false,
} as const;

export type ClaimStatus = "verified" | "needsConfirmation" | "roadmap";

export type Claim = {
  id: string;
  status: ClaimStatus;
  publish: boolean;
};

export const claims = [
  { id: "client-record", status: "verified", publish: true },
  { id: "documents-and-status", status: "verified", publish: true },
  { id: "tasks", status: "verified", publish: true },
  { id: "team-discussion", status: "verified", publish: true },
  { id: "calendar-meetings", status: "verified", publish: true },
  { id: "client-finance", status: "verified", publish: true },
  { id: "analytics", status: "verified", publish: true },
  { id: "knowledge-search", status: "verified", publish: true },
  { id: "ai-drafts", status: "verified", publish: true },
  { id: "role-access", status: "verified", publish: true },
  { id: "client-portal", status: "verified", publish: true },
  { id: "proof", status: "needsConfirmation", publish: publication.proof },
  { id: "ownership-terms", status: "needsConfirmation", publish: publication.ownershipDetails },
  { id: "extended-security", status: "needsConfirmation", publish: publication.extendedSecurity },
  { id: "ai-permission-checks", status: "needsConfirmation", publish: publication.aiPermissionChecks },
  { id: "implementation-timeline", status: "needsConfirmation", publish: publication.confirmedImplementation },
  { id: "integrations", status: "needsConfirmation", publish: false },
  { id: "legal-signature", status: "roadmap", publish: false },
  { id: "online-payments", status: "roadmap", publish: false },
] as const satisfies readonly Claim[];

export function publishedClaimIds(): string[] {
  return claims.filter((claim) => claim.publish).map((claim) => claim.id);
}
