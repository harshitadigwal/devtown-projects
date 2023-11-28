import React from 'react';
import { Link } from 'react-router-dom';
import { addItems } from '../redux/productSlice';
import { useDispatch } from 'react-redux';

const CardFeature = ({ image, name, price, category, id }) => {
  const dispatch = useDispatch()
  const handleAddToCart = (e) => {
    dispatch(addItems({
      _id: id,
      name: name,
      price: price,
      category: category,
      image: image,
    }))
  }

  return (
    <div className='w-full h-80 min-w-[200px] max-w-[200px] bg-teal-600 shadow-xl hover:shadow-2xl px-2 py-2 cursor-pointer flex flex-col relative'>
      <>
        <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
          <div className='h-44 flex flex-col'>
            <img src={image} className='h-full' alt={name} />
          </div>
          <h3 className="pt-2 font-semibold text-sm text-amber-300 md:text-sm">{name}</h3>
          <p className="font-semibold text-sm text-white capitalize">{category}</p>
          <p><span className="text-white text-sm font-semibold">{price}</span></p>
        </Link>
        <div className='flex-grow'></div>
        <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 py-1 px-2'>
          <button className='w-32 font-bold py-1 px-2 text-white bg-rose-300 hover:bg-cyan-300 hover:text-teal-700 rounded' onClick={handleAddToCart}>Add To Cart</button>
        </div>
      </>
    </div>
  );
}

export default CardFeature;
















