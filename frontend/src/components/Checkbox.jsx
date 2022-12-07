import React from "react"

export default function Checkbox({
  filters,
  setFilters,
  selectedOption,
  value,
  isMobile,
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
      <label
        htmlFor={
          isMobile
            ? `${selectedOption}-${value}-mobile`
            : `${selectedOption}-${value}`
        }
      >
        <input
          type="radio"
          id={
            isMobile
              ? `${selectedOption}-${value}-mobile`
              : `${selectedOption}-${value}`
          }
          name={
            isMobile
              ? `${selectedOption}-{value}-mobile`
              : `${selectedOption}-${value}`
          }
          value={value}
          onChange={onSelecetedOption}
          checked={filters[selectedOption] === value}
        />

        {value}
      </label>
    </div>
  )
}
