import debugFn from "debug";
const debug = debugFn("rapidsec:service");

import fetch from "node-fetch";
import { REMOTE_ENDPOINTS, validateRemoteConfig } from "../config";
import { LocalConfig, RemoteConfig } from "../types";

export async function loadRemoteConfig(
  localConfig: LocalConfig,
  provider: string,
  version: string
): Promise<RemoteConfig> {
  debug(`loading remote config`);
  debug(
    `Fetching remote config from ${REMOTE_ENDPOINTS.config} with token ${localConfig.token}`
  );
  const res = await fetch(REMOTE_ENDPOINTS.config, {
    headers: {
      "x-token": localConfig.token,
      "user-agent": `rapidsec_agent-static-${provider}_${version}`,
    },
  });

  if (!res.ok) {
    debug(`Failed to fetch remote config`);
    throw new Error(`${res.status}: ${res.statusText}`);
  }

  const config = (await res.json()) as RemoteConfig;
  const isValid = validateRemoteConfig(config);
  if (!isValid) {
    throw new Error(
      `Recieved invalid config from Rapidsec. Errors: ${JSON.stringify(
        validateRemoteConfig.errors
      )}`
    );
  }
  debug(`loaded remote config`);
  return config;
}
