import consola from "consola";
import debugFn from "debug";

import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { IntegrationProvider, ProviderArgs } from "../../types";

const debug = debugFn("rapidsec:provider:firebase");

type FirebaseConfig = {
  hosting: {
    headers: {
      source: string;
      headers: { key: string; value: string }[];
    }[];
  };
};

export class Firebase extends IntegrationProvider {
  private readonly name: string = "RapidSec Firebase Module";
  private config: FirebaseConfig = { hosting: { headers: [] } };
  constructor(options: ProviderArgs) {
    super(
      Object.assign(
        {
          input: resolve(`firebase.json`),
          output: resolve(`firebase.json`),
          agentConfig: options.agentConfig,
        },
        options
      )
    );
    this.loadConfig();
  }
  loadConfig() {
    consola.info(`rapidsec: Loading firebase.json from ${this.input}`);
    if (existsSync(this.input)) {
      try {
        this.config = JSON.parse(readFileSync(this.input, "utf-8"));
        debug(`Loaded Firebase config`);
      } catch (error) {
        error.message = `Error parsing firebase.json: ${error.message}`;
        throw error;
      }
    }
  }
  outputConfig() {
    debug(`Writing Firebase config`);
    writeFileSync(this.output, JSON.stringify(this.config, null, 2));
    consola.success(
      `rapidsec: Updated ${this.output} with headers from RapidSec`
    );
  }
  public generate() {
    debug(`Generating Firebase config`);
    const headers = (this.agentConfig.remoteConfig?.headers || []).map(
      ({ name, value }) => ({
        key: name,
        value,
      })
    );
    this.config = {
      ...this.config,
      hosting: {
        ...this.config.hosting,
        headers: [
          ...this.config.hosting.headers,
          {
            source: `*`,
            headers,
          },
        ],
      },
    };
    this.outputConfig();
  }
}
