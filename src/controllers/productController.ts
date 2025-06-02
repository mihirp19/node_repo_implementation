import { Request, Response } from "express";
import { ProductService } from "../services/productService";
import { ProductRepository } from "../repository/productRepository";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

// Add Product Controller
export const addProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.addProduct(req.body);
    res.status(201).json({
      product,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
// Get Product Controller
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProductsService();
    if (products.length === 0) {
      res.status(404).json({ message: "No Products found" });
    }
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
// Filter Product Controller
export const getProductBySearch = async (req: Request, res: Response) => {
  try {
    const {
      search = "",
      sortBy = "createdAt",
      sortOrder = "ASC",
      page = 1,
      limit = 5,
      category = [],
      price = {},
      date = {},
    } = req.body;

    const searchResults = await productService.getProductsBySearchService(
      search,
      sortBy,
      sortOrder,
      page,
      limit,
      category,
      price,
      date
    );
    const { products, pagination } = searchResults;

    if (!products || products.length === 0) {
      res.status(404).json({ message: "No products match the search" });
      return;
    }

    res.status(200).json({ products, pagination });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};
// Get Category counts
export const getCategoryCount = async (req: Request, res: Response) => {
  try {
    const categoriesCount = await productService.getCategoryCountService();
    res.status(200).json({ categoriesCount });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};

// Get Product By Id Controller
export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await productService.getProductById(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ product });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};
// Update Product Controller
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProduct = await productService.updateProduct(id, req.body);
    if (!updateProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product updated", updatedProduct });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};
// Delete Product Controller
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteProduct = await productService.deleteProduct(id);
    if (!deleteProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product deleted", deleteProduct });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};
// Decrease Product Stock Controller
export const decreaseProductStock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const decreaseStock = await productService.decreaseProductStockService(
      id,
      quantity
    );
    if (!decreaseStock) {
      res.status(404).json({ message: "Out of stock or product not found" });
      return;
    }
    res.status(200).json({ message: "Product stock decreased" });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};
// Increase Product Stock Controller
export const increaseProductStock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const increaseStock = await productService.increaseProductStockService(
      id,
      quantity
    );
    if (!increaseStock) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product stock increased" });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};
