CREATE TABLE IF NOT EXISTS "portfolio" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" varchar(255)
);
