import React from 'react';
import logo from '../epics/elogo.jpg';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import toast from 'react-hot-toast';


const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const userData = useSelector((state) => state.user)
    console.log(userData.email)
    const dispatch = useDispatch()

    const handleShowMenu = () => {
        setShowMenu(preve => !preve)
    }

    const handleLogOut = () => {
        dispatch(logoutRedux())
        toast("Logged Out Successfully")
    }

    const cartItemNumber = useSelector((state) => state.product.cartItem)

    return (
        <header className='fixed shadow-md w-full h-28 p-2 md:px-4 z-50  bg-rose-100'>

            {/*desktop*/}
            <div className='flex item-center h-full justify-between'>
                <Link to={""}>
                    <div className='h-24'>
                        <img src={logo} className='h-full rounded-lg' alt='' />
                    </div>
                </Link>

                <div className='flex items-center gap-4 md:gap-7'>
                    <nav className='gap-4 md:gap-6 text-base font-semibold md:text-lg hidden md:flex'>
                        <Link to={""}>Home</Link>
                        <Link to={"menu"}>Menu</Link>
                        <Link to={"about"}>About</Link>
                        <Link to={"contact"}>Contact</Link>
                    </nav>
                    <div className='text-3xl text-yellow-400 relative cursor-pointer'>
                        <Link to={"cart"}><FaShoppingCart />
                            <div className='absolute -top-3 -right-1 text-white font-semibold bg-teal-700 h-4 w-4 rounded-full text-xs text-center'>{cartItemNumber.length}</div>
                        </Link>
                    </div>
                    <div className='' onClick={handleShowMenu}>
                        <div className='text-3xl text-yellow-400 pr- w-9 h-9 rounded-full overflow-hidden cursor-pointer' >
                            {userData.image ? <img src={userData.image} className='h-full w-full' /> : <FaUser />}
                        </div>


                        {
                            showMenu && (
                                <div className='absolute flex flex-col right-4 top-20 bg-teal-700 text-white font-semibold rounded py-2 px-4 shadow drop-shadow-lg min-w-[120px] text-center'>
                                    {
                                        userData.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to={"adminpanel"} className='whitespace-nowrap hover:text-cyan-200 cursor-pointer text-lg'>Admin Panel</Link>
                                    }

                                    {
                                        userData.image ? <p className='cursor-pointer hover:text-cyan-200 px-2 py-1 text-lg' onClick={handleLogOut}>Logout ({userData.fullName})</p> : <Link to={"login"} className='whitespace-nowrap text-lg md:text-lg hover:text-cyan-200 cursor-pointer px-2 py-1'>Login</Link>
                                    }

                                    <nav className='text-base font-semibold md:text-lg flex flex-col md:hidden'>
                                        <Link to={""} className='px-2 py-1 hover:text-cyan-200'>Home</Link>
                                        <Link to={"menu"} className='px-2 py-1 hover:text-cyan-200'>Menu</Link>
                                        <Link to={"about"} className='px-2 py-1 hover:text-cyan-200'>About</Link>
                                        <Link to={"contact"} className='px-2 py-1 hover:text-cyan-200'>Contact</Link>
                                    </nav>

                                </div>
                            )}

                    </div>

                </div>
            </div>


            {/*mobile */}
        </header>
    )
}

export default Header