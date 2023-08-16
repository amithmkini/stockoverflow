CREATE TABLE IF NOT EXISTS "nse_list" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"md5sum" varchar(255) NOT NULL
);
