import { Request, Response } from 'express';
import mongoose from 'mongoose';
import responseLib from '@/src/lib/responseLib';
import { Products } from '@/src/model/product.model';

/**
 * @author  Jyoti prakash panigrahi
 * @desc    Get user profile
 * @route   GET /api/v1/get-all-product
 * @access  Not Protected
 */
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search?.toString().trim() || '';
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }


    const [products, total] = await Promise.all([
      Products.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Products.countDocuments(filter)
    ]);

    const response = responseLib.generateApiResponse(
      false,
      {
        products,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
      'products fetch succefully',
      undefined
    );
    return res.status(200).send(response);
  } catch (error: any) {
    const response = responseLib.generateApiResponse(true, null, 'Failed to fetch products', error);
    return res.status(500).send(response);
  }
};

/**
 * @author  Jyoti prakash panigrahi
 * @desc    Get user profile
 * @route   POST /api/v1/create-product
 * @access  Not Protected
 */

const createProducts = async (req: Request, res: Response) => {
  try {
    let product_data = req.body;
    const newProduct = new Products(product_data);
    await newProduct.save();

    const response = responseLib.generateApiResponse(
      false,
      {},
      'product created succefully',
      undefined
    );
    return res.status(201).send(response);
  } catch (error: any) {
    const response = responseLib.generateApiResponse(true, null, 'Failed to create product', error);
    return res.status(500).send(response);
  }
};

/**
 * @author  Jyoti prakash panigrahi
 * @desc    Get user profile
 * @route   POST /api/v1/update-product
 * @access  Not Protected
 */
const updateProducts = async (req: Request, res: Response) => {
  try {
    let { id, ...product_data } = req.body;
    await Products.findByIdAndUpdate(id, product_data, {
      runValidators: true,
    });

    const response = responseLib.generateApiResponse(
      false,
      {},
      'product updated succefully',
      undefined
    );
    return res.status(201).send(response);
  } catch (error: any) {
    const response = responseLib.generateApiResponse(true, null, 'Failed to update product', error);
    return res.status(500).send(response);
  }
};

/**
 * @author  Jyoti prakash panigrahi
 * @desc    Get user profile
 * @route   POST /api/v1/delete-product
 * @access  Not Protected
 */

const deleteProduct = async (req: Request, res: Response) => {
  try {
    let product_id = req.body.id;
    console.log(product_id, 'delete hit =====')
    await Products.findByIdAndDelete(product_id);
    const response = responseLib.generateApiResponse(
      false,
      {},
      'product deleted succefully',
      undefined
    );
    return res.status(201).send(response);
  } catch (error: any) {
    const response = responseLib.generateApiResponse(true, null, 'Failed to delete product', error);
    return res.status(500).send(response);
  }
};

export default {
  getAllProducts,
  createProducts,
  updateProducts,
  deleteProduct,
};
