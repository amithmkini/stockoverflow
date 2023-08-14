ALTER TABLE "holding" ALTER COLUMN "realised_profit_loss" SET DEFAULT '0';--> statement-breakpoint
ALTER TABLE "holding" ALTER COLUMN "realised_profit_loss" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "holding" ALTER COLUMN "unrealised_profit_loss" SET DEFAULT '0';--> statement-breakpoint
ALTER TABLE "holding" ALTER COLUMN "unrealised_profit_loss" DROP NOT NULL;