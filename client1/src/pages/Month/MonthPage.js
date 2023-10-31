import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MoveBackComponent from '../../components/common/MoveBackComponent';


const MonthPage = () => {
  /*
  const scrapeData = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://ncpms.rda.go.kr/npms/NewIndcUserListR.np')
    
    const links = await page.$$eval('td.ce > a',anchors => anchors.map(anchor => anchor.href));
    
    console.log(links);
    await browser.close();

    useEffect(() => {
      // Call the scraping function when the component mounts
      scrapeData();
    }, []);
  
  }
  */
  return(
    <div>
      <MoveBackComponent />
      <h2>이달의 병해예보</h2>
    </div>
  )
}

export default MonthPage;