import React, { useState } from 'react';
import { MdFileUpload } from "react-icons/md"
import { ImagetoBase64 } from '../utility/ImagetoBase64';
import toast from 'react-hot-toast';

const AdminPanel = () => {
    const [data, setData] = useState({
        name: "",
        category: "",
        image: "",
        price: "",
        description: "",
    });


    const HandleOnchange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const uploadImage = async (e) => {
        const data = await ImagetoBase64(e.target.files[0])
        //console.log(data)
        setData((preve) => {
            return {
                ...preve,
                image: data
            }
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);

        const { name, image, category, price } = data;
        if (name && image && category && price) {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const fetchRes = await fetchData.json();
            console.log(fetchRes);
            toast(fetchRes.message);

            setData(() => {
                return {
                    name: "",
                    category: "",
                    image: "",
                    price: "",
                    description: ""
                }
            });

        } else {
            toast("Please Enter Required Fields");
        }
    };



    return (
        <div className='p-2'>
            <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-cyan-100 border-8 border-yellow-200/100 rounded' onSubmit={handleSubmit}>
                <label htmlFor='name' className='text-teal-700 font-semibold text-l'>Product Name</label>
                <input type={"text"} name="name" className='p-1' onChange={HandleOnchange} value={data.name} />

                <label htmlFor='category' className='my-1 text-teal-700 font-semibold text-l'> Category</label>
                <select className='bg-white p-1' name='category' onChange={HandleOnchange} value={data.category}>
                    <option value="">Select Category</option>
                    <option value="makeup">Makeup</option>
                    <option value="skin care">Skin Care</option>
                    <option value="hair care">Hair Care</option>
                    <option value="frangrance">Frangrance</option>
                </select>


                <label htmlFor='image' className='my-1 text-teal-700 font-semibold text-l'>Image
                    <div className='h-28 w-full bg-rose-100 rounded flex items-center justify-center cursor-pointer'>
                        {
                            data.image ? <img src={data.image} className='h-full' /> : <span className='text-3xl '><MdFileUpload /></span>
                        }

                        <input type={'file'} id="image" accept="image/*" onChange={uploadImage} className='hidden'></input>
                    </div>
                </label>


                <label htmlFor='price' className='my-1 text-teal-700 font-semibold text-l'>Price</label>
                <input type={'text'} className='w-full bg-white p-1' name='price' onChange={HandleOnchange} value={data.price} />


                <label htmlFor='description' className='my-1 text-teal-700 font-semibold text-l'>Description</label>
                <textarea rows={3} className='w-full bg-white p-1 resize-none' name='description' onChange={HandleOnchange} value={data.description} />


                <button className='w-4/6 h-10 my-4 bg-teal-700 text-rose-200 place-self-center text-lg font-semibold rounded-md hover:bg-rose-200 hover:text-teal-700 hover:font-bold'>Create</button>
            </form>
        </div>
    )
}

export default AdminPanel