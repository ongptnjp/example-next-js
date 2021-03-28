import styles from "./style/Graph.module.scss";

import React from "react";
import PropTypes from "prop-types";

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const Graph = props => {
  if (!props.historyData) return null;

  return (
    <div className={styles.graph}>
      <ResponsiveContainer aspect={2} minHeight={10} minWidth={10}>
        <LineChart data={props.historyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="close" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

Graph.propTypes = {
  historyData: PropTypes.arrayOf(PropTypes.shape({
    close: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
  }))
};

export default Graph;
