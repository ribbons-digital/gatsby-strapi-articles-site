import React from "react"

export default function SearchInput({ filters, setFilters }) {
  // input value state
  // const [inputValue, setInputValue] = React.useState("")

  // function to call when typing in the input field
  function onChangeInput(event) {
    console.log(event.target.value)
    // setInputValue(event.target.value)
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
