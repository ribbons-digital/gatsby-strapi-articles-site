import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import GoogleOAuthProvider from "../context/GoogleOAuthContext"
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const RootElement = ({ children }) => {
  // function handleCallbackResponse(response) {}
  //
  // React.useEffect(() => {
  //   window.google?.accounts.id.initialize({
  //     client_id: GOOGLE_CLIENT_ID,
  //     callback: handleCallbackResponse,
  //   })
  //
  //   window.google?.accounts.id.renderButton(
  //     document.getElementById("signin-button"),
  //     {
  //       theme: "outline",
  //       size: "large",
  //     }
  //   )
  // }, [])

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default RootElement
