import { Migration } from '@mikro-orm/migrations';

export class Migration20240428135234 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_cart_uuid_foreign";');

    this.addSql('alter table "user" alter column "cart_uuid" type varchar(255) using ("cart_uuid"::varchar(255));');
    this.addSql('alter table "user" alter column "cart_uuid" drop not null;');
    this.addSql('alter table "user" add constraint "user_cart_uuid_foreign" foreign key ("cart_uuid") references "cart" ("uuid") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_cart_uuid_foreign";');

    this.addSql('alter table "user" alter column "cart_uuid" type varchar(255) using ("cart_uuid"::varchar(255));');
    this.addSql('alter table "user" alter column "cart_uuid" set not null;');
    this.addSql('alter table "user" add constraint "user_cart_uuid_foreign" foreign key ("cart_uuid") references "cart" ("uuid") on update cascade;');
  }

}
