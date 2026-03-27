export const starterCapabilities = {
  name: "py-type-starter",
  transports: ["stdio"],
  primitives: ["tools", "resources", "prompts"],
  languages: ["typescript", "python"],
} as const;

export type StarterCapabilities = typeof starterCapabilities;

export interface StarterHelloInput {
  name: string;
}

export interface StarterHelloResult {
  message: string;
  server: string;
}
