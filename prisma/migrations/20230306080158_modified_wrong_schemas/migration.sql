/*
  Warnings:

  - The primary key for the `Favorites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `Favorites` table. All the data in the column will be lost.
  - The primary key for the `ProductsOnCarts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `ProductsOnCarts` table. All the data in the column will be lost.
  - The primary key for the `ProductsOnOrders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `ProductsOnOrders` table. All the data in the column will be lost.
  - Added the required column `productSKU` to the `Favorites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productSKU` to the `ProductsOnCarts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productSKU` to the `ProductsOnOrders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnCarts" DROP CONSTRAINT "ProductsOnCarts_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnOrders" DROP CONSTRAINT "ProductsOnOrders_productId_fkey";

-- AlterTable
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_pkey",
DROP COLUMN "productId",
ADD COLUMN     "productSKU" INTEGER NOT NULL,
ADD CONSTRAINT "Favorites_pkey" PRIMARY KEY ("userId", "productSKU");

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "total" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "ProductsOnCarts" DROP CONSTRAINT "ProductsOnCarts_pkey",
DROP COLUMN "productId",
ADD COLUMN     "productSKU" INTEGER NOT NULL,
ADD CONSTRAINT "ProductsOnCarts_pkey" PRIMARY KEY ("cartId", "productSKU");

-- AlterTable
ALTER TABLE "ProductsOnOrders" DROP CONSTRAINT "ProductsOnOrders_pkey",
DROP COLUMN "productId",
ADD COLUMN     "productSKU" INTEGER NOT NULL,
ADD CONSTRAINT "ProductsOnOrders_pkey" PRIMARY KEY ("orderId", "productSKU");

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "cartId" DROP NOT NULL,
ALTER COLUMN "recovery" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductsOnCarts" ADD CONSTRAINT "ProductsOnCarts_productSKU_fkey" FOREIGN KEY ("productSKU") REFERENCES "Product"("SKU") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnOrders" ADD CONSTRAINT "ProductsOnOrders_productSKU_fkey" FOREIGN KEY ("productSKU") REFERENCES "Product"("SKU") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_productSKU_fkey" FOREIGN KEY ("productSKU") REFERENCES "Product"("SKU") ON DELETE RESTRICT ON UPDATE CASCADE;
