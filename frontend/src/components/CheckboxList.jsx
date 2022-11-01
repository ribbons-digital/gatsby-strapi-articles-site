import React from "react"
import { languages } from "../utils"
import Checkbox from "./Checkbox"

export default function CheckboxList() {
  return (
    <div className="flex items-center m-4">
      {languages.map((language, index) => {
        return (
          <Checkbox key={index} language={language} value={languages[index]} />
        )
      })}
    </div>
  )
}
