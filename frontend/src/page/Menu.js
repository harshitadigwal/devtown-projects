import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AllProduct from '../component/AllProduct';
import { addItems } from '../redux/productSlice';

const Menu = () => {
    const { filterby } = useParams();
    const dispatch = useDispatch();
    const productData = useSelector(state => state.product.productList);
    const productDisplay = productData.find(el => el._id === filterby);

    if (!productDisplay) {
        // If the product is not found, you can handle it accordingly
        return <div>Product not found</div>;
    }

    const handleAddToCart = (e) => {
        dispatch(addItems(productDisplay))
    };


    return (
        <div className='p-2 md:p-8'>
            <div className='w-full md:flex max-w-4xl m-auto bg-white'>
                <div className='max-w-lg min-w-[200px] shadow overflow-hidden w-full p-5'>
                    <img src={productDisplay?.image} alt={productDisplay?.name} className='hover:scale-105 transition-all h-full' />
                </div>
                <div className='flex flex-col gap-2 p-5'>
                    <h3 className="pt-2 font-semibold text-xl text-amber-400 text-2xl md:text-4xl">{productDisplay.name}</h3>
                    <p className="font-semibold text-lg md:text-2xl text-teal-700 capitalize">{productDisplay.category}</p>
                    <p><span className="text-teal-700 text-xl font-semibold md:text-3xl">{productDisplay.price}</span></p>

                    <div className='flex gap-4 py-1'>
                        <button className='w-32 font-bold py-1 px-2 text-white bg-rose-300 hover:bg-amber-300 hover:text-teal-700 min-w-[100px] rounded'>Buy Now</button>
                        <button onClick={handleAddToCart} className='w-32 font-bold py-2 px-2 text-white bg-rose-300 hover:bg-amber-300 hover:text-teal-700 min-w-[100px] rounded'>Add To Cart</button>
                    </div>
                    <div>
                        <p className='text-black py-3 font-semibold text-lg'>
                            Know your choice:
                        </p>
                        <p>
                            {productDisplay.description}
                        </p>
                    </div>
                </div>

            </div>

            <AllProduct heading={"Related Products"} />
        </div>
    );
};

export default Menu;
