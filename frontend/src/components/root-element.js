import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import FilterContextProvider from "../context/filterContext"

const queryClient = new QueryClient()

const RootElement = ({ children }) => {
  return (
    <FilterContextProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </FilterContextProvider>
  )
}

export default RootElement
