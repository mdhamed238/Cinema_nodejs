import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCookie } from '../../auth/cookies'
import { ProtectedLink, AuthLink } from '../ProtectedLink/ProtectedLink'
import logout from '../../auth/logout'



export default () => {

    const [state, setState] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const token = getCookie('token')


    const navRef = useRef()
    const navigateTo = useNavigate()

    // Replace javascript:void(0) path with your path
    const navigation = [
        { title: "Top rated", path: "/", current: true },
        { title: "Most watched", path: "#" },
        { title: "Most popular", path: "#" }
    ]


    const handleLogout = () => {
        logout()
        navigateTo('/')
    }

    useEffect(() => {

        const body = document.body

        // Disable scrolling
        const customBodyStyle = ["overflow-hidden", "lg:overflow-visible"]
        if (state) body.classList.add(...customBodyStyle)
        // Enable scrolling
        else body.classList.remove(...customBodyStyle)

        // Sticky strick
        const customStyle = ["sticky-nav", "fixed", "border-b"]
        window.onscroll = () => {
            if (window.scrollY > 80) navRef.current.classList.add(...customStyle)
            else navRef.current.classList.remove(...customStyle)
        }
    }, [state])


    useEffect(() => {
        if (token) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [token])


    return (
        <nav ref={navRef} className="bg-white w-full top-0 z-20">
            <div className="items-center px-4 max-w-screen-xl mx-auto lg:flex lg:px-8">
                <div className="flex items-center justify-between py-3 lg:py-4 lg:block">
                    <a href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" height="50" width="120" viewBox="-153.6 -69.1855 1331.2 415.113">
                            <path fill="#d81f26" d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676L44.051 119.724v151.073C28.647 272.418 14.594 274.58 0 276.742V0h41.08l56.212 157.021V0h43.511zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461V0h119.724v43.241h-76.482zm237.284-58.104h-44.862V242.15c-14.594 0-29.188 0-43.239.539V43.242h-44.862V0H463.22zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433V0h120.808v43.241h-78.375zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676V0h43.24zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242V0h-42.43zM1024 0l-54.863 131.615L1024 276.742c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75L871.576 0h46.482l28.377 72.699L976.705 0z" />
                        </svg>
                    </a>
                    <div className="lg:hidden">
                        <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 justify-between flex-row-reverse lg:overflow-visible lg:flex lg:pb-0 lg:pr-0 lg:h-auto ${state ? 'h-screen pb-20 overflow-auto pr-4' : 'hidden'}`}>
                    <div>
                        <ul className="flex flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row">
                            <li className="mt-8 mb-8 lg:mt-0 lg:mb-0">
                                <a href="#" className="text-gray-600 hover:text-indigo-600 font-semibold">
                                    Contact
                                </a>
                            </li>
                            <AuthLink isLoggedIn={isLoggedIn}>
                                <li className="nav-item mt-4 lg:mt-0">
                                    <Link to="/login">
                                        <a className="py-3 px-4 text-center border text-gray-600 hover:text-indigo-600 rounded-lg block lg:inline lg:border-0">
                                            Login
                                        </a>
                                    </Link>
                                </li>
                            </AuthLink>
                            <AuthLink isLoggedIn={isLoggedIn}>
                                <li className="nav-item mt-8 lg:mt-0">
                                    <Link to="/signup">
                                        <a className="py-3 px-4 text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow block lg:inline">
                                            Sign Up
                                        </a>
                                    </Link>
                                </li>
                            </AuthLink>
                            <ProtectedLink isLoggedIn={isLoggedIn}>
                                <li className="nav-item mt-8 lg:mt-0">
                                    <button className="flex-row-reverse w-full text-gray-700 hover:text-gray-900 font-semibold hover:bg-gray-50 flex items-center justify-between border rounded-md p-2.5 md:border-none md:p-0 md:hover:bg-transparent"
                                        onClick={handleLogout}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                        </svg>
                                        Logout
                                    </button>
                                </li>
                            </ProtectedLink>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <ul className="justify-center items-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
                            {
                                navigation.map((item, idx) => {
                                    return (
                                        <li key={idx} className={`${item.current ? 'text-indigo-600' : 'text-gray-600'} font-semibold hover:text-indigo-600`}>
                                            <a href={item.path}>
                                                {item.title}
                                            </a>
                                        </li>
                                    )
                                })
                            }
                            <ProtectedLink isLoggedIn={isLoggedIn}>
                                <li className="nav-item text-gray-600 hover:text-indigo-600 font-semibold">
                                    <Link to={'/dashboard'}>
                                        <a className="block">
                                            Favorites
                                        </a>
                                    </Link>
                                </li>
                            </ProtectedLink>
                        </ul>
                    </div>
                </div>
            </div>
        </nav >
    )
}
