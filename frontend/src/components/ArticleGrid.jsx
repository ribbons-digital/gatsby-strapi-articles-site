import React from "react"
import { FilterContext } from "../context/filterContext"
import { useArticles } from "../hooks/useArticles"
import Article from "./ArticleCard"

export default function ArticleGrid() {
  const { filters } = React.useContext(FilterContext)

  const { data } = useArticles(filters)
  return (
    <div className="card m-4">
      {data
        ? data.map(article => {
            return <Article key={article.id} article={article} />
          })
        : null}
    </div>
  )
}
