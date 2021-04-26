import AJV from "ajv";

import { remoteConfigSchema } from "./schemas";
import { EnvKeys, LocalConfig } from "../types";

export const BASE_ENDPOINT =
  process.env[EnvKeys.RAPIDSEC_DEV_API_ENDPOINT] || `https://api.rapidsec.com`;

export const REMOTE_ENDPOINTS = {
  config: `${BASE_ENDPOINT}/api/v1/csp`,
};

const ajv = new AJV();

export const validateRemoteConfig = ajv.compile(remoteConfigSchema);

export function getLoacalConfig(): LocalConfig {
  const token = process.env[EnvKeys.RAPIDSEC_SDK_TOKEN];
  if (!token) {
    throw new Error(
      `This RapidSec Static Microagent requires that you have a RapidSec token configured using environment variable "RAPIDSEC_SDK_TOKEN". You can get your free token at: https://rapidsec.com/client-side-protection and set up Content-Security-Policy and other security headers in minutes`
    );
  }
  return {
    token,
  };
}
