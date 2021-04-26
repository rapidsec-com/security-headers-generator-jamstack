import debugFn from "debug";

import { existsSync, readFileSync, writeFileSync } from "fs";
import { IntegrationProvider, ProviderArgs } from "../../types";

const debug = debugFn("rapidsec:provider:vercel");

type VercelConfig = {
  headers: {
    source: string;
    headers: { key: string; value: string }[];
  }[];
};

export class Vercel extends IntegrationProvider {
  private readonly name: string = "RapidSec Vercel Module";
  private config: VercelConfig = { headers: [] };
  constructor(options: ProviderArgs) {
    super(options);
    this.loadConfig();
  }
  loadConfig() {
    if (existsSync(this.input)) {
      try {
        this.config = JSON.parse(readFileSync(this.input, "utf-8"));
        debug(`Loaded vercel config`);
      } catch (error) {
        error.message = `Error parsing vercel.json: ${error.message}`;
        throw error;
      }
    }
  }
  outputConfig() {
    debug(`Writing vercel config`);
    writeFileSync(this.output, JSON.stringify(this.config, null, 2));
  }
  public generate() {
    debug(`Generating vercel config`);
    const headers = (this.agentConfig.remoteConfig?.headers || []).map(
      ({ name, value }) => ({
        key: name,
        value,
      })
    );
    this.config = {
      ...this.config,
      headers: [
        ...this.config.headers,
        {
          source: `/(.*)`,
          headers,
        },
      ],
    };
    this.outputConfig();
  }
}
