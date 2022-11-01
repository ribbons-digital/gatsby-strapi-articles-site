import React from "react"

export const FilterContext = React.createContext(null)

export default function FilterContextProvider({ children }) {
  const [filters, setFilters] = React.useState({
    selectedLangs: [],
    selectedEnv: "",
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
