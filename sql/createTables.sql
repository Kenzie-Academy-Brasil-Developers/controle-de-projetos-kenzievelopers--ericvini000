CREATE TABLE IF NOT EXISTS "developers"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL UNIQUE
);

CREATE TYPE "OS" AS ENUM('Linux', 'MacOS', 'Windows');

CREATE TABLE IF NOT EXISTS "developerInfos"(
    "id" SERIAL PRIMARY KEY,
    "developerSince" VARCHAR(50) NOT NULL,
    "preferredOS" "OS" NOT NULL,
    "developerId" INTEGER UNIQUE NOT NULL,
    FOREIGN KEY("developerId") 
        REFERENCES "developers"("id") 
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "projects"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "repository" VARCHAR(120) NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE,
    "developerId" INTEGER,
    FOREIGN KEY("developerId") 
        REFERENCES "developers"("id") 
            ON DELETE SET NULL
);
