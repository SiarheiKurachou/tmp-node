import * as dotenv from 'dotenv'
dotenv.config()
import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Migrator } from '@mikro-orm/migrations';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SeedManager } from '@mikro-orm/seeder';

const options: Options<PostgreSqlDriver> = {
  entities: ['./dist/entities'],
  entitiesTs: ['./src/postgresql/entities'],
  migrations: {
    path: './dist/migrations',
    pathTs: './src/postgresql/migrations',
  },
  seeder: {
    path: './dist/seeders',
    pathTs: './src/postgresql/seeders',
  },
  driver: PostgreSqlDriver,
  extensions: [Migrator, SeedManager],
  metadataProvider: TsMorphMetadataProvider,
  allowGlobalContext: true,
  pool: { min: 10, max: 20 }
};

export default options;