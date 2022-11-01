import React from "react"
import Article from "./ArticleCard"

export default function ArticleGrid({ articles }) {
  return (
    <div className="card m-4">
      {articles.map(article => {
        return <Article key={article.id} article={article} />
      })}
    </div>
  )
}
