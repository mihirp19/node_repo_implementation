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
export const getProductByFilter = async (req: Request, res: Response) => {
  try {
    const { title, category } = req.body;
    const filteredResults = await productService.getProductsByFilterService({
      title,
      category,
    });
    if (!filteredResults || filteredResults.length === 0) {
      res.status(404).json({ message: "No products match the search" });
    }
    res.status(200).json({ filteredResults });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
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
  }
};
// Update Product Controller
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProduct = await productService.updateProduct(id, req.body);
    if (!updateProduct) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated", updatedProduct });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
// Delete Product Controller
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteProduct = await productService.deleteProduct(id);
    if (!deleteProduct) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted", deleteProduct });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
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
    }
    res.status(200).json({ message: "Product stock decreased" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
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
    }
    res.status(200).json({ message: "Product stock increased" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
