import React, { useState } from 'react';
import userImage from "../epics/user.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../redux/userSlice'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate()

    const userData = useSelector(state => state)
    console.log(userData.user)

    const dispatch = useDispatch()

    console.log(data)
    const handleShowPassword = () => {
        setShowPassword(preve => !preve)
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = data
        if (email && password) {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const dataRes = await fetchData.json()
            console.log(dataRes)
            console.log(userData)
            toast(userData.user.fullName + dataRes.messege)

            if (dataRes.alert) {
                dispatch(loginRedux(dataRes))
                setTimeout(() => {
                    navigate("/")
                }, 1000);
            }
        }
        else {
            alert("Please Enter Required Details")
        }


    }

    return (
        <div className='p-5 md:p-4'>
            <div className='w-full max-w-sm bg-teal-700 p-3 border-4 border-cyan-300/100 rounded-md m-auto flex items-center flex-col'>
                {/* <h1 className='text-center text-2xl font-bold'>Sign Up</h1> */}
                <div className='w-24 '>
                    <img src={userImage} className='w-full p-2 overflow-hidden rounded-xl' />
                </div>

                <form className='w-full py-2 px-2 flex flex-col' onSubmit={handleSubmit}>
                    <label htmlFor='email' className='text-rose-300 font-semibold'>Email</label>
                    <input type={"email"} id="email" name='email' className='w-full mb-3 bg-white rounded-sm px-2 py-1 focus-within:outline-rose-300' value={data.email} onChange={handleOnChange} />

                    <label htmlFor='password' className='text-rose-300 font-semibold'>Password</label>
                    <div className='flex  px-2 py-1 bg-white rounded-sm mb-3 outline-none focus-within:outline-rose-300'>
                        <input type={showPassword ? "text" : "password"} id="password" name='password' className='w-full border-none outline-none' value={data.password} onChange={handleOnChange} />
                        <span className='flex text-xl' onClick={handleShowPassword}>{showPassword ? <BiShow /> : <BiHide />}</span>
                    </div>
                    <button className='w-4/6 h-9 max-w[150px] my-4 bg-yellow-300 text-teal-700 place-self-center text-lg font-bold rounded-md hover:bg-cyan-300 hover:text-white'>Login</button>
                </form>

                <p className='text-cyan-300 text-sm'>New to MyApp?<Link to={"/signup"} className='text-yellow-300 underline'> Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login