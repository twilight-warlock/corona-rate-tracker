import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api/index";
import { Line, Bar } from "react-chartjs-2";

import styles from "./Chart.module.css";

const Chart = () => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchedDailyData = async () => {
      setDailyData(await fetchDailyData());
    };
    console.log(dailyData);
    fetchedDailyData();
    // eslint-disable-next-line
  }, []);

  const rateGraph = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "rgba(20, 88, 236, 0.877)",
            backgroundColor: "rgba(20, 88, 236, 0.1)",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(238, 31, 17, 0.3)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return <div className={styles.container}>{rateGraph}</div>;
};

export default Chart;
