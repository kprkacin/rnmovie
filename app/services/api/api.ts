/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import type { ApiConfig, ApiFeedResponse, MovieDetail } from "./api.types"
import { MovieSnapshotIn } from "../../models/Movies/Movie"
import { transformToMovie, transformToMovieDetail } from "./transformations"
import { exampleDetail } from "../../models/Movies/jsonconts"
const apiKey = "k_jp9rto8f"
// temp1const apiKey = "k_e2819k37"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  async getTop250Movies(): Promise<{ kind: "ok"; data: MovieSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(`Top250Movies/${apiKey}`)
    console.log(response)
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      // This is where we transform the data into the shape we expect for our MST model.

      return { kind: "ok", data: response.data.items.map(transformToMovie) }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async getMostPopularMovies(): Promise<
    { kind: "ok"; data: MovieSnapshotIn[] } | GeneralApiProblem
  > {
    // make the api call
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(
      `MostPopularMovies/${apiKey}`,
    )
    console.log(response)
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      // This is where we transform the data into the shape we expect for our MST model.

      return { kind: "ok", data: response.data.items.map(transformToMovie) }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async getMostPopularTVs(): Promise<{ kind: "ok"; data: MovieSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(
      `MostPopularTVs/${apiKey}`,
    )
    console.log(response)
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      // This is where we transform the data into the shape we expect for our MST model.

      return { kind: "ok", data: response.data.items.map(transformToMovie) }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async getInTheaters(): Promise<{ kind: "ok"; data: MovieSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(`InTheaters/${apiKey}`)
    console.log(response)
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      // This is where we transform the data into the shape we expect for our MST model.

      return { kind: "ok", data: response.data.items.map(transformToMovie) }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async getComingSoon(): Promise<{ kind: "ok"; data: MovieSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(`ComingSoon/${apiKey}`)
    console.log(response)
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      // This is where we transform the data into the shape we expect for our MST model.

      return { kind: "ok", data: response.data.items.map(transformToMovie) }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  // async getBoxOffice(): Promise<{ kind: "ok"; data: MovieSnapshotIn[] } | GeneralApiProblem> {
  //   // make the api call
  //   const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(`BoxOffice/${apiKey}`)
  //   console.log(response)
  //   // the typical ways to die when calling an api
  //   if (!response.ok) {
  //     const problem = getGeneralApiProblem(response)
  //     if (problem) return problem
  //   }

  //   // transform the data into the format we are expecting
  //   try {
  //     const rawData = response.data

  //     // This is where we transform the data into the shape we expect for our MST model.

  //     return { kind: "ok", data: response.data.items.map(transformToMovieDetail)}
  //   } catch (e) {
  //     if (__DEV__) {
  //       console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
  //     }
  //     return { kind: "bad-data" }
  //   }
  // }

  async getMovieDetails(
    id: string,
  ): Promise<{ kind: "ok"; data: MovieDetail } | GeneralApiProblem> {
    // // make the api call
    // const response: ApiResponse<MovieDetail> = await this.apisauce.get(
    //   `Title/${apiKey}/${id}/Ratings,Images`,
    // )
    // console.tron.log(response)
    // // the typical ways to die when calling an api
    // if (!response.ok) {
    //   const problem = getGeneralApiProblem(response)
    //   if (problem) return problem
    // }

    // transform the data into the format we are expecting
    try {
      const transformed = transformToMovieDetail(exampleDetail)

      // This is where we transform the data into the shape we expect for our MST model.
      console.tron.log(transformed, "rawData")
      return { kind: "ok", data: transformed }
    } catch (e) {
      if (__DEV__) {
        // console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
