import React, {useState} from "react";
import './footer.css'
import { useNavigate, NavLink } from "react-router-dom";

const NavBar = () => {

    const [check, setCheck] = useState(false);
    const [map, setMap] = useState(false);
    const [inspect, setInsepect] = useState(false);
    const [information, setInformation] = useState(false);
    const [mypage, setMypage] = useState(false);
    
    return(
        <div class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-lime-500">
            <div class="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">

                <button type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
                    <svg className = "w-6 h-6 text-gray-500 group-hover:text-lime-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span class="text-sm text-black mt-1.5 group-hover:text-lime-400">Home</span>
                </button>   

                <NavLink to={"/map"}
                    className = "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
                    style={({ isActive }) => {
                        if (isActive) {
                            setMap(true);
                        } else {
                            setMap(false);
                        }
                      }}
                    >
                        {
                            map === true ? <>
                            <svg className = "w-6 h-6 text-lime-400 group-hover:text-lime-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                            </svg>
                            <span class="text-sm text-lime-400 mt-1.5">Map</span>
                            </>
                            :
                            <>
                            <svg className = "w-6 h-6 text-gray-500 group-hover:text-lime-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                            </svg>
                            <span class="text-sm text-black mt-1.5">Map</span>
                            </>
                        }
                </NavLink>
                

                <NavLink to={"/inspect"}
                    className = "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
                    style={({ isActive }) => {
                        if (isActive) {
                          setCheck(true);
                          setMypage(false);
                        } else {
                          setCheck(false);
                        }
                      }}
                    >
                        {
                            check === true ? <>
                            <svg className = "w-6 h-6 text-gray-500 group-hover:text-lime-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span class="text-sm text-lime-400 mt-1.5">Inspect</span>
                            </>
                            :
                            <>
                            <svg className = "w-6 h-6 text-gray-500 group-hover:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span class="text-sm text-black mt-1.5">Inspect</span>
                            </>
                        }
                </NavLink>


                <NavLink to={"/information"}
                    className = "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
                    style={({ isActive }) => {
                        if (isActive) {
                            setCheck(false);
                            setMypage(false);
                            setInformation(true);
                        } else {
                            setInformation(false);
                        }
                      }}
                    >
                    {
                        information === true ? <>
                        <svg className = "w-6 h-6 text-lime-400 active-link" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                        <span class="text-sm text-lime-400 mt-1.5">Information</span>
                        </>
                        :
                        <>
                        <svg className = "w-6 h-6 text-gray-500 active-link" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                        <span class="text-sm text-black mt-1.5">Information</span>
                        </>
                    }
                </NavLink>

                <NavLink to={"/mypage"}
                    className = "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
                    style={({ isActive }) => {
                        if (isActive) {
                            setCheck(false);
                            setInformation(false);
                            setMypage(true);
                        } else {
                            setMypage(false);
                        }
                      }}
                    >
                        {
                            mypage === true ? <>
                            <svg className = "w-6 h-6 text-lime-400 active-link" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span class="text-sm text-lime-400 mt-1.5">Profile</span>
                            </>
                            :
                            <>
                            <svg className = "w-6 h-6 text-gray-500 active-link" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span class="text-sm text-black mt-1.5">Profile</span>
                            </>
                        }
                </NavLink>
            </div>
        </div>

    )
}
export default NavBar;