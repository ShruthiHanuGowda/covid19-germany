import React, { useState, useEffect } from "react"
import { NativeSelect, FormControl } from "@material-ui/core"
import styles from "./RegionPicker.module.css"
import { fetchCountries } from "../../api"

const RegionPicker = ({ handleCountryChange } : any) => {
  const [fetchedCountries, setFetchedCountries] = useState([])

  const fetchAPI = async () => {
    const countries = await fetchCountries()
    setFetchedCountries(countries)
  }

  useEffect(() => {
    fetchAPI()
  }, [setFetchedCountries])

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="Germany">Germany</option>
        {fetchedCountries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  )
}

export default RegionPicker
