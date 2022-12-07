import React, { useContext, createContext, useMemo, ReactNode } from "react"
import useLoadGsiScript from "../hooks/useLoadGsiScript"

const GoogleOAuthContext = createContext(null)

export default function GoogleOauthProvider({ clientId, children }) {
  const scriptLoadedSuccessfully = useLoadGsiScript()

  const contextValue = useMemo(() => {
    return {
      clientId,
      scriptLoadedSuccessfully,
    }
  }, [scriptLoadedSuccessfully, clientId])

  return (
    <GoogleOAuthContext.Provider value={contextValue}>
      {children}
    </GoogleOAuthContext.Provider>
  )
}

export function useGoogleOauth() {
  const context = useContext(GoogleOAuthContext)
  if (!context) {
    throw new Error(
      "Google OAuth components must be used within GoogleOAuthProvider"
    )
  }
  return context
}
