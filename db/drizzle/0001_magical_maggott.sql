DO $$ BEGIN
 CREATE TYPE "transaction_type" AS ENUM('buy', 'sell');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "holding" (
	"id" uuid PRIMARY KEY NOT NULL,
	"portfolio_id" uuid NOT NULL,
	"symbol_id" integer NOT NULL,
	"avg_price_per_share" numeric(22, 2) NOT NULL,
	"quantity" integer NOT NULL,
	"realised_profit_loss" numeric(22, 2) NOT NULL,
	"unrealised_profit_loss" numeric(22, 2) NOT NULL,
	"value" numeric(22, 2) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transaction" (
	"id" uuid PRIMARY KEY NOT NULL,
	"holdings_id" uuid NOT NULL,
	"tx_date" date NOT NULL,
	"tx_type" "transaction_type" NOT NULL,
	"quantity" integer NOT NULL,
	"value" numeric(22, 2) NOT NULL,
	"brokerage" numeric(22, 2) NOT NULL,
	"stt" numeric(22, 2) NOT NULL,
	"other_charges" numeric(22, 2) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "symbol" (
	"id" serial PRIMARY KEY NOT NULL,
	"symbol" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"exchange" varchar(255) NOT NULL,
	"current_price" numeric(22, 2) NOT NULL,
	"currency" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "timeseries" (
	"id" serial PRIMARY KEY NOT NULL,
	"symbol_id" integer NOT NULL,
	"date" date NOT NULL,
	"open" numeric(22, 2) NOT NULL,
	"high" numeric(22, 2) NOT NULL,
	"low" numeric(22, 2) NOT NULL,
	"close" numeric(22, 2) NOT NULL,
	"volume" integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_slug_index" ON "portfolio" ("user_id","slug");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "holding" ADD CONSTRAINT "holding_portfolio_id_portfolio_id_fk" FOREIGN KEY ("portfolio_id") REFERENCES "portfolio"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "holding" ADD CONSTRAINT "holding_symbol_id_symbol_id_fk" FOREIGN KEY ("symbol_id") REFERENCES "symbol"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction" ADD CONSTRAINT "transaction_holdings_id_holding_id_fk" FOREIGN KEY ("holdings_id") REFERENCES "holding"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "timeseries" ADD CONSTRAINT "timeseries_symbol_id_symbol_id_fk" FOREIGN KEY ("symbol_id") REFERENCES "symbol"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
