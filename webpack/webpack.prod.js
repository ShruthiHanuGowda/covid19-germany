// eslint-disable-next-line import/no-extraneous-dependencies
import { DefinePlugin } from "webpack"

export const mode = "production"
export const devtool = "source-map"
export const plugins = [
  new DefinePlugin({
    "process.env.name": JSON.stringify("Prod"),
  }),
]
