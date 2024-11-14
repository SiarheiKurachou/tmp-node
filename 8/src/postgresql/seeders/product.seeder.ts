import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ProductFactory } from './product.factory';

export class ProductSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    new ProductFactory(em).create(10);
  }
}