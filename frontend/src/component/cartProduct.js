import React from "react";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteItems, increaseQty, decreaseQty } from "../redux/productSlice";

const CartProduct = ({ id, name, image, category, qty, total, price }) => {
    const dispatch = useDispatch();

    return (
        <div className="bg-rose-50 p-4 flex gap-4 rounded border">
            <div className="bg-white rounded p-3">
                <img src={image} className="h-36 w-40 object-cover rounded" alt={name} />
            </div>
            <div className="flex flex-col p-5 w-full">
                <div className="flex justify-between">
                    <h3 className="font-semibold text-teal-700 text-lg md:text-xl">{name}</h3>
                    <div className="cursor-pointer text-amber-300 hover:text-cyan-300 text-lg md:text-3xl" onClick={() => dispatch(deleteItems(id))}>
                        <MdDelete />
                    </div>
                </div>
                <p className="font-semibold text-base md:text-lg text-amber-400 capitalize">{category}</p>
                <p>
                    <span className="text-teal-700 text-lg font-semibold md:text-xl">{price}</span>
                </p>
                <div className="flex justify-between">
                    <div className="flex gap-4 py-1 items-center">
                        <button onClick={() => dispatch(increaseQty(id))} className="font-bold py-1 px-1 text-white bg-rose-300 hover:bg-amber-300 hover:text-teal-700 rounded">
                            <IoMdAdd />
                        </button>
                        <p className="font-semibold">{qty}</p>
                        <button onClick={() => dispatch(decreaseQty(id))} className="font-bold py-1 px-1 text-white bg-rose-300 hover:bg-amber-300 hover:text-teal-700 rounded">
                            <RiSubtractFill />
                        </button>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-teal-700">
                        <p>Total:</p>
                        <p>{total}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;
