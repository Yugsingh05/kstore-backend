ALTER TABLE "products" ADD COLUMN "costPrice" integer DEFAULT 20 NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "setOf10" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "setof20" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "setof50" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "setof100" integer DEFAULT 0;