import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api/index";
import { Line, Bar } from "react-chartjs-2";
import cx from "classnames";

import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
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

  const barGraph = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(20, 88, 236, 0.877)",
              "rgba(23, 231, 16, 0.877)",
              "rgba(238, 31, 17, 0.877)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current Scenario in ${country}` },
      }}
    />
  ) : null;

  return (
    <div className={cx(styles.container, styles.chart)}>
      {country ? barGraph : rateGraph}
    </div>
  );
};

export default Chart;
