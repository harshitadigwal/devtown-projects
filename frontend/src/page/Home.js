import React, { useEffect, useState } from 'react';
import mylogo from '../epics/mylogo.png';
import HomeCard from '../component/HomeCard';
import { useSelector } from 'react-redux';
import CardFeature from '../component/cardFeature';
import FilterProduct from '../component/FilterProduct';
import AllProduct from '../component/AllProduct';



const Home = () => {
    const productData = useSelector((state) => state.product.productList)
    const homeProductCartList = productData.slice(46, 51)
    const homeProductCartListMakeup = productData.filter(el => el.category === 'makeup', [])


    return (
        <div className='p-4 md:p-12 bg-rose-50'>

            <div className='md:flex'>
                <div className='md:w-1/2'>
                    <div className=''>
                        <img src={mylogo} className='h-10 md:8 rounded-lg' />
                    </div>
                    <h2 className='text-4xl md:text-4xl font-semibold pt-2'>Unlock Your <span className='text-rose-400 text-4xl md:text-4xl'>Beauty</span>  Secrets: Limited-time Offers Inside!</h2>
                    <p className='text-2xl font-semibold text-teal-700 py-2'>Dare to Be Different: Beauty Beyond Boundaries</p>
                    <p className='text-base text-teal-600 py-3'>Step into a World of Timeless Beauty and Modern Elegance. Discover Your Radiance with Eighteen. Unveil a Symphony of Colors, Textures, and Transformative Formulas that Enhance Your Natural Beauty. From Luxurious Skincare to Trendsetting Cosmetics, Elevate Your Beauty Rituals with Products Crafted for Confidence and Individuality. Embrace the Power of Self-Expression, Unleash Your Glow, and Redefine Your Beauty Journey. Welcome to Eighteen– Where Every Look Tells a Story.</p>
                    <button className='font-bold py-1  px-2 text-white bg-rose-400 hover:bg-rose-400 hover:text-teal-700 rounded'>Shop Now</button>
                </div>
                <div className='md:w-1/2 flex flex-wrap gap-4 p-4 justify-center'>
                    {
                        homeProductCartList[0] && homeProductCartList.map(el => {
                            return (
                                <HomeCard
                                    key={el._id}
                                    id={el._id}
                                    image={el.image}
                                    name={el.name}
                                    price={el.price}
                                    category={el.category}
                                />
                            )
                        })
                    }

                </div>

            </div>

            <hr className='py-3' />

            <div className=''>
                <div>
                    <h2 className='font-bold text-2xl text-rose-300 underline decoration-cyan-300 mb-6'>Makeup</h2>
                    <div className='flex justify-center mb-4'>
                        {/* <button className=''>

                        </button> */}
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
                    {homeProductCartListMakeup.map(el => (
                        <CardFeature
                            key={el._id}
                            id={el._id}
                            name={el.name}
                            category={el.category}
                            price={el.price}
                            image={el.image}
                        />
                    ))}
                </div>
            </div>
            <AllProduct heading={"More Products"} />


        </div>
    )
}

export default Home;    