import React from "react"

export function useFilters() {
  const [filters, setFilters] = React.useState({
    searchText: "",
    selectedIndustry: "all",
    selectedVertical: "all",
    sortBy: "oldest",
  })

  return [filters, setFilters]
}
