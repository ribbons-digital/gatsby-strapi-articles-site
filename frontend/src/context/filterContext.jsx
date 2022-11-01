import React from "react"

export const FilterContext = React.createContext({
  selectedLangs: [],
  selectedEnv: "all",
  searchText: "",
})

export default function FilterContextProvider({ children }) {
  const [filters, setFilters] = React.useState({
    selectedLangs: [],
    selectedEnv: "all",
    searchText: "",
  })

  function onSelectEnv(event) {
    setFilters({
      ...filters,
      selectedEnv: event.target.value,
    })
  }

  return (
    <FilterContext.Provider value={{ filters, setFilters, onSelectEnv }}>
      {children}
    </FilterContext.Provider>
  )
}
