import prisma from "../../../client";
import { Result } from "@badrap/result";
import { StoreGetResult } from "../../../types/return-types";

/**
 * Get all stores that sell the product.
 *
 * Specifications:
 * - If any error occurrs, should return an unspecified error.
 * - Sort the stores by their name alphabetically (a -> z (set proper orderBy)).
 *
 * @param productId - ID of the product in the db
 *
 * @returns - `Result.ok(Store[])` on successful query
 *          - `Result.err(Error("Unspecified error"))` otherwise
 */
export const getStoresThatSellProduct = async (
  productId: string
): StoreGetResult => {
  /**
   * @todo
   */

  try {
      const res = await prisma.store.findMany({
          where: {
              products: {
                  some: {
                      productId: {
                          in: productId
                      }
                  }
              }
          },
          orderBy: {
            name: 'asc'
        }
      })

    return Result.ok(res)
  } catch {
    return Result.err(Error("Unspecified error"))
  }

};
