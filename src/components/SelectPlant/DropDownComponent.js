import React, { useState, useEffect} from "react";
import {plantState, plantImage, plantDescription} from "../../config/atom";
import {useRecoilState} from "recoil";
import plantData from "../../config/plantInformation.json"
import { Dropdown, initTE } from "tw-elements";
initTE({ Dropdown });
// Initialization for ES Users
const DropDownComponent = () =>{

    const [plant, setPlant] = useRecoilState(plantState);
    const [image, setImage] = useRecoilState(plantImage);
    const [description, setDescription] = useRecoilState(plantDescription);
    
    const selectOption = (option) => {
        setPlant(option);
        plantData.map((elem, index)=>{
            if(elem.plantName === option){
                setImage(elem.plantImage);
                setDescription(elem.disease);
            }
        })
      };

    const options = ['토마토', '딸기', '오이', '고추'];
    
    return (
        <div class="relative" data-te-dropdown-ref>
            <button
            class="w-full flex items-center whitespace-nowrap rounded-2xl  bg-gray-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-gray-200 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-gray-200 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-gray-200 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            type="button"
            id="dropdownMenuButton1"
            data-te-dropdown-toggle-ref
            aria-expanded="false"
            data-te-ripple-init
            data-te-ripple-color="light">
            {plant}
            <span class="ml-2 w-2">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5">
                <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd" />
                </svg>
            </span>
            </button>

            <ul
                class="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                aria-labelledby="dropdownMenuButton1"
                data-te-dropdown-menu-ref>

                {options.map((option, index) => (
                    <li
                    key={index}
                    onClick={() => selectOption(option)}
                    className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400"
                    >
                    {option}
                    </li>
                ))}

            </ul>
        </div>
    )
}
export default DropDownComponent
