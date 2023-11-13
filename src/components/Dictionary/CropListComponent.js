
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './dictionary.css'
import MoveBackComponent from '../common/MoveBackComponent';

const CropListComponent = () => {
  const crops = ['딸기', '오이', '고추','토마토','가지','고구마','감자','당근','무','옥수수','더덕','마늘','배추','브로콜리','양파','참외','호박','수박'];
  const cropImages = {
    '딸기': 'https://cdn-icons-png.flaticon.com/128/7441/7441494.png',
    '오이': 'https://cdn-icons-png.flaticon.com/128/2347/2347012.png',
    '고추': 'https://cdn-icons-png.flaticon.com/128/3983/3983540.png',
    '토마토':'https://cdn-icons-png.flaticon.com/128/4264/4264717.png',
    '가지' :'https://cdn-icons-png.flaticon.com/128/352/352623.png',
    '고구마': 'https://cdn-icons-png.flaticon.com/128/6409/6409874.png',
    '감자': 'https://cdn-icons-png.flaticon.com/128/1135/1135467.png',
    '당근': 'https://cdn-icons-png.flaticon.com/128/1041/1041355.png',
    '무':'https://cdn-icons-png.flaticon.com/128/7230/7230994.png',
    '옥수수':'https://cdn-icons-png.flaticon.com/128/1147/1147593.png',
    '더덕':'https://cdn-icons-png.flaticon.com/128/3186/3186346.png',
    '마늘':'https://cdn-icons-png.flaticon.com/128/5346/5346654.png',
    '배추':'https://cdn-icons-png.flaticon.com/128/8903/8903827.png',
    '브로콜리':'https://cdn-icons-png.flaticon.com/128/2347/2347045.png',
    '수박':'https://cdn-icons-png.flaticon.com/128/6866/6866503.png',
    '양파':'https://cdn-icons-png.flaticon.com/128/2522/2522907.png',
    '참외':'https://cdn-icons-png.flaticon.com/128/1515/1515045.png',
    '호박':'https://cdn-icons-png.flaticon.com/128/1038/1038606.png'
  };

  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();
  const handleSearchChange = (e) => setSearchKeyword(e.target.value);
  const filteredCrops = crops.filter(crop => crop.includes(searchKeyword));

  return (
    <div className = "h-full bg-gray-50">
      <div className = "flex w-full justify-center text-lg font-bold pt-10">병해 도감</div>

            <div class=" px-10 bg-gray-50">
                <div class="grid grid-cols-2 gap-4 bg-gray-50">
                    <div class="p-8">
                        {filteredCrops.map((crop, index) => (
                            (index % 2 === 1) && (
                                <Link key={crop} to={`/croplist/${crop}`}>
                                    <div className="flex flex-col items-center mt-5">
                                        <div>{crop}</div>
                                        <img src={cropImages[crop]} alt={crop} />
                                    </div>
                                </Link>
                            )
                            ))}
                    </div>

                    <div class="p-8">
                            {filteredCrops.map((crop, index) => (
                            (index % 2 === 0) && (
                                <Link key={crop} to={`/croplist/${crop}`}>
                                    <div className="flex flex-col items-center mt-5">
                                        <div>{crop}</div>
                                        <img src={cropImages[crop]} alt={crop} />
                                    </div>
                                </Link>
                            )
                            ))}
                    </div>
                </div>
            </div>
      </div>
  );
};

export default CropListComponent;