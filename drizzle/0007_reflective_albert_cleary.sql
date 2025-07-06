ALTER TABLE "products" ADD COLUMN "productImages" jsonb DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "dimensions" varchar(255);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "material" varchar(255);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "customization" varchar(255);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "features" jsonb DEFAULT '[]'::jsonb;