CREATE TABLE files (
	id serial NOT NULL,
	"type" varchar(255) NULL,
	"name" varchar(255) NULL,
	"data" bytea NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT files_pkey PRIMARY KEY (id)
);