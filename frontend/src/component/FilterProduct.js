import React from "react";
import { IoFilter } from "react-icons/io5";

const FilterProduct = ({ category, onClick, isActive }) => {
    return (
        <div onClick={onClick}>
            <div className={`text-2xl p-5 text-white text-center rounded-full cursor-pointer ${isActive ? "bg-cyan-300 text-white" : "bg-teal-700"}`}>
                <IoFilter />
            </div>
            <p className="text-center font-medium my-1 capitalize">{category}</p>
        </div>
    );
};

export default FilterProduct;

