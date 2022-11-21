import React from "react"

export default function Checkbox({
  filters,
  setFilters,
  selectedOption,
  value,
}) {
  // function to call when checkboxes are ticked/unticked
  function onSelecetedOption(event) {
    setFilters({
      ...filters,
      [`${selectedOption}`]: event.target.value,
    })
  }
  return (
    <div className="mr-3 space-x-1">
      <input
        type="radio"
        id={selectedOption}
        name={selectedOption}
        value={value}
        onChange={onSelecetedOption}
        checked={filters[selectedOption] === value}
      />
      <label htmlFor={value}>{value}</label>
    </div>
  )
}
