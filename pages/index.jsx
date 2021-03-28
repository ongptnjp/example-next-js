import styles from "../styles/StockPage.module.scss";

import React, { useState } from "react";
import axios from "axios";

import Profile from "../src/Profile";
import Graph from "../src/Graph";
import News from "../src/News";

import { STOCK_LIST } from "../src/constant";

const StockPage = () => {
  const [stock, setStock] = useState();
  const [keyStat, setKeyStat] = useState();
  const [company, setCompany] = useState();
  const [news, setNews] = useState(null);

  const [prevPrice, setPrevPrice] = useState();
  const [historyData, setHistoryData] = useState();
  const [isFound, setIsFound] = useState(true);

  const onClickSearch = async (symbol) => {
    setIsFound(true);
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
      }
    } catch (err) {
      setIsFound(false);
    }
  };

  return (
    <div className={styles.homePage}>
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

      {!isFound && <h2>{STOCK_LIST.find((data) => data.symbol === stock).name} is not found !! please try agian.</h2>}
      {keyStat && company && prevPrice && (
        <Profile
          company={company}
          prevPrice={prevPrice}
          keyStat={keyStat}
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
