import React from "react"
import jwt_decode from "jwt-decode"
import { useGoogleOauth } from "../context/GoogleOAuthContext"
const GOOGLE_CLIENT_ID =
  "986056637442-j8mq8su17adre0pkjhso6njmo60rqm8j.apps.googleusercontent.com"
export default function GoogleLoginButton({ user, setUser }) {
  const authBtn = React.useRef(null)

  function handleCallbackResponse(response) {
    const userObj = jwt_decode(response.credential)
    if (userObj.name) {
      setUser(userObj.name)
    }
  }

  React.useEffect(() => {
    console.log("hello")
    window.google?.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    })

    window.google?.accounts.id.renderButton(authBtn.current, {
      theme: "outline",
      size: "large",
    })
  }, [])

  return <div ref={authBtn} id="signin-button"></div>
}
