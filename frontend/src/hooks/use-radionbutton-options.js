import React from "react"
import { radioButtonGroups } from "../utils"

export function useRadioButtonOptions() {
  const [radioButtons, setRadioButtons] = React.useState(radioButtonGroups)

  function toggleAllAccordions() {
    if (radioButtons.some(group => group.isAccordionExpanded === false)) {
      setRadioButtons(
        radioButtons.map(radioButton => {
          return {
            ...radioButton,
            isAccordionExpanded: true,
          }
        })
      )
    } else {
      setRadioButtons(
        radioButtons.map(radioButton => {
          return {
            ...radioButton,
            isAccordionExpanded: !radioButton.isAccordionExpanded,
          }
        })
      )
    }
  }

  function toggleAnAccordion(index) {
    console.log("toggled!")
    setRadioButtons(
      radioButtons.map((radioButton, i) => {
        if (i === index) {
          return {
            ...radioButton,
            isAccordionExpanded: !radioButton.isAccordionExpanded,
          }
        } else {
          return radioButton
        }
      })
    )
  }

  return {
    radioButtons,
    setRadioButtons,
    toggleAllAccordions,
    toggleAnAccordion,
  }
}
