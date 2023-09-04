/*
  Warnings:

  - You are about to drop the `OrderedBook` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orderedBooks` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderedBook" DROP CONSTRAINT "OrderedBook_bookId_fkey";

-- DropForeignKey
ALTER TABLE "OrderedBook" DROP CONSTRAINT "OrderedBook_orderId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderedBooks" JSONB NOT NULL;

-- DropTable
DROP TABLE "OrderedBook";
