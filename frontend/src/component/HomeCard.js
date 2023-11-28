import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({ name, image, category, price, id }) => {
    return (
        <div className="bg-teal-600 p-2">
            <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
                <div className="w-44 min-h-[180px]">
                    <img src={image} className="h-full w-full" alt={name} />
                </div>
                <h3 className="pt-2 font-semibold text-xs text-amber-300">{name}</h3>
                <p className="font-semibold text-xs text-white capitalize">{category}</p>
                <p><span className="text-white text-base font-semibold">{price}</span></p>
            </Link>
        </div>
    );
};

export default HomeCard;
