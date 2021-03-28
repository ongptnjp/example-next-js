import styles from "./style/Profile.module.scss";

import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

const Profile = props => {
  const { company, prevPrice, keyStat } = props;

  const tableRowSet = (title, numberValue, className = "") => (
    <tr>
      <td className={styles["company_stat-left"]}>{title}</td>
      <td className={styles["company_stat-right"]}>
        <NumberFormat 
          displayType={"text"}
          value={numberValue}
          decimalScale={2}
          thousandSeparator={true}
          className={className} />
      </td>
    </tr>
  );

  return (
    <div className={styles.company}>
      <h2 className={styles.company_title}>
        <span className={styles.company_symbol}>{company.symbol}</span>
        <span className={styles.company_name}>{company.companyName}</span>
      </h2>
      <div className={styles["company_price-common-little"]}>
        <p className={styles["company_price-date"]}>{`Data as of ${new Date(prevPrice.date).toDateString()}`}</p>
        <p className={styles["company_price-resource"]}>{company.exchange}</p>
      </div>

      <div className={styles["company_price-common-big2"]}>
        <NumberFormat
          displayType={"text"}
          value={prevPrice.close} 
          decimalScale={2}
          thousandSeparator={true}
          prefix={"$"} 
          className={styles["company_price-close"]}/>
        <NumberFormat 
          displayType={"text"}
          value={prevPrice.change}
          decimalScale={2}
          className={styles["company_price-change"]} />

        <NumberFormat 
          displayType={"text"}
          value={prevPrice.changePercent}
          suffix={"%"}
          className={styles["company_price-percent"]} />
      </div>
      <div className={styles["company_stat"]}>
        <table className={styles["company_stat-table"]}>
          <tbody>
            <tr>
              <td className={styles["company_stat-left"]}>
                Key Stats
              </td>
            </tr>
          </tbody>
          <tbody>
            {tableRowSet("Volume", prevPrice.volume)}
            {tableRowSet("Open", prevPrice.open)}
            {tableRowSet("Market Cap", keyStat.marketcap)}
          </tbody>
        </table>
        <table className={styles["company_stat-table"]}>
          <tbody>
            <tr>
              <td className={styles["company_stat-left"]}>
                Key Stats
              </td>
            </tr>
          </tbody>
          <tbody>
            {tableRowSet("EPS", keyStat.ttmEPS)}
            {tableRowSet("Beta", keyStat.beta)}
            {tableRowSet("PE Ratio", keyStat.peRatio)}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

Profile.propTypes = {
  company: PropTypes.object,
  prevPrice: PropTypes.object,
  keyStat: PropTypes.object,
};

export default Profile;