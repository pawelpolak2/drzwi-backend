-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
