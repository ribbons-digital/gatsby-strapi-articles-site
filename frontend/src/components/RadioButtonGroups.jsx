import React from "react"
import Checkbox from "./Checkbox"

import { useRadioButtonOptions } from "../hooks/use-radionbutton-options"
export default function RadioButtonGroups({ filters, setFilters, isMobile }) {
  console.log({ filters })
  const { radioButtons, toggleAllAccordions, toggleAnAccordion } =
    useRadioButtonOptions()
  return radioButtons.map((radioButton, index) => {
    return (
      <div
        key={index}
        className={`flex item-center m-4 ${
          radioButton.isAccordionExpanded ? "pb-8" : null
        }`}
      >
        {radioButton.options.map((option, idx) => {
          return (
            <Checkbox
              key={idx}
              isMobile={isMobile}
              filters={filters}
              setFilters={setFilters}
              selectedOption={`selected${radioButton.name}`}
              value={option}
            />
          )
        })}
      </div>
    )
  })
}
