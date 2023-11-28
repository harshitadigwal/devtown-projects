import React, { useState } from 'react';
import loginSignupImage from "../epics/login.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { ImagetoBase64 } from '../utility/ImagetoBase64';
import { toast } from 'react-hot-toast';


function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: "",
    });
    console.log(data)

    const handleShowPassword = () => {
        setShowPassword((preve) => !preve)
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword((preve) => !preve)
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleProfilePicture = async (e) => {
        const data = await ImagetoBase64(e.target.files[0])
        console.log(data)
        setData((preve) => {
            return {
                ...preve,
                image: data
            }
        })
    }


    console.log(process.env.REACT_APP_SERVER_DOMIN)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, email, password, confirmPassword } = data
        if (fullName && email && password && confirmPassword) {
            if (password === confirmPassword) {
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                const dataRes = await fetchData.json()
                console.log(dataRes)

                //alert(dataRes.messege)
                toast(dataRes.message)
                if (dataRes.alert) {
                    navigate("/login");
                }

            } else {
                alert("Wrong Password. Try Again!")
            }
        }
        else {
            alert("Please Enter The Required Details.")
        }
    }

    return (
        <div className='p-5 md:p-4'>
            <div className='w-full max-w-sm bg-teal-700 p-3 border-4 border-cyan-300/100 rounded-md m-auto flex items-center flex-col'>
                {/* <h1 className='text-center text-2xl font-bold'>Sign Up</h1> */}
                <div className='w-24'>
                    <img src={data.image ? data.image : loginSignupImage} className='w-full p-2 overflow-hidden rounded-xl' />

                    <label htmlFor='profilePicture'>
                        <div className='h-1/3 bg-rose-100 w-full text-center rounded-2xl cursor-pointer'>
                            <p className='text-sm p-1 text-teal-700 font-semibold'>Set Profile</p>
                        </div>
                        <input type={"file"} id='profilePicture' accept='image/' className='hidden' onChange={handleProfilePicture} />
                    </label>
                </div>

                <form className='w-full py-2 px-2 flex flex-col' onSubmit={handleSubmit}>
                    <label htmlFor='fullName' className='text-rose-300 font-semibold'>Full Name</label>
                    <input type={"text"} id="fullName" name='fullName' className='w-full mb-2 bg-white rounded-sm px-2 py-1 focus-within:outline-rose-300' value={data.fullName} onChange={handleOnChange} />

                    <label htmlFor='email' className='text-rose-300 font-semibold'>Email</label>
                    <input type={"email"} id="email" name='email' className='w-full mb-2 bg-white rounded-sm px-2 py-1 focus-within:outline-rose-300' value={data.email} onChange={handleOnChange} />

                    <label htmlFor='password' className='text-rose-300 font-semibold'>Password</label>
                    <div className='flex  px-2 py-1 bg-white rounded-sm mb-2 outline-none  focus-within:outline-rose-300'>
                        <input type={showPassword ? "text" : "password"} id="password" name='password' className='w-full border-none outline-none' value={data.password} onChange={handleOnChange} />
                        <span className='flex text-xl' onClick={handleShowPassword}>{showPassword ? <BiShow /> : <BiHide />}</span>
                    </div>

                    <label htmlFor='confirmPassword' className='text-rose-300 font-semibold'>Confirm Password</label>
                    <div className='flex px-2 py-1 bg-white rounded-sm mb-2 outline-none focus-within:outline-rose-300'>
                        <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name='confirmPassword' className='w-full border-none outline-none' value={data.confirmPassword} onChange={handleOnChange} />
                        <span className='flex text-xl' onClick={handleShowConfirmPassword}>{showConfirmPassword ? <BiShow /> : <BiHide />}</span>
                    </div>

                    <button className='w-4/6 h-9 max-w[150px] my-4 bg-yellow-300 text-teal-700 place-self-center text-lg font-bold rounded-md hover:bg-cyan-300 hover:text-white'>Sign Up</button>
                </form>

                <p className='text-cyan-300 text-sm'>Already Have An Account? <Link to={"/login"} className='text-yellow-300 underline'>Login</Link></p>
            </div>
        </div>
    )
}

export default Signup