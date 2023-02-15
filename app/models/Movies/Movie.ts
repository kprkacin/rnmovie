import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

export const MovieModel = types
  .model("Movie")
  .props({
    id: types.identifier,
    rank: types.optional(types.string, ""),
    title: types.optional(types.string, ""),
    fullTitle: types.optional(types.string, ""),
    year: types.optional(types.string, ""),
    image: types.optional(types.string, ""),
    crew: types.optional(types.string, ""),
    imDbRating: types.optional(types.string, ""),
    imDbRatingCount: types.optional(types.string, ""),
  })
  .actions(withSetPropAction)

export interface Movie extends Instance<typeof MovieModel> {}
export interface MovieSnapshotOut extends SnapshotOut<typeof MovieModel> {}
export interface MovieSnapshotIn extends SnapshotIn<typeof MovieModel> {}
