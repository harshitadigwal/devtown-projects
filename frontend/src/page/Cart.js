import React from 'react';
import { useSelector } from 'react-redux';
import CartProduct from '../component/cartProduct';
import emptyCartImage from "../epics/emptycart.gif"


const Cart = () => {
    const productCartItems = useSelector((state) => state.product.cartItem)
    console.log(productCartItems)

    const totalPrice = productCartItems.reduce((acc, curr) => acc + parseInt(curr.total), 0)
    const totalQty = productCartItems.reduce((acc, curr) => acc + parseInt(curr.qty), 0)

    return (
        <>
            <div className='p-5 md:p-9'>
                <h2 className='text-3xl md:text-2xl text-rose-300 underline decoration-rose-300 font-bold text-teal-600'>My Cart</h2>
                {productCartItems[0] ?
                    <div className='my-8 flex gap-4'>
                        {/* display cart items */}
                        <div className='w-full max-w-3xl'>
                            {
                                productCartItems.map(el => {
                                    return (
                                        <CartProduct
                                            key={el._id}
                                            id={el._id}
                                            name={el.name}
                                            image={el.image}
                                            category={el.category}
                                            qty={el.qty}
                                            total={el.total}
                                            price={el.price}
                                        />
                                    )
                                })
                            }
                        </div>

                        {/* total items */}
                        <div className='w-full max-w-lg bg-white border rounded ml-auto p-2'>
                            <h2 className='bg-cyan-200 text-teal-700 font-bold text-2xl p-2 rounded'>Order Summary</h2>
                            <div className='flex w-full text-rose-300 py-2 text-lg font-bold border-b'>
                                <p>Total Quantity:</p>
                                <p className='ml-auto w-32 font-bold'>{totalQty}</p>
                            </div>
                            <div className='flex w-full text-rose-300 py-2 text-lg font-bold border-b'>
                                <p>Total Price:</p>
                                <p className='ml-auto w-32 font-bold'>{totalPrice}</p>
                            </div>
                            <button className='bg-teal-700 text-white mt-4 ml-1 p-2 font-bold rounded hover:bg-amber-300 hover:text-teal-700 w-40'>Proceed To Pay</button>
                        </div>
                    </div>

                    :
                    <>
                        <div className='flex w-full justify-center items-center flex-col'>
                            <img src={emptyCartImage} className='w-full max-w-sm' />
                            <p className='text-rose-300 font-bold text-xl'>Your cart looks empty. Let's add some items to the cart.</p>
                        </div>
                    </>
                }
            </div>

        </>
    )
}


export default Cart;