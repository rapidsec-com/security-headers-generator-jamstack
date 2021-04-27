import consola from "consola";
import debugFn from "debug";

import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { IntegrationProvider, ProviderArgs } from "../../types";

const debug = debugFn("rapidsec:provider:netlify");

export class Netlify extends IntegrationProvider {
  private readonly name: string = "RapidSec Netlify Module";
  private config = "";
  constructor(options: ProviderArgs) {
    super(
      Object.assign(
        {
          input: resolve(`_headers`),
          output: resolve(`_headers`),
          agentConfig: options.agentConfig,
        },
        options
      )
    );
    this.loadConfig();
  }
  loadConfig() {
    consola.info(`rapidsec: Loading _headers from ${this.input}`);
    if (existsSync(this.input)) {
      this.config = readFileSync(this.input, "utf-8");
      debug(`Loaded netlify headers file`);
    }
  }
  outputConfig() {
    debug(`Writing vercel config`);
    writeFileSync(this.output, this.config);
    consola.success(
      `rapidsec: Updated ${this.output} with headers from RapidSec`
    );
  }
  public generate() {
    debug(`Generating vercel config`);
    const headers = (this.agentConfig.remoteConfig?.headers || []).reduce(
      (acc, next) => {
        return `${acc}\n\t${next.name}: ${next.value}`;
      },
      `/*`
    );
    this.config = `${this.config}\n${headers}`;
    this.outputConfig();
  }
}
