import { Migration } from '@mikro-orm/migrations';

export class Migration20240503205621 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "password" varchar(255) not null default \'\', add column "role" varchar(255) not null default \'user\';');
    this.addSql('alter table "user" rename column "name" to "mail";');
    this.addSql('alter table "user" add constraint "user_mail_unique" unique ("mail");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_mail_unique";');
    this.addSql('alter table "user" drop column "password", drop column "role";');

    this.addSql('alter table "user" rename column "mail" to "name";');
  }

}
