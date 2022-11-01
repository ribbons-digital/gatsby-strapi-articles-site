import { useQuery } from "@tanstack/react-query"
import * as React from "react"

import { gql, request } from "graphql-request"

import Article from "../components/ArticleCard"
import Checkbox from "../components/Checkbox"
import Layout from "../components/layout"
import SearchInput from "../components/searchInput"

import { environments, languages } from "../utils"

const endpoint = "http://localhost:1337/graphql"

function useArticles(filters) {
  return useQuery(
    ["articles"],
    async filters => {
      const {
        articles: { data },
      } = await request(
        endpoint,
        gql`
          query {
            articles {
              data {
                id
                attributes {
                  title
                  description
                  languages
                  environment
                }
              }
            }
          }
        `
      )
      return data
    },
    {
      select: articles => {
        const filteredArticles = articles.filter(article => {
          const re = new RegExp(filters.searchText, "i")
          if (filters.selectedLangs.length > 0) {
            return (
              article.attributes.languages.some(lang =>
                filters.selectedLangs.includes(lang)
              ) &&
              re.test(article.attributes.title + article.attributes.description)
            )
          }

          if (filters.selectedEnv !== "all") {
            return (
              article.attributes.environment === filters.selectedEnv &&
              re.test(article.attributes.title + article.attributes.description)
            )
          }

          return re.test(
            article.attributes.title + article.attributes.description
          )
        })

        return filteredArticles
      },
    }
  )
}

const IndexPage = () => {
  const [filters, setFilters] = React.useState({
    searchText: "",
    selectedLangs: [],
    selectedEnv: "all",
  })

  const { data, error, isFetching } = useArticles(filters)

  // function to call when clicking on any of the button
  function onSelectEnv(event) {
    console.log("button --> " + event.target.value)
    // setSelectedEnv(event.target.value)
    setFilters({
      ...filters,
      selectedEnv: event.target.value,
    })
  }

  if (isFetching) {
    return <div>loading...</div>
  }

  if (error) return <div>Something is wrong</div>

  return (
    <Layout>
      <SearchInput setFilters={setFilters} filters={filters} />
      {/** languages checkboxes */}
      <div className="flex items-center m-4">
        {languages.map((language, index) => {
          return (
            <Checkbox
              key={index}
              language={language}
              selectedLangs={filters.selectedLangs}
              filters={filters}
              setFilters={setFilters}
              value={languages[index]}
            />
          )
        })}
      </div>

      {/** buttons */}
      <div className="space-x-2 m-4">
        {environments.map((env, index) => {
          return (
            <input
              key={index}
              type="button"
              value={env}
              className="rounded bg-blue-600 px-2 text-white"
              onClick={onSelectEnv}
            />
          )
        })}
      </div>

      {/** artcile cards based on the articlesState */}
      <div className="card m-4">
        {data.map(article => {
          return (
            <Article
              key={article.id}
              article={article}
              onSelectEnv={onSelectEnv}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export default IndexPage
