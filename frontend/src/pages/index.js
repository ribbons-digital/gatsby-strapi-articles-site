import { useQuery } from "@tanstack/react-query"
import * as React from "react"

import { gql, request } from "graphql-request"

import Article from "../components/ArticleCard"
import Layout from "../components/layout"
import SearchInput from "../components/searchInput"
import jwt_decode from "jwt-decode"
import { environments } from "../utils"
import RadioButtonGroups from "../components/RadioButtonGroups"
import { GoogleLogin, googleLogout } from "@react-oauth/google"
import useLoadGsiScript from "../hooks/useLoadGsiScript"
import { useGoogleOauth } from "../context/GoogleOAuthContext"
import GoogleLoginButton from "../components/GoogleLoginButton"
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
          ? filteredArticles.sort((a, b) =>
              a.attributes.updatedAt > b.attributes.updatedAt ? 1 : -1
            )
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
  const [user, setUser] = React.useState(null)
  const [filters, setFilters] = React.useState({
    searchText: "",
    selectedIndustry: "all",
    selectedVertical: "all",
    sortBy: "oldest",
  })
  const { data, error, isFetching } = useArticles(filters)

  console.log({ filters })
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

  function handleSignout() {
    setUser(null)
    window.google?.accounts.id.disableAutoSelect()
  }
  if (isFetching) {
    return <div>loading...</div>
  }

  if (error) return <div>Something is wrong</div>

  return user ? (
    <Layout>
      <button
        className="rounded bg-red-600 m-2 p-2 text-white"
        onClick={handleSignout}
      >
        Sign out
      </button>
      <div className="flex flex-col m-4">
        <label htmlFor="sort-by-date">Sort by date:</label>
        <select id="sort-by-date" name="sort-by-date" onChange={onSortByDate}>
          <option value="oldest">Sort by: oldest</option>
          <option value="latest">Sort by: latest</option>
        </select>
      </div>
      <div className="flex flex-col w-1/3">
        <SearchInput setFilters={setFilters} filters={filters} />
        <button className="rounded bg-blue-600 mx-2 px-2 text-white">
          Toggle all
        </button>
      </div>
      <RadioButtonGroups filters={filters} setFilters={setFilters} />

      <RadioButtonGroups
        isMobile={true}
        filters={filters}
        setFilters={setFilters}
      />
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
  ) : (
    <GoogleLoginButton user={user} setUser={setUser} />
  )
}

export default IndexPage

// export function Head() {
//   return (
//     <script src="https://accounts.google.com/gsi/client" async defer></script>
//   )
// }
