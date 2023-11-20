import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-catalog-backend-module-scaffolder-entity-model';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { BitbucketCloudEntityProvider } from '@backstage/plugin-catalog-backend-module-bitbucket-cloud';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env);
  builder.addEntityProvider(
    BitbucketCloudEntityProvider.fromConfig(env.config, {
      logger: env.logger,
      schedule: env.scheduler.createScheduledTaskRunner({
        frequency: { minutes: 1 },
        timeout: { minutes: 1 },
      }),
    }),
  );
  builder.addProcessor(new ScaffolderEntitiesProcessor());
  const { processingEngine, router } = await builder.build();
  await processingEngine.start();
  return router;
}
