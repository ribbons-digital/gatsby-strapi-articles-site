import React from "react"
import { FilterContext } from "../context/filterContext"

export default function SearchInput() {
  const { filters, setFilters } = React.useContext(FilterContext)

  // function to call when typing in the input field
  function onChangeInput(event) {
    console.log(event.target.value)

    setFilters({
      ...filters,
      searchText: event.target.value,
    })
  }

  return (
    <input
      value={filters.searchText}
      onChange={onChangeInput}
      className="border-4 border-blue-400 rounded m-4"
    />
  )
}
