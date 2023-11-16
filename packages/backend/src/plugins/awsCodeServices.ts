import { createRouter } from "@aws/aws-codeservices-backend-plugin-for-backstage";
import { PluginEnvironment } from "../types";

export default async function createPlugin(env: PluginEnvironment) {
  return await createRouter({
    logger: env.logger,
    config: env.config,
  });
}