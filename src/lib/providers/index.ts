import debugFn from "debug";

import { getLoacalConfig } from "../../config";
import { ProviderArgs, Providers } from "../../types";
import { AgentConfig } from "../agent-config";
import { Firebase } from "./firebase";
import { Netlify } from "./netlify";
import { Vercel } from "./vercel";

const debug = debugFn("rapidsec:provider");

export class Provider {
  public async handleProvider(args: ProviderArgs, provider: Providers) {
    try {
      const localConfig = getLoacalConfig();
      debug(`Got localConfig`);
      const agentConfig = new AgentConfig({
        localConfig,
        provider,
      });
      await agentConfig.loadRemoteConfig();
      switch (provider) {
        case Providers.Vercel:
          return new Vercel({ ...args, agentConfig }).generate();
        case Providers.Netlify:
          return new Netlify({ ...args, agentConfig }).generate();
        case Providers.Firebase:
          return new Firebase({ ...args, agentConfig }).generate();
        default:
          break;
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}
