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
                  updatedAt
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
        let filteredArticles = articles

        if (filters.selectedIndustry !== "all") {
          filteredArticles = filteredArticles.filter(
            article =>
              article.attributes.industry?.replace(/_/g, "") ===
                filters.selectedIndustry.replace(/[\s-/]+/g, "") &&
              re.test(article.attributes.title + article.attributes.description)
          )
        }
        if (filters.selectedVertical !== "all") {
          filteredArticles = filteredArticles.filter(
            article =>
              article.attributes.vertical?.replace(/_/g, "") ===
                filters.selectedVertical.replace(/[\s-/]+/g, "") &&
              re.test(article.attributes.title + article.attributes.description)
          )
        }

        filteredArticles = filteredArticles.filter(article => {
          return re.test(
            article.attributes.title + article.attributes.description
          )
        })

        return filters.sortBy === "oldest"
          ? filteredArticles
          : filters.sortBy === "latest"
          ? filteredArticles.sort((a, b) =>
              a.attributes.updatedAt > b.attributes.updatedAt ? -1 : 1
            )
          : filteredArticles
      },
    }
  )
}

const IndexPage = () => {
  const [filters, setFilters] = React.useState({
    searchText: "",
    selectedIndustry: "all",
    selectedVertical: "all",
    sortBy: "oldest",
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

  function onSortByDate(event) {
    setFilters({
      ...filters,
      sortBy: event.target.value,
    })
  }

  if (isFetching) {
    return <div>loading...</div>
  }

  if (error) return <div>Something is wrong</div>

  console.log(filters.sortBy)

  return (
    <Layout>
      <div className="flex flex-col m-4">
        <label for="sort-by-date">Sort by date:</label>
        <select id="sort-by-date" name="sort-by-date" onChange={onSortByDate}>
          <option value="oldest">Sort by: oldest</option>
          <option value="latest">Sort by: latest</option>
        </select>
      </div>

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
