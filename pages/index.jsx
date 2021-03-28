import styles from "../styles/StockPage.module.scss";

import React, { useState, useEffect } from "react";
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
  const [isFound, setIsFound] = useState(false);
  const [message, setMessage] = useState("");

  const mappingName = symbol => {
    const findName = STOCK_LIST.find(data => data.symbol === symbol);

    if (findName) setMessage(findName.name + " is not found !! Please try agian.");
    return;
  };

  const onClickSearch = async (symbol) => {
    setIsFound(true);
    setStock(symbol);

    try {
      const response = await axios.get("/api/fetch-stat", { params: { symbol } });

      const { success, data } = response.data;

      if (!success) {
        mappingName(symbol);
        return setIsFound(false);
      }

      const { company: rawCompany, stat, prevPrice: rawPrevPrice } = data;

      if (rawCompany && rawPrevPrice && stat) {
        setKeyStat(stat);
        setCompany(rawCompany);
        setPrevPrice(rawPrevPrice);
      }
      return;
    } catch (err) {
      return setIsFound(false);
    }
  };

  const fetchNews = async (symbol) => {
    try {
      const response = await axios.get("/api/fetch-news", { params: { symbol } });

      const { success, data } = response.data;

      if (!success) return setIsFound(false);

      const { news: rawNews } = data;

      if (rawNews) {
        return setNews(rawNews);
      }
    } catch (err) {
      return setIsFound(false);
    }
  };

  const fetchHistory = async (symbol) => {
    try {
      const response = await axios.get("/api/fetch-history", { params: { symbol } });

      const { success, data } = response.data;

      if (!success) return setIsFound(false);

      const { history } = data;

      if (history) {
        return setHistoryData(history);
      }
    } catch (err) {
      return setIsFound(false);
    }
  };


  useEffect(() => {
    fetchNews(stock);
    fetchHistory(stock);
  },[stock]);

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

      {!isFound && message }
      {isFound && keyStat && company && prevPrice && (
        <Profile
          company={company}
          prevPrice={prevPrice}
          keyStat={keyStat}
        />
      )}
      {isFound && historyData && <Graph historyData={historyData} />}

      {isFound && news && (
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
