import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  stock: number;
}

const productSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true, minlength: 3 },
    price: { type: Number, required: true, min: 0.01 },
    category: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const Products: Model<IProduct> =
  mongoose.models.products || mongoose.model<IProduct>('products', productSchema);
