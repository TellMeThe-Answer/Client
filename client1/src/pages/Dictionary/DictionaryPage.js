
import { Link, useNavigate } from 'react-router-dom';
//import { FaArrowLeft } from 'react-icons/fa';
import MoveBackComponent from '../../components/common/MoveBackComponent';
import '../../components/CropList/cropList.css'
import React, { useState } from 'react';

const DictionaryPage = () => {
  const crops = ['딸기', '오이', '고추','토마토','가지','고구마','감자','당근','무','옥수수','더덕','마늘','배추','브로콜리','양파','참외','호박','수박'];
  const cropImages = {
    '딸기': 'https://health.chosun.com/site/data/img_dir/2023/02/24/2023022401938_0.jpg',
    '오이': 'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/2xMI/image/X_koLjsgtzFqasz3MdLvV_RDeSY.jpg',
    '고추': 'http://www.marcheat.net/wp-content/uploads/2017/09/pepper.jpg',
    '토마토':'http://www.foodnmed.com/news/photo/201906/18564_4259_4656.jpg',
    '가지' :'http://newsimg.hankookilbo.com/2019/05/16/201905161669798531_15.jpg',
    '고구마': 'http://res.heraldm.com/phpwas/restmb_idxmake.php?idx=507&simg=/content/image/2019/02/12/20190212000467_0.jpg',
    '감자': 'https://health.chosun.com/site/data/img_dir/2020/05/07/2020050702573_0.jpg',
    '당근': 'https://cdn.kormedi.com/wp-content/uploads/2021/10/gettyimages-1347690485.jpg',
    '무':'https://i.namu.wiki/i/qIFB06a-TMKrr39xygAiyGrNmLpX61-_zGh59R2w8SzlCqTc7ehwmgS7cBW51-kTRZjZsdW6ppSZjzo1efpL_7D65FO-QOWqRZIiXNg8nY_ix5g21Da24nbrazIf8SK-d_kobY2f7kEsH-JJLRKNRw.webp',
    '옥수수':'https://cdn.mkhealth.co.kr/news/photo/202206/58096_61221_124.jpg',
    '더덕':'http://www.lampcook.com/wi_files/food_material/119.jpg',
    '마늘':'https://cdn.kormedi.com/wp-content/uploads/2019/05/shutterstock_1183818304-580x3831-580x3832.jpg',
    '배추':'https://src.hidoc.co.kr/content_images/well_e191_20150109.jpg',
    '브로콜리':'https://i.namu.wiki/i/klhh4KcuplQpjFy47wPvK1jQVYKqhDL_fFNAkHvNxlcrLRjDVTHnybwQdBoo60XFMi6TecyB9x5OFzgj4p8Es9jZMDGR_co90_7XCuAoL8GG3RUcvyZ4aatCEv5I0dPAXCialAou6rq_EFtLEDpehg.webp',
    '수박':'https://wimg.mk.co.kr/meet/neds/2019/04/image_readtop_2019_261053_15561697653725187.jpg',
    '양파':'https://cdn.kormedi.com/wp-content/uploads/2022/07/gettyimages-1312497207.jpg',
    '참외':'https://www.sj.go.kr/sj-atc/images/content/02_img01.jpg',
    '호박':'https://static.megamart.com/product/image/0700/07001857/07001857_1_960.jpg'
  };

  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const handleSearchChange = (e) => setSearchKeyword(e.target.value);
  const filteredCrops = crops.filter(crop => crop.includes(searchKeyword));

  return (
    <div>
      <button onClick={goBack} className="goBackButton">
        <MoveBackComponent />
      </button>
      <div className="search-container">
        <input
          type="text"
          placeholder="작물 검색"
          value={searchKeyword}
          onChange={handleSearchChange}
        />
      </div>
      <div className="crop-list-container">
        {filteredCrops.map(crop => (
          <Link key={crop} to={`/croplist/${crop}`} className="crop-item-link">
            <div className="crop-item">
              <img src={cropImages[crop]} alt={crop} />
              <p>{crop}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DictionaryPage;