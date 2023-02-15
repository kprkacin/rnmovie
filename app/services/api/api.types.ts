/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

export interface ApiFeedResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: BaseMovie[]
}
export interface MovieDetailResponse {
  data: MovieDetail
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}
export interface MovieDetail {
  id?: string | null
  title?: string | null
  originalTitle?: string | null
  fullTitle?: string | null
  type?: string | null
  year?: string | null
  image?: string | null
  releaseDate?: string | null
  runtimeMins?: string | null
  runtimeStr?: string | null
  plot?: string | null
  plotLocal?: string | null
  plotLocalIsRtl?: true
  awards?: string | null
  directors?: string | null
  directorList?: [
    {
      id?: string | null
      name?: string | null
    },
  ]
  writers?: string | null
  writerList?: [
    {
      id?: string | null
      name?: string | null
    },
  ]
  stars?: string | null
  starList?: [
    {
      id?: string | null
      name?: string | null
    },
  ]
  actorList?: [
    {
      id?: string | null
      image?: string | null
      name?: string | null
      asCharacter?: string | null
    },
  ]
  fullCast?: {
    imDbId?: string | null
    title?: string | null
    fullTitle?: string | null
    type?: string | null
    year?: string | null
    directors?: {
      job?: string | null
      items?: [
        {
          id?: string | null
          name?: string | null
          description?: string | null
        },
      ]
    }
    writers?: {
      job?: string | null
      items?: [
        {
          id?: string | null
          name?: string | null
          description?: string | null
        },
      ]
    }
    actors?: [
      {
        id?: string | null
        image?: string | null
        name?: string | null
        asCharacter?: string | null
      },
    ]
    others?: [
      {
        job?: string | null
        items?: [
          {
            id?: string | null
            name?: string | null
            description?: string | null
          },
        ]
      },
    ]
    errorMessage?: string | null
  } | null
  genres?: string | null
  genreList?: [
    {
      key?: string | null
      value?: string | null
    },
  ]
  companies?: string | null
  companyList?: [
    {
      id?: string | null
      name?: string | null
    },
  ]
  countries?: string | null
  countryList?: [
    {
      key?: string | null
      value?: string | null
    },
  ]
  languages?: string | null
  languageList?: [
    {
      key?: string | null
      value?: string | null
    },
  ]
  contentRating?: string | null
  imDbRating?: string | null
  imDbRatingVotes?: string | null
  metacriticRating?: string | null
  ratings?: {
    imDbId?: string | null
    title?: string | null
    fullTitle?: string | null
    type?: string | null
    year?: string | null
    imDb?: string | null
    metacritic?: string | null
    theMovieDb?: string | null
    rottenTomatoes?: string | null
    filmAffinity?: string | null
    errorMessage?: string | null
  } | null
  wikipedia?: {
    imDbId?: string | null
    title?: string | null
    fullTitle?: string | null
    type?: string | null
    year?: string | null
    language?: string | null
    titleInLanguage?: string | null
    url?: string | null
    plotShort?: {
      plainText?: string | null
      html?: string | null
    }
    plotFull?: {
      plainText?: string | null
      html?: string | null
    }
    errorMessage?: string | null
  } | null
  posters?: {
    imDbId?: string | null
    title?: string | null
    fullTitle?: string | null
    type?: string | null
    year?: string | null
    posters?: [
      {
        id?: string | null
        link?: string | null
        aspectRatio?: 0
        language?: string | null
        width?: 0
        height?: 0
      },
    ]
    backdrops?: [
      {
        id?: string | null
        link?: string | null
        aspectRatio?: 0
        language?: string | null
        width?: 0
        height?: 0
      },
    ]
    errorMessage?: string | null
  } | null
  images?: {
    imDbId?: string | null
    title?: string | null
    fullTitle?: string | null
    type?: string | null
    year?: string | null
    items?: [
      {
        title?: string | null
        image?: string | null
      },
    ]
    errorMessage?: string | null
  } | null
  trailer?: {
    imDbId?: string | null
    title?: string | null
    fullTitle?: string | null
    type?: string | null
    year?: string | null
    videoId?: string | null
    videoTitle?: string | null
    videoDescription?: string | null
    thumbnailUrl?: string | null
    uploadDate?: string | null
    link?: string | null
    linkEmbed?: string | null
    errorMessage?: string | null
  } | null
  boxOffice?: {
    budget?: string | null
    openingWeekendUSA?: string | null
    grossUSA?: string | null
    cumulativeWorldwideGross?: string | null
  } | null
  tagline?: string | null
  keywords?: string | null
  keywordList?: [string | null]
  similars?: [
    {
      id?: string | null
      title?: string | null
      image?: string | null
      imDbRating?: string | null
    },
  ]
  tvSeriesInfo?: {
    yearEnd?: string | null
    creators?: string | null
    creatorList?: [
      {
        id?: string | null
        name?: string | null
      },
    ]
    seasons?: [string | null]
  } | null
  tvEpisodeInfo?: {
    seriesId?: string | null
    seriesTitle?: string | null
    seriesFullTitle?: string | null
    seriesYear?: string | null
    seriesYearEnd?: string | null
    seasonNumber?: string | null
    episodeNumber?: string | null
    previousEpisodeId?: string | null
    nextEpisodeId?: string | null
  } | null
}

export interface BaseMovie {
  id: string | null
  rank: string | null
  title: string | null
  fullTitle: string | null
  year: string | null
  image: string | null
  crew: string | null
  imDbRating: string | null
  imDbRatingCount: string | null
}
