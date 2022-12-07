/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// exports.onRenderBody = ({ setHtmlAttributes }) => {
//   setHtmlAttributes({ lang: `en` })
// }

import React from "react"
import RootElement from "./src/components/root-element"
import "./src/styles/global.css"

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script
      src="https://accounts.google.com/gsi/client"
      id="google-oauth"
      async
      defer
    ></script>,
  ])
}

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>
}
