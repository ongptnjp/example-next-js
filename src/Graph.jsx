import styles from "./style/Graph.module.scss";

import React from "react";
import PropTypes from "prop-types";

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const Graph = props => {
  return (
    <div className={styles.graph}>
      <ResponsiveContainer>
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
  historyData: PropTypes.array
};

export default Graph;
