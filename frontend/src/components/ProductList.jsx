import React, { useEffect, useState } from "react";

import { Pencil, Trash2 } from "lucide-react";
import ResponsivePagination from "react-responsive-pagination";
import { useProducts } from "../context/productContext";
import EditProductModal from "../model/EditProductModal";
const ProductList = () => {
  const {
    products,
    totalPages,
    loading,
    total,
    page,
    setPage,
    limit,
    setLimit,
    setSearch,
    search,
    fetchProducts,
    handleDelete
  } = useProducts();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [page, limit, search]);


  
  return (
    <main className="p-4">
      <EditProductModal
        product={selectedProduct}
        isOpen={editModalOpen}
        onClose={setEditModalOpen.bind(null, false)}
      />
      <div className="mb-4 flex flex-wrap justify-between gap-4">
        <input
          type="text"
          placeholder="Search by name or category"
          value={search}
          onChange={handleSearchChange}
          className="px-3 py-2 border rounded-md"
        />

        <div className="mb-4 flex items-center gap-4 cursor-pointer">
          <label className="text-sm">Items per page:</label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Stock</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && products.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-3 text-center">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100">
                  <td className="p-3 border">{product.name}</td>
                  <td className="p-3 border">${product.price.toFixed(2)}</td>
                  <td className="p-3 border">{product.category}</td>
                  <td className="p-3 border">{product.stock}</td>
                  <td className="p-3 border text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={()=>{
                            setSelectedProduct(product)
                            setEditModalOpen(true)
                        }}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center">
        <ResponsivePagination
          current={page}
          total={totalPages}
          onPageChange={setPage}
        />
      </div>
    </main>
  );
};

export default ProductList;
