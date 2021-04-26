export const remoteConfigSchema = {
  $id: "https://example.com/schemas/remote_config_schema.json",
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    siteId: { type: "string" },
    stageId: { type: "string" },
    enforceCspVersion: { type: "number" },
    reportCspVersion: { type: "number" },
    headers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          value: { type: "string" },
        },
      },
    },
  },
};
