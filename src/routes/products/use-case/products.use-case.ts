import { CategoryType, ProductType } from "../products.types";
import { CataLogRepo } from "./products.repo";

export const CreateProduct = (data: ProductType) => {
    const productRepo = CataLogRepo();
    return productRepo.createProduct(data);
};

export const GetAllProducts = () => {
    const productRepo = CataLogRepo();
    return productRepo.getAllProducts();
};


export const GetProductById = (id: string) => {
    const productRepo = CataLogRepo();
    return productRepo.getProductById(id);
};

export const DeleteProduct = (id: string) => {
    const productRepo = CataLogRepo();
    return productRepo.deleteProduct(id);
};

export const UpdateProduct = (id: string, data: ProductType) => {
    const productRepo = CataLogRepo();
    return productRepo.updateProduct(id, data);
};

export const CreateCategory = (data: CategoryType) => {
    const productRepo = CataLogRepo();
    return productRepo.createCategory(data);
};

export const GetAllCategories = () => {
    const productRepo = CataLogRepo();
    return productRepo.getAllCategories();
};

export const GetCategoryById = (id: string) => {
    const productRepo = CataLogRepo();
    return productRepo.getCategoryById(id);
};

export const DeleteCategory = (id: string) => {
    const productRepo = CataLogRepo();
    return productRepo.deleteCategory(id);
};

export const updateCategory = (id: string, data: CategoryType) => {
    const productRepo = CataLogRepo();
    return productRepo.updateCategory(id, data);
};