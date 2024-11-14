import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { Product } from '../entities/product';

export class ProductFactory extends Factory<Product> {
  model = Product;

  definition(): Partial<Product> {
    return {
      title: faker.string.alphanumeric({ length: 10 }),
      description: faker.string.alphanumeric({ length: 50 }),
      price: faker.number.int({ min: 1, max: 1000 })
    };
  }
}