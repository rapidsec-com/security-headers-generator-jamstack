import { RemoteConfig } from "../types";

export function processConfig({
  remoteConfig,
  version,
  agent,
}: {
  remoteConfig: RemoteConfig;
  version: string;
  agent: string;
}) {
  const { headers } = remoteConfig;
  return {
    ...remoteConfig,
    headers: headers.map(({ name, value }) => {
      return {
        name,
        value: value.replace(/sdkv=-1.-1.-1_api/g, `sdkv=${version}_${agent}`),
      };
    }),
  };
}
