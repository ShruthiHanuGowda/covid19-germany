import React from "react"
import { Card, CardContent, Typography, Grid } from "@material-ui/core"
import Countup from "react-countup"
import cx from "classnames"
import styles from "./Cards.module.css"
import CovidData from "../../models/CovidData"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Cards = ({ confirmed, deaths, recovered }: CovidData) => {
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justifyContent="center">
        <Grid
          item
          component={Card}
          xs={10}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              <Countup start={0} end={confirmed} duration={2.5} separator="," />
            </Typography>
            <Typography variant="body2">Number of Active cases</Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={10}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              <Countup start={0} end={recovered} duration={2.5} separator="," />
            </Typography>
            <Typography variant="body2">Number of recoveries</Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={10}
          md={3}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <Countup start={0} end={deaths} duration={2.5} separator="," />
            </Typography>
            <Typography variant="body2">Number of total Death</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  )
}

export default Cards
