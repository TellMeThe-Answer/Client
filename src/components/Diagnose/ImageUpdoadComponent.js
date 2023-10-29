import React, {useState, useEffect} from 'react';

const ImageUpdoadComponent = () =>{
    const [check, setCheck] = useState(false);
    const [preview, serPreview] = useState();

    const setPreviewImg = (event) => {

        var reader = new FileReader();
        setCheck(true);
        console.log(check);
        reader.onload = function(event) {
            serPreview(event.target.result);
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    useEffect(()=>{
        setCheck(false);
    }, [])
    return(
        <>
            <div class="flex items-center justify-center w-full h-full">
            {check === true ? 
            <label className = "w-full h-full">
            <img src = {preview} className = "w-full h-full"/>
            <input id="dropzone-file" type="file" class="hidden" onChange={setPreviewImg}/>
            </label>
             : 
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500">SVG, PNG, JPG (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" onChange={setPreviewImg}/>
                    </label>
            }
            </div> 

        </>
    )
}
export default ImageUpdoadComponent;