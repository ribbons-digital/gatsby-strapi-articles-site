import React from "react"
import { FilterContext } from "../context/filterContext"

export default function Article({ article }) {
  const { onSelectEnv } = React.useContext(FilterContext)

  // fields coming from the "Article" type from strapi
  const { title, description, environment } = article.attributes
  return (
    <div className="article">
      <div>{title}</div>
      <p>{description}</p>
      <input
        type="button"
        value={environment}
        onClick={onSelectEnv}
        className="rounded bg-blue-600 px-2 text-white"
      />
    </div>
  )
}
