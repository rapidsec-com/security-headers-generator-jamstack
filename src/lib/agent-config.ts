import path from "path";
import fs from "fs";
import { LocalConfig, Providers, RemoteConfig } from "../types";
import { loadRemoteConfig } from "../services/rapidsec";

export class AgentConfig {
  public version: string;
  public remoteConfig?: RemoteConfig;
  public localConfig: LocalConfig;
  public provider: Providers;
  constructor({
    localConfig,
    provider,
  }: {
    localConfig: LocalConfig;
    provider: Providers;
  }) {
    this.localConfig = localConfig;
    this.provider = provider;
    this.version = getSDKVersion();
  }

  public async loadRemoteConfig() {
    await loadRemoteConfig(this.localConfig, this.provider, this.version)
      .then((remoteConfig) => {
        this.remoteConfig = remoteConfig;
      })
      .catch((error) => {
        console.error(error.message);
        console.error(error.stack);
      });
  }
}

export function getSDKVersion(): string {
  try {
    const file = fs
      .readFileSync(path.join(__dirname, "../../../package.json"))
      .toString();
    const pkg = JSON.parse(`${file}`);
    return pkg.version || `-1.-1.-1`;
  } catch (e) {
    return `-1.-1.-1`;
  }
}
