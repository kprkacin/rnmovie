import { BaseMovie, MovieDetail } from "./api.types"

export const transformToMovieDetail = (response: any): MovieDetail => {
  if (!response) return {} as MovieDetail

  return {
    id: response.id,
    title: response.title,
    originalTitle: response.originalTitle,
    fullTitle: response.fullTitle,
    type: response.type,
    year: response.year,
    image: response.image,
    releaseDate: response.releaseDate,
    runtimeMins: response.runtimeMins,
    runtimeStr: response.runtimeStr,
    plot: response.plot,
    plotLocal: response.plotLocal,
    plotLocalIsRtl: response.plotLocalIsRtl,
    awards: response.awards,
    directors: response.directors,
    directorList: response.directorList || [],
    writers: response.writers,
    writerList: response.writerList || [],
    stars: response.stars,
    starList: response.starList || [],
    actorList: response.actorList || [],
    fullCast: response.fullCast,
    genres: response.genres,
    genreList: response.genreList || [],
    companies: response.companies,
    companyList: response.companyList || [],
    countries: response.countries,
    countryList: response.countryList || [],
    languages: response.languages,
    languageList: response.languageList || [],
    contentRating: response.contentRating,
    imDbRating: response.imDbRating,
    imDbRatingVotes: response.imDbRatingVotes,
    metacriticRating: response.metacriticRating,
    ratings: response.ratings,
    wikipedia: response.wikipedia,
    posters: response.posters,
    images: response.images,
    trailer: response.trailer,
    boxOffice: response.boxOffice,
    tagline: response.tagline,
    keywords: response.keywords,
    keywordList: response.keywordList,
    similars: response.similars,
    tvSeriesInfo: response.tvSeriesInfo,
    tvEpisodeInfo: response.tvEpisodeInfo,
  }
}

export const transformToMovie = (response: any): BaseMovie => {
  return {
    id: response.id || "",
    title: response.title || response.originalTitle || "",
    fullTitle: response.fullTitle || "",
    year: response.year || "",
    image: response.image || "",
    imDbRating: response.imDbRating || "",
    imDbRatingCount: response.imDbRatingCount || response.imDbRatingVotes || "",
    rank: response.rank || "",
    crew: response.crew || "",
  }
}
