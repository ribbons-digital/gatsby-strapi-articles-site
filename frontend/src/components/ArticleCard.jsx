import React from "react"

export default function Article({ article, onSelectEnv }) {
  // fields coming from the "Article" type from strapi
  const { title, description, environment } = article.attributes
  return (
    <div className="article">
      <div>{title}</div>
      <p>{description}</p>
      <input type="button" value={environment} onClick={onSelectEnv} />
    </div>
  )
}
