import { resolve } from "path";
import { AgentConfig } from "./lib/agent-config";

export type RemoteConfigHeaders = {
  name: string;
  value: string;
};

export type RemoteConfig = {
  siteId: string;
  stageId: string;
  enforceCspVersion: number;
  reportCspVersion: number;
  headers: RemoteConfigHeaders[];
};

export type LocalConfig = {
  token: string;
};

export enum EnvKeys {
  RAPIDSEC_SDK_TOKEN = "RAPIDSEC_SDK_TOKEN",
  RAPIDSEC_DEV_API_ENDPOINT = "RAPIDSEC_DEV_API_ENDPOINT",
}

export enum Providers {
  Netlify = "netlify",
  Vercel = "vercel",
  Firebase = "firebase",
}

export type ProviderArgs = {
  input?: string;
  output?: string;
  agentConfig: AgentConfig;
};

export abstract class IntegrationProvider {
  protected readonly input: string;
  protected readonly output: string;
  protected readonly agentConfig: AgentConfig;
  constructor({
    input = resolve("vercel.json"),
    output = resolve("vercel.json"),
    agentConfig,
  }: ProviderArgs) {
    this.input = input;
    this.output = output;
    this.agentConfig = agentConfig;
  }
  abstract loadConfig(): void;
  abstract outputConfig(): void;
  abstract generate(): void;
}
