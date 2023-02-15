import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api } from "../../services/api"
import { Movie, MovieModel } from "./Movie"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { top250MResponse, top250TVResponse } from "./jsonconts"

export enum MovieApiTypes {
  Top250M = "top250M",
  Top250TV = "top250TV",
  MostPopularMovies = "mostPopularMovies",
  MostPopularTV = "mostPopularTV",
  ComingSoon = "comingSoon",
  InTheaters = "inTheaters",
  Favorites = "favorites",
  // BoxOffice = "boxOffice",
  // BoxOfficeAllTime = "boxOfficeAllTime",
}
export const MovieStoreModel = types
  .model("MovieStore")
  .props({
    data: types.map(types.array(MovieModel)),
    favorites: types.array(types.reference(MovieModel)),
    favoritesOnly: false,
  })
  .actions((store) => ({
    withSetPropAction,
    setData(type: MovieApiTypes, data: Movie[]) {
      store.data.set(type, data)
    },
  }))
  .actions((store) => ({
    reset() {
      store.data.clear()
      store.favorites.clear()
    },
    fetchDataSuccess(type: MovieApiTypes, data: Movie[]) {
      store.data.set(type, data)
    },

    async fetchData(type: MovieApiTypes) {
      let response = null
      if (store.data.has(type)) {
        return
      }
      try {
        switch (type) {
          case MovieApiTypes.Top250M:
            if (store.data.has(type)) {
              break
            }
            store.setData(type, top250MResponse.items as Movie[])
            break
          case MovieApiTypes.Top250TV:
            store.setData(type, top250TVResponse.items as Movie[])
            break
          case MovieApiTypes.MostPopularMovies:
            response = await api.getMostPopularMovies()
            if (response.kind === "ok") {
              store.setData(type, response.data)
            } else {
              console.tron.error(`Error fetching most popular ${JSON.stringify(response)}`, [])
            }
            break
          case MovieApiTypes.MostPopularTV:
            response = await api.getMostPopularTVs()
            if (response.kind === "ok") {
              store.setData(type, response.data)
            } else {
              console.tron.error(`Error fetching most popular ${JSON.stringify(response)}`, [])
            }
            break
          case MovieApiTypes.ComingSoon:
            response = await api.getComingSoon()
            if (response.kind === "ok") {
              console.tron.log(response, store.data, "response coming soon")
              store.setData(type, response.data)
            } else {
              console.tron.error(`Error fetching most popular ${JSON.stringify(response)}`, [])
            }
            break
          case MovieApiTypes.InTheaters:
            response = await api.getInTheaters()
            if (response.kind === "ok") {
              console.tron.log(response, store.data, "response coming soon")
              store.setData(type, response.data)
            } else {
              console.tron.error(`Error fetching most popular ${JSON.stringify(response)}`, [])
            }
            break

          default:
            break
        }
      } catch (error) {
        console.log(error, "error in fetchData")
        console.tron.error(error, "error in fetchData")
      }
    },
    addFavorite(movie: Movie) {
      store.favorites.push(movie)
    },
    removeFavorite(movie: Movie) {
      store.favorites.remove(movie)
    },
  }))
  .views((store) => ({
    get episodesForList() {
      return store.favorites
    },
    hasFavorite(movie: Movie) {
      return store.favorites.includes(movie)
    },
  }))
  .actions((store) => ({
    toggleFavorite(movie: Movie) {
      console.tron.log(movie)
      if (store.hasFavorite(movie)) {
        store.removeFavorite(movie)
      } else {
        store.addFavorite(movie)
      }
    },
  }))

export interface MovieStore extends Instance<typeof MovieStoreModel> {}
export interface MovieStoreSnapshot extends SnapshotOut<typeof MovieStoreModel> {}
