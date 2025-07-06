ALTER TABLE "sales" ADD COLUMN "shippingCharges" double precision DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "address" varchar(255);