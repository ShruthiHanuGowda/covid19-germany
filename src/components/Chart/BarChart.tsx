// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-extraneous-dependencies */
import React from "react"
import { Bar} from "react-chartjs-2"
import "chartjs-plugin-datalabels";
import styles from "./Chart.module.css"
import DailyCovidData from "../../models/DailyCovidData"

const BarChart = ({confirmed , deaths, recovered} :DailyCovidData ) => {
  const barChart = (
    <Bar
      data={{
        labels:[""],
        datasets: [
          {
            data: [confirmed],
            label: "Infected",
            backgroundColor: "rgba(0, 0, 255, 0.5)",
          },
          {
            data: [recovered],
            label: "Recovered",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
          },
          {
            data: [deaths],
            label: "Deaths",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
          },
        ],
      }}
    />
  )

  return <div className={styles.containerBar}>{barChart}</div>
}

export default BarChart
