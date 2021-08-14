import axios from "axios"
import DailySummaryData from "../models/DailySummaryData"

const url = "https://covid19.mathdro.id/api"

export const fetchDailyData = async (date: string, region: string) => {
  try {
    const { data } = await axios.get(`${url}/daily/${date}`)

    if (region === "Germany") {
      return new Promise<any>(resolve => {
        const stats = { confirmed: 0, recovered: 0, deaths: 0, active: 0 }
        data.forEach((dailyData: any) => {
          if ((dailyData.countryRegion === region)) {
            stats.confirmed += Number(dailyData.confirmed)
            stats.deaths += Number(dailyData.deaths)
            stats.recovered += Number(dailyData.recovered)
          }
        })
        resolve({ data: { ...stats, available: true }, date })
      })
    }

    return new Promise(resolve => {
      const dt = data.filter((dailyData: any) => (dailyData.provinceState === region))[0]
      resolve({ data: { ...dt, available: true }, date })
    })

  } catch (error) {
    return { data: { confirmed: 0, recovered: 0, deaths: 0, active: 0, available: false }, date }
  }
}

function getFormattedDate(date: Date) {
  const year = date.getFullYear()

  let month = (1 + date.getMonth()).toString()
  month = month.length > 1 ? month : `${month}`

  let day = date.getDate().toString()
  day = day.length > 1 ? day : `0${day}`

  return `${month}-${day}-${year}`
}

const getDate = (days: number) => {
  const today = new Date()
  return getFormattedDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - days))
}

export const fetchWeeklyData = async (weeks: number, region: string) => {
  const pastDate = getDate(7 * weeks)
  let todayDataResponse: DailySummaryData

  todayDataResponse = await fetchDailyData(getDate(1), region)
  if (!todayDataResponse || !todayDataResponse.data.available) {
    todayDataResponse = await fetchDailyData(getDate(2), region)
  }

  const lastWeekDataResponse = await fetchDailyData(pastDate, region)

  const lastWeekData = lastWeekDataResponse.data
  const todayData = todayDataResponse.data

  const confirmed: number = todayData.confirmed - lastWeekData.confirmed
  const deaths: number = todayData.deaths - lastWeekData.deaths
  let recovered: number = todayData.recovered - lastWeekData.recovered

  if (recovered < 0) {
    recovered = 0
  }

  return { confirmed, deaths, recovered }

}

export const fetchAllWeekData = (weeks: number, region: string) => {
  const promises = []
  for (let i = 0; i < weeks * 7; i += 1) {
    promises.push(fetchDailyData(getDate(i + 1), region))
  }
  return Promise.all(promises)
}

export const fetchCountries = async () => {

  try {
    const { data } = await axios.get(`${url}/countries/germany/confirmed`)
    return data.map((state: any) => state.provinceState)
  } catch (error) {
    return error
  }
}
