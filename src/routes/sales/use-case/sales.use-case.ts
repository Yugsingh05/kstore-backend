import { db } from "../../../db";
import { SalesRepo } from "./sales.repo";

import { salesDetailsType, salesType } from "../sales.types";

export const createSale = async (data: {
  sale: salesType;
  saleDetails: salesDetailsType[];

}) => {
  const result = await db.transaction(async (tx) => {
    const repo = SalesRepo(tx);

    // 1. Create Sale
    const saleRes = await repo.createSale(data.sale);
    const sale = saleRes[0]; // since `.returning()` returns an array

    if (!sale) throw new Error("Failed to create sale. Please try again.");

    // 2. Create Sale Details
    const saleDetailsRes = await Promise.all(
      data.saleDetails.map((detail) =>
        repo.CreateSaleDetails({
          ...detail,
          saleId: sale.id, // ensure correct foreign key
        })
      )
    );

    return {
      ...sale,
      saleDetails: saleDetailsRes.map((res) => res[0]),
    };
  });

  return result;
};


export const getAllSales = () => {
    const salesRepo = SalesRepo();
    return salesRepo.getAllSales();
};

export const getSaleById = (id: string) => {
    const salesRepo = SalesRepo();
    return salesRepo.getSaleById(id);
};

export const getFullSalesDetails = (id: string) => {
    const salesRepo = SalesRepo();
    return salesRepo.getFullSalesDetails(id);
};

export const getSalesByUserId = (id: string) => {
    const salesRepo = SalesRepo();
    return salesRepo.getSalesByUserId(id);
};

export const CancelSale = (id: string) => {
    const salesRepo = SalesRepo();
    return salesRepo.CancelSale(id);
};