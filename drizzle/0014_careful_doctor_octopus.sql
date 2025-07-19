ALTER TABLE "cart" ADD COLUMN "setOf10" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "cart" ADD COLUMN "setof20" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "cart" ADD COLUMN "setof50" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "cart" ADD COLUMN "setof100" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "sale_details" ADD COLUMN "setOf10" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "sale_details" ADD COLUMN "setof20" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "sale_details" ADD COLUMN "setof50" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "sale_details" ADD COLUMN "setof100" integer DEFAULT 0;