import React from "react"
import { FilterContext } from "../context/filterContext"
import { environments } from "../utils"

export default function EnvButtonList() {
  const { onSelectEnv } = React.useContext(FilterContext)
  return (
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
  )
}
