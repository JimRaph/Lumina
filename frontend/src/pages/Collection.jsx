import { useContext, useEffect, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopCreateContext";
import { assets } from "../assets/assets";
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
 const { products, search, showSearch } = useContext(ShopContext);
 const [showFilter, setShowFilter] = useState(false);
 const [filterProducts, setFilterProducts] = useState([]);
 const [category, setCategory] = useState([]);
 const [subCategory, setSubCategory] = useState([]);

 const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 const [selectedOption, setSelectedOption] = useState('relevance');

 const ICON_FILTER = 'filter invert sepia-0 saturate-100 brightness-[2] transition-all duration-200';

 const handleSelect = (value) => {
  setSelectedOption(value);
  setIsDropdownOpen(false);
};

 const toggleCategory = (e) => {
  const value = e.target.value;
  setCategory((prev) =>
   prev.includes(value)
    ? prev.filter((cat) => cat !== value)
    : [...prev, value]
  );
 };

 const toggleSubCategory = (e) => {
  const value = e.target.value;
  setSubCategory((prev) =>
   prev.includes(value)
    ? prev.filter((cat) => cat !== value)
    : [...prev, value]
  );
 };

 const options = [
 { value: "relevance", label: "Sort by: Relevance" },
 { value: "low-high", label: "Price: Low → High" },
 {value: "high-low", label: "Price: High → Low"},
 {value: "newest-first", label: "Latest Arrivals"},
 {value: "oldest-first", label: "Oldest Arrivals"}
];

 useEffect(() => {
  let result = [...products];

  if (showSearch && search) {
   result = result.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
   );
  }

  if (category.length > 0) {
   result = result.filter((p) => category.includes(p.category));
  }

  if (subCategory.length > 0) {
   result = result.filter((p) => subCategory.includes(p.subCategory));
  }

  setFilterProducts(result);
 }, [products, search, showSearch, category, subCategory]);


 const sortedProducts = useMemo(() => {
  const arr = [...filterProducts];

  switch (selectedOption) {
   case "low-high":
    return arr.sort((a, b) => a.price - b.price);

   case "high-low":
    return arr.sort((a, b) => b.price - a.price);

   case "newest-first":
    return arr.sort((a, b) => b.date - a.date);

   case "oldest-first":
    return arr.sort((a, b) => a.date - b.date);

   default:
    return arr;
  }
 }, [filterProducts, selectedOption]);


 return (
  <div className="sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10">
    <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 border-t border-gray-800 pt-10">


    <div className="min-w-60">
      <p onClick={() => setShowFilter(!showFilter)}
      className="my-2 text-xl flex items-center cursor-pointer gap-2 font-bold text-gray-200 hover:text-emerald-400 transition-colors"
      >
        FILTERS
        <img
          className={`h-3 sm:hidden ${ICON_FILTER} ${
          showFilter ? "rotate-90" : ""
          }`}
          src={assets.dropdown_icon}
          alt=""
        />
      </p>


    <div className={`bg-[#1a1a1a] rounded-xl pl-5 pr-3 py-5 mt-6 shadow-xl ${
      showFilter ? "" : "hidden"
      } sm:block`} >
      <p className="mb-4 text-sm font-bold text-emerald-400 uppercase tracking-widest">
        CATEGORIES
      </p>

      <div className="flex flex-col gap-3 text-sm font-light text-gray-300">
        {["Men", "Women", "Kids"].map((cat) => (
        <label
          key={cat}
          className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors"
        >
          <input
            type="checkbox"
            value={cat}
            onChange={toggleCategory}
            className="w-4 h-4 appearance-none border-2 border-gray-600 bg-gray-800 
            checked:bg-emerald-500 checked:border-emerald-500 transition-all focus:ring-1 focus:ring-emerald-400 rounded"
          />
            {cat.toUpperCase()}
        </label>
        ))}
      </div>
    </div>

    <div
    className={`bg-[#1a1a1a] rounded-xl pl-5 pr-3 py-5 mt-6 shadow-xl ${
      showFilter ? "" : "hidden"
    } sm:block`}>
      <p className="mb-4 text-sm font-bold text-emerald-400 uppercase tracking-widest">
        TYPE
      </p>

    <div className="flex flex-col gap-3 text-sm font-light text-gray-300">
      {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
      <label
        key={sub}
        className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors"
      >
        <input
          type="checkbox"
          value={sub}
          onChange={toggleSubCategory}
          className="w-4 h-4 appearance-none border-2 border-gray-600 bg-gray-800 
          checked:bg-emerald-500 checked:border-emerald-500 transition-all focus:ring-1 focus:ring-emerald-400 rounded"
        />
        {sub.toUpperCase()}
      </label>
      ))}
    </div>
    </div>
    </div>


    <div className="flex-1">

    <div className="flex justify-between items-center mb-6">
    <Title text1={"ALL"} text2={"COLLECTIONS"} />

    <div className="relative z-20"> 
      <div 
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="bg-[#1a1a1a] text-gray-300 border-2 border-green-900 
        focus:border-emerald-400 text-sm px-4 py-2 rounded-lg cursor-pointer 
        outline-none flex items-center justify-between gap-3 min-w-[150px]"
      >
        {options.find(opt => opt.value === selectedOption).label}
      </div>

      {isDropdownOpen && (
        <div className="absolute top-full mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
          {options.map((option) => (
            <div 
          key={option.value}
          onClick={() => handleSelect(option.value)}
          className="px-4 py-2 text-sm text-gray-300 cursor-pointer 
          hover:bg-emerald-600 hover:text-white transition-colors 
          first:rounded-t-lg last:rounded-b-lg"
            >
          {option.label}
            </div>
            ))}
        </div>
      )}
    </div>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 gap-y-10">
    {sortedProducts.map((product) => (
      <ProductItem
      key={product._id}
      id={product._id}
      name={product.name}
      price={product.price}
      image={product.image}
      />
    ))}

    {sortedProducts.length === 0 && (
      <p className="text-gray-400 mt-10">No products found.</p>
    )}
    </div>

    </div>

   </div>
  </div>
 );
};

export default Collection;