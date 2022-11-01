/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

import React from "react"
import RootElement from "./src/components/root-element"
import "./src/styles/global.css"

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>
}

// exports.onRenderBody = ({ setHtmlAttributes }) => {
//   setHtmlAttributes({ lang: `en` })
// }
