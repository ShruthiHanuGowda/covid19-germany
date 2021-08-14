// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-extraneous-dependencies */
import React from "react"
import { Line } from "react-chartjs-2"
import styles from "./Chart.module.css"
import SummaryData from "../../models/SummaryData"

const LineChart = ( { summary } : SummaryData ) => {
  const lineChart = summary.length > 0 ? (
    <Line
      data={{
        labels: summary.map(({ date }) =>
          new Date(date).toLocaleDateString()
        ),
        datasets: [
          {
            data: summary.map((data) => Number(data.data.confirmed)),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: summary.map((data) => data.data.recovered),
            label: "Recovered",
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            fill: true,
          },
          {
            data: summary.map((data) => data.data.deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null

  return <div className={styles.containerLine}>{lineChart}</div>
}

export default LineChart
