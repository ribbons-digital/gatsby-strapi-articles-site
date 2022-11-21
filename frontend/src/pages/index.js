import { useQuery } from "@tanstack/react-query"
import * as React from "react"

import { gql, request } from "graphql-request"

import Article from "../components/ArticleCard"
import Checkbox from "../components/Checkbox"
import Layout from "../components/layout"
import SearchInput from "../components/searchInput"

import { environments, industries, languages, verticals } from "../utils"

const endpoint = "http://localhost:1337/graphql"

function useArticles(filters) {
  return useQuery(
    ["articles"],
    async () => {
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
                  industry
                  vertical
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
        const re = new RegExp(filters.searchText, "i")
        let filteredArticles
        if (
          filters.selectedIndustry !== "all" ||
          filters.selectedVertical !== "all"
        ) {
          filteredArticles = articles.filter(article => {
            return (
              (article.attributes.industry?.replace(/_/g, "") ===
                filters.selectedIndustry.replace(/ /g, "") ||
                article.attributes.vertical?.replace(/_/g, "") ===
                  filters.selectedVertical.replace(/[\s-]+/g, "")) &&
              re.test(article.attributes.title + article.attributes.description)
            )

            // if (filters.selectedIndustry !== "all") {
            //   console.log("industry")
            //   return (
            //     article.attributes.industry?.replace(/_/g, "") ===
            //       filters.selectedIndustry.replace(/ /g, "") &&
            //     re.test(article.attributes.title + article.attributes.description)
            //   )
            // }
            //
            // if (filters.selectedVertical !== "all") {
            //   return (
            //     article.attributes.vertical?.replace(/_/g, "") ===
            //       filters.selectedVertical.replace(/ /g, "") &&
            //     re.test(article.attributes.title + article.attributes.description)
            //   )
            // }
            //
            // return re.test(
            //   article.attributes.title + article.attributes.description
            // )
          })
        } else {
          filteredArticles = articles.filter(article => {
            return re.test(
              article.attributes.title + article.attributes.description
            )
          })
        }

        return filteredArticles
      },
    }
  )
}

const IndexPage = () => {
  const [filters, setFilters] = React.useState({
    searchText: "",
    selectedIndustry: "all",
    selectedVertical: "all",
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
        {industries.map((industry, index) => {
          return (
            <Checkbox
              key={index}
              filters={filters}
              setFilters={setFilters}
              selectedOption="selectedIndustry"
              value={industry}
            />
          )
        })}
      </div>
      <div className="flex items-center m-4">
        {verticals.map((vertical, index) => {
          return (
            <Checkbox
              key={index}
              filters={filters}
              setFilters={setFilters}
              selectedOption="selectedVertical"
              value={vertical}
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
