import React from 'react'

const States = () => {
  return (
 <>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-black text-white">


  <div class="bg-[#1a1a1a] rounded-xl p-6 flex items-center gap-4 shadow-md transform transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:bg-[#222]">
    <div class="transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m3-4a4 4 0 100-8 4 4 0 000 8zm6 4a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    </div>
    <div>
      <p class="text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">Total Users</p>
      <h2 class="text-2xl font-semibold">1,437</h2>
    </div>
  </div>

  <div class="bg-[#1a1a1a] rounded-xl p-6 flex items-center gap-4 shadow-md transform transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:bg-[#222]">
    <div class="transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-6">
      <span class="text-2xl">$</span>
    </div>
    <div>
      <p class="text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">Total Sales</p>
      <h2 class="text-2xl font-semibold">$182,450</h2>
    </div>
  </div>

  <div class="bg-[#1a1a1a] rounded-xl p-6 flex items-center gap-4 shadow-md transform transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:bg-[#222]">
    <div class="transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4" />
      </svg>
    </div>
    <div>
      <p class="text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">Total Products</p>
      <h2 class="text-2xl font-semibold">674</h2>
    </div>
  </div>

  {/* <!-- Stock --> */}
  <div class="bg-[#1a1a1a] rounded-xl p-6 flex items-center gap-4 shadow-md transform transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:bg-[#222]">
    <div class="transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11V9a4 4 0 014-4h1a4 4 0 014 4v2M5 13h14v7H5z" />
      </svg>
    </div>
    <div>
      <p class="text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">Stock</p>
      <h2 class="text-2xl font-semibold">12,845</h2>
    </div>
  </div>
</div>


 </>
  )
}

export default States
