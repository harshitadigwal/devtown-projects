import React, { useEffect, useState } from "react";
import FilterProduct from "./FilterProduct";
import CardFeature from "./cardFeature";
import { useSelector } from "react-redux";

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];

  const [filterby, setFilterby] = useState("");
  const [dataFilter, setDataFilter] = useState(productData);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterby(category)
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter([...filter]);
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl text-rose-300 underline decoration-cyan-300 mb-6">
        {heading}
      </h2>

      <div className="flex gap-8 justify-center">
        {categoryList[0] &&
          categoryList.map((el, index) => (
            <FilterProduct
              key={index}
              category={el}
              isActive={el.toLowerCase() === filterby.toLowerCase()}
              onClick={() => handleFilterProduct(el)}
            />
          ))}
      </div>

      {dataFilter.length === 0 ? (
        <p>No products match the current filter.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {dataFilter.map((el) => (
            <CardFeature
              key={el._id}
              id={el._id}
              image={el.image}
              name={el.name}
              category={el.category}
              price={el.price}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProduct;
