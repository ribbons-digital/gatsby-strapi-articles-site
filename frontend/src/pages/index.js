import * as React from "react"

import Layout from "../components/layout"
import SearchInput from "../components/searchInput"

import { useQueryErrorResetBoundary } from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary"
import ArticleGrid from "../components/ArticleGrid"
import CheckboxList from "../components/CheckboxList"
import EnvButtonList from "../components/EnvButtonList"

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const IndexPage = () => {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <Layout>
      <SearchInput />
      {/** languages checkboxes */}
      <CheckboxList />

      {/** buttons */}
      <EnvButtonList />

      {/** artcile cards based on the articlesState */}
      <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
        <React.Suspense fallback={<h1>Loading articles...</h1>}>
          <ArticleGrid />
        </React.Suspense>
      </ErrorBoundary>
    </Layout>
  )
}

export default IndexPage
