import React, {useState} from 'react'
import {Plus} from 'lucide-react'

import { useProducts } from '../context/productContext';
function Header() {
   
const { 
        setIsAddProductModalOpen}=useProducts()

   


   
    return (
      <header className="sticky top-0 z-40 flex flex-wrap justify-between items-center px-4 py-4 bg-white shadow-md">
      <div className="flex items-center gap-2 text-blue-700 text-xl sm:text-2xl font-bold">
        <span className="text-2xl">🛍</span>
        <span>Product Inventory Management App</span>
      </div>
      <button
       onClick={setIsAddProductModalOpen.bind(null, true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-3 sm:mt-0 rounded-md text-sm sm:text-base transition-all"
      >
        <Plus className="w-4 h-4" />
        Add Product
      </button>

     
    </header>

    )
}

export default Header