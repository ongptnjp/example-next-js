import styles from "./style/News.module.scss";

import React from "react";
import PropTypes from "prop-types";

const News = props => {
  const { news } = props;

  if (!news) return null;

  const extractDateInformation = timestamp => {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    return {
      day: date.getDay(),
      month: date.getMonth(),
      year: date.getFullYear()
    };
  };
  
  const {day, month, year} = extractDateInformation(news.datetime);

  return (
    <div className={styles["card"]}>
      <div className={styles["wrapper"]} style={{ background: `url(${news.image}) center / cover no-repeat`}}>
        <div className={styles["header"]}>
          <div className={styles["date"]}>
            <span className={styles["day"]}>{day}</span>
            <span className={styles["month"]}>{month}</span>
            <span className={styles["year"]}>{year}</span>
          </div>
        </div>
        <div className={styles["data"]}>
          <div className={styles["content"]}>
            <span className={styles["author"]}>{news.source}</span>
            <h2 className={styles["title"]}><a href={news.url}>{news.headline}</a></h2>
            <p className={styles["text"]}>{news.summary}</p>
            <a href={news.url} className={styles["button"]}>Read more</a>
          </div>
        </div>
      </div>
    </div>
  );
};

News.propTypes = {
  news: PropTypes.shape({
    datetime: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
  })
};

News.defaultProps = {
  news: null
};

export default News;
