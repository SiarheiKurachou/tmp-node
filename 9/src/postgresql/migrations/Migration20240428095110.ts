import { Migration } from '@mikro-orm/migrations';

export class Migration20240428095110 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "cart" ("uuid" varchar(255) not null, "is_deleted" boolean not null default false, constraint "cart_pkey" primary key ("uuid"));');

    this.addSql('create table "delivery" ("uuid" varchar(255) not null, "type" varchar(255) not null, "address" varchar(255) not null, constraint "delivery_pkey" primary key ("uuid"));');

    this.addSql('create table "payment" ("uuid" varchar(255) not null, "type" varchar(255) not null, "address" varchar(255) not null, "credit_card" varchar(255) not null, constraint "payment_pkey" primary key ("uuid"));');

    this.addSql('create table "product" ("uuid" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) not null, "price" int not null, constraint "product_pkey" primary key ("uuid"));');

    this.addSql('create table "cart_product" ("uuid" varchar(255) not null, "count" int not null, "product_uuid" varchar(255) not null, "cart_uuid" varchar(255) not null, constraint "cart_product_pkey" primary key ("uuid"));');

    this.addSql('create table "user" ("uuid" varchar(255) not null, "name" varchar(255) not null, "cart_uuid" varchar(255) not null, constraint "user_pkey" primary key ("uuid"));');
    this.addSql('alter table "user" add constraint "user_cart_uuid_unique" unique ("cart_uuid");');

    this.addSql('create table "order" ("uuid" varchar(255) not null, "user_uuid" varchar(255) not null, "cart_uuid" varchar(255) not null, "payment_uuid" varchar(255) not null, "delivery_uuid" varchar(255) not null, "comment" varchar(255) not null, "status" varchar(255) not null, "total" int not null, constraint "order_pkey" primary key ("uuid"));');
    this.addSql('alter table "order" add constraint "order_cart_uuid_unique" unique ("cart_uuid");');
    this.addSql('alter table "order" add constraint "order_payment_uuid_unique" unique ("payment_uuid");');
    this.addSql('alter table "order" add constraint "order_delivery_uuid_unique" unique ("delivery_uuid");');

    this.addSql('alter table "cart_product" add constraint "cart_product_product_uuid_foreign" foreign key ("product_uuid") references "product" ("uuid") on update cascade;');
    this.addSql('alter table "cart_product" add constraint "cart_product_cart_uuid_foreign" foreign key ("cart_uuid") references "cart" ("uuid") on update cascade;');

    this.addSql('alter table "user" add constraint "user_cart_uuid_foreign" foreign key ("cart_uuid") references "cart" ("uuid") on update cascade;');

    this.addSql('alter table "order" add constraint "order_user_uuid_foreign" foreign key ("user_uuid") references "user" ("uuid") on update cascade;');
    this.addSql('alter table "order" add constraint "order_cart_uuid_foreign" foreign key ("cart_uuid") references "cart" ("uuid") on update cascade;');
    this.addSql('alter table "order" add constraint "order_payment_uuid_foreign" foreign key ("payment_uuid") references "payment" ("uuid") on update cascade;');
    this.addSql('alter table "order" add constraint "order_delivery_uuid_foreign" foreign key ("delivery_uuid") references "delivery" ("uuid") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "cart_product" drop constraint "cart_product_cart_uuid_foreign";');

    this.addSql('alter table "user" drop constraint "user_cart_uuid_foreign";');

    this.addSql('alter table "order" drop constraint "order_cart_uuid_foreign";');

    this.addSql('alter table "order" drop constraint "order_delivery_uuid_foreign";');

    this.addSql('alter table "order" drop constraint "order_payment_uuid_foreign";');

    this.addSql('alter table "cart_product" drop constraint "cart_product_product_uuid_foreign";');

    this.addSql('alter table "order" drop constraint "order_user_uuid_foreign";');

    this.addSql('drop table if exists "cart" cascade;');

    this.addSql('drop table if exists "delivery" cascade;');

    this.addSql('drop table if exists "payment" cascade;');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "cart_product" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "order" cascade;');
  }

}
