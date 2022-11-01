import { useQuery } from "@tanstack/react-query"

import { gql, request } from "graphql-request"

const endpoint = "http://localhost:1337/graphql"

export function useArticles(filters) {
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
      suspense: true,
    }
  )
}
