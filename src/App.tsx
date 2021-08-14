// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/state-in-constructor */
import React from "react"
import { Card, FormLabel, Grid } from "@material-ui/core"
import cx from "classnames"

import { Cards, Chart, RegionPicker } from "./components"
import styles from "./App.module.css"
import { fetchAllWeekData, fetchWeeklyData } from "./api"
import WeekPicker from "./components/WeekPicker/WeekPicker"
import LineChart from "./components/Chart/LineChart"

class App extends React.Component {
  state = {
    confirmed: 0,
    recovered: 0,
    deaths: 0,
    region: "Germany",
    weeks: 1,
    dailyData: [],
    isError: false,
  }

  async componentDidMount() {
    try {
      const { region, weeks } = this.state
      const fetchedData: {
        confirmed: number
        recovered: number
        deaths: number
      } = await fetchWeeklyData(weeks, region)
      const dailyData = await fetchAllWeekData(weeks, region)
      this.setState({
        confirmed: fetchedData.confirmed,
        recovered: fetchedData.recovered,
        deaths: fetchedData.deaths,
        dailyData,
      })
    } catch (e) {
      this.setState({ isError: true })
    }
  }

  handleCountryChange = async (region: string) => {
    try {
      const { weeks } = this.state
      const fetchedData: {
        confirmed: number
        recovered: number
        deaths: number
      } = await fetchWeeklyData(weeks, region)
      const dailyData = await fetchAllWeekData(weeks, region)
      this.setState({
        region,
        confirmed: fetchedData.confirmed,
        recovered: fetchedData.recovered,
        deaths: fetchedData.deaths,
        dailyData,
      })
    } catch (e) {
      this.setState({ isError: true })
    }
  }

  handleWeekChange = async (weeks: string) => {
    try {
      const { region } = this.state
      const fetchedData: {
        confirmed: number
        recovered: number
        deaths: number
      } = await fetchWeeklyData(Number(weeks), region)
      const dailyData = await fetchAllWeekData(Number(weeks), region)
      this.setState({
        confirmed: fetchedData.confirmed,
        recovered: fetchedData.recovered,
        deaths: fetchedData.deaths,
        dailyData,
        weeks: Number(weeks),
      })
    } catch (e) {
      this.setState({ isError: true })
    }
  }

  render() {
    const { recovered, confirmed, deaths, dailyData, isError } = this.state
    return (
      <div className={styles.container}>
        <h1>Germany Coronavirus Statistics</h1>
        <Grid container spacing={3} justifyContent="center">
          <Grid item component={Card} xs={10} md={2}>
            <FormLabel>Select Country</FormLabel>
            <br />
            <RegionPicker handleCountryChange={this.handleCountryChange} />
          </Grid>
          <Grid
            item
            component={Card}
            xs={10}
            md={2}
            className={cx(styles.card, styles.infected)}
          >
            <FormLabel>Select Weeks</FormLabel>
            <br />
            <WeekPicker handleChange={this.handleWeekChange} />
          </Grid>
        </Grid>
        <Cards deaths={deaths} recovered={recovered} confirmed={confirmed} />

        {!isError && (
          <Grid container spacing={3} justifyContent="center">
            <Grid item component={Card} xs={10} md={4}>
              <FormLabel className={cx(styles.center)}>
                Week/Weeks Summary
              </FormLabel>
              <Chart
                confirmed={confirmed}
                deaths={deaths}
                recovered={recovered}
              />
            </Grid>
            <Grid item component={Card} xs={10} md={4} justifyContent="center">
              <FormLabel className={cx(styles.center)}>
                All time summary within the period
              </FormLabel>
              <LineChart summary={dailyData} />
            </Grid>
          </Grid>
        )}
      </div>
    )
  }
}

export default App
