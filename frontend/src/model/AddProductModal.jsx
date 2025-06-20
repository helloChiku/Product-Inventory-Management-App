import React, { useState } from "react";
import { createProduct } from "../api/product";
import toast from "react-hot-toast";
const AddProductModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.price || isNaN(+formData.price) || +formData.price <= 0)
      newErrors.price = "Price must be a positive number";
    if (!formData.stock || isNaN(+formData.stock) || +formData.stock < 0)
      newErrors.stock = "Stock must be 0 or more";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length) {
        setErrors(validationErrors);
        return;
      }

      await createProduct(formData);
    
      toast.success("✅ Product added successfully!");
      onClose();
      setErrors({});
      setFormData({ name: "", price: "", category: "", stock: "" });
    } catch (e) {
      toast.error(e?.message || "❌ Failed to add product");
      setFormData({ name: "", price: "", category: "", stock: "" });
    } 
  };

  if (!isOpen) return null;

  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white  rounded-lg w-full max-w-md">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "price", "category", "stock"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium capitalize mb-1 text-gray-700">
                {field}
              </label>
              <input
                type={
                  field === "price" || field === "stock" ? "number" : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 ${
                  errors[field] ? "focus:ring-red-400" : "focus:ring-blue-400"
                }`}
              />
              {errors[field] && (
                <p className="text-sm text-red-600 mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md cursor-pointer"
            >
              Cancel
            </button>
            <button
            onClick={handleSubmit}
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold cursor-pointer"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default AddProductModal;
