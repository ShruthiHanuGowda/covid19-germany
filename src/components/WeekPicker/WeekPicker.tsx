import React, { useState} from "react"
import { NativeSelect, FormControl } from "@material-ui/core"
import styles from "./WeekPicker.module.css"

const WeekPicker = ({ handleChange } : any) => {
  const [numbers] = useState([1, 2, 3, 4])

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleChange(e.target.value)}
      >
        {numbers.map((value, i) => (
          <option key={i} value={value}>
            {value}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  )
}

export default WeekPicker
