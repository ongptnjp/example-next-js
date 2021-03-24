import styles from "../styles/StockPage.module.scss";

import React, { useState, useEffect } from "react";
import axios from "axios";

import Profile from "../src/Profile";
import Graph from "../src/Graph";
import News from "../src/News";
// import Favorite from "./Favorite";

import { LOCAL_FAV, STOCK_LIST } from "../src/constant";

const StockPage = () => {
  const [stock, setStock] = useState();
  const [keyStat, setKeyStat] = useState();
  const [company, setCompany] = useState();
  const [news, setNews] = useState(null);

  const [prevPrice, setPrevPrice] = useState();
  const [historyData, setHistoryData] = useState();
  const [isFound, setIsFound] = useState(true);

  const [favList, setFavList] = useState([]);
  const [isFave, setIsFave] = useState(false);

  const onClickSearch = async (symbol) => {
    setIsFound(true);
    setIsFave(false);
    setStock(symbol);

    try {
      const response = await axios.get("/api/fetchStockData", { params: { symbol } });

      const { success, data } = response.data;

      if (!success) return setIsFound(false);

      const { company: rawCompany, news: rawNews, stat, prevPrice: rawPrevPrice, history } = data;

      if (rawCompany && rawPrevPrice && stat) {
        setKeyStat(stat);
        setCompany(rawCompany);
        setPrevPrice(rawPrevPrice);
        setHistoryData(history);
        setNews(rawNews);
        if (favList) {
          favList.map((data) => (data === symbol ? setIsFave(true) : ""));
        }
      }
    } catch (err) {
      setIsFound(false);
    }
  };

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem(LOCAL_FAV));

    if (local !== undefined) {
      setFavList(local);
    }
  }, []);

  const onClickFav = (symbol) => {
    let favTemp = [];
    let isFav = false;
    let indexFav = 0;
    if (favList) {
      favTemp = [...favList];
      favList.map((fav, index) => {
        if (symbol === fav) {
          indexFav = index;
          isFav = true;
        }
      });
    }

    if (!isFav) {
      favTemp.push(symbol);
    } else {
      favTemp.splice(indexFav, 1);
    }

    setIsFave(!isFave);
    setFavList(favTemp);
    localStorage.setItem(LOCAL_FAV, JSON.stringify(favTemp));
  };

  return (
    <div className={styles.homePage}>
      {/* <Favorite
        faves={favList}
        onClickSearch={onClickSearch}
      /> */}
      <div className={styles.dropdown}>
        <select onChange={(e) => onClickSearch(e.target.value)} className={styles.select}>
          <option defaultValue value="" key="don't">
            Please Select Stock
          </option>
          {STOCK_LIST.map((data, index) => (
            <option value={data.symbol} key={index}>
              {data.name}
            </option>
          ))}
        </select>
      </div>

      {!isFound && <h2>{stock.toUpperCase()} is not found !! please try agian.</h2>}
      {keyStat && company && prevPrice && (
        <Profile
          company={company}
          prevPrice={prevPrice}
          keyStat={keyStat}
          isFave={isFave}
          setIsFave={onClickFav}
        />
      )}
      {historyData && <Graph historyData={historyData} />}

      {news && (
        <div className={styles.news}>
          {news.map((data) => (
            <News key={data.image} news={data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StockPage;
