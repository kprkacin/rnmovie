import React, { FC } from "react"
import * as Application from "expo-application"
import {
  FlatList,
  ImageStyle,
  Linking,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Image,
} from "react-native"

import { AutoImage, Button, ListItem, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing, typography } from "../theme"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { api, MovieDetail } from "../services/api"
import MovieListItem from "../models/components/MovieListItem"
import { Movie } from "../models/Movies/Movie"
import { AppStackParamList, AppStackScreenProps } from "../navigators"
import { Icon, Skeleton } from "@rneui/base"
import Video from "react-native-video"
import Carousel from "react-native-snap-carousel"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

interface MovieDetailSceenProps extends AppStackScreenProps<"MovieDetail"> {}

const RenderImageList = ({ item }) => {
  return (
    <View key={item.id}>
      <Text>{item.title}</Text>

      <AutoImage source={{ uri: item.image }} style={$image} />
    </View>
  )
}
const RenderActorList = ({ item }) => {
  return (
    <View key={item.id}>
      <Text>{item.name}</Text>

      <AutoImage source={{ uri: item.image }} maxHeight={170} style={{ borderRadius: 15 }} />
    </View>
  )
}
const RenderCarauselItem = ({ item }, push) => {
  return (
    <View key={item.id}>
      <TouchableOpacity
        onPress={() => {
          push("MovieDetail", { movie: item })
        }}
      >
        <Text>{item.title}</Text>
      </TouchableOpacity>
      <Text>
        {item?.imDbRating} / 10 <Icon name="star" type="material" color="gold" />
      </Text>
      <AutoImage source={{ uri: item.image }} maxHeight={400} style={$image} />
    </View>
  )
}

export const MovieDetailScreen: FC<MovieDetailSceenProps> = function MovieScreen(_props) {
  const { movie } = _props.route.params
  const { push } = useNavigation<StackNavigationProp<AppStackParamList>>()

  const [movieDetail, setMovieDetail] = React.useState<MovieDetail>(null)
  const [loading, setLoading] = React.useState<boolean>(true)
  const trailerRef = React.useRef<Video>(null)
  const carauselRef = React.useRef<any>(null)
  const carauselRefActors = React.useRef<any>(null)
  const carauselRefImages = React.useRef<any>(null)

  React.useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const promise = await new Promise((resolve) =>
          setTimeout(() => {
            resolve("")
          }, 1000),
        )
        const response = await api.getMovieDetails(movie.id)
        console.tron.log(`Movie detail: ${JSON.stringify(response)}`, [])
        if (response.kind === "ok") {
          setMovieDetail(response.data)
          setTimeout(() => {
            setLoading(false)
          }, 1500)
        }
      } catch (error) {
        console.tron.error(`Error fetching movie detail: ${JSON.stringify(error)}`, [])
      }
    })()
  }, [])

  console.tron.log(`Movie outer detail: ${JSON.stringify(movieDetail)}`)
  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      {loading && !movieDetail ? (
        <>
          <Skeleton height={400} style={$image} />
          <Skeleton height={64} style={$title} />
          <Skeleton height={300} style={$title} />
        </>
      ) : (
        <>
          <AutoImage source={{ uri: movieDetail?.image }} maxHeight={400} style={$image} />
          <Text style={$title} preset="heading">
            {movieDetail?.fullTitle}
          </Text>
          <View style={$wrapper}>
            <View>
              <Text style={$subtitle} preset="subheading">
                Genre
              </Text>
              <Text>{movieDetail?.genres}</Text>
              <Text style={$subtitle} preset="subheading">
                Directors
              </Text>
              <Text>{movieDetail?.directors}</Text>
              <Text style={$subtitle} preset="subheading">
                Writers
              </Text>
              <Text>{movieDetail?.writers}</Text>
            </View>
            <View>
              <View>
                <Text style={$subtitle} preset="subheading">
                  Rating
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Text>
                    {movieDetail?.imDbRating} / 10 <Icon name="star" type="material" color="gold" />
                  </Text>
                  <Text>({movieDetail?.imDbRatingVotes})</Text>
                </View>

                <Text style={$subtitle} preset="subheading">
                  Duration
                </Text>
                <Text>{movieDetail?.runtimeStr ?? movieDetail.runtimeStr}</Text>
              </View>
            </View>
          </View>
          <Text style={$subtitleLarge} preset="subheading">
            About
          </Text>
          <Text style={$subtitle}>{movieDetail?.plot}</Text>

          {movieDetail?.actorList && (
            <View>
              <Text style={$subtitleLarge} preset="subheading">
                Actors
              </Text>
              <Carousel
                ref={carauselRefActors}
                data={movieDetail?.actorList}
                renderItem={RenderActorList}
                sliderWidth={350}
                sliderHeight={350}
                // layout={"stack"}
                itemHeight={150}
                itemWidth={150}
                loop={true}
              />
            </View>
          )}
          {movieDetail?.images?.items && (
            <View>
              <Text style={$subtitleLarge} preset="subheading">
                Gallery
              </Text>
              <Carousel
                ref={carauselRefImages}
                data={movieDetail?.images?.items}
                renderItem={RenderImageList}
                sliderWidth={350}
                // layout={"tinder"}
                itemHeight={150}
                itemWidth={300}
                loop={true}
              />
            </View>
          )}

          <Text style={$subtitleLarge} preset="subheading">
            Awards
          </Text>
          <Text style={{}}>{movieDetail?.awards}</Text>
          {movieDetail?.ratings && (
            <View>
              <Text style={$subtitleLarge} preset="subheading">
                Ratings
              </Text>
              {movieDetail.ratings?.metacritic && (
                <Text>
                  <Text weight={"semiBold"}>Metacritic: </Text>
                  {movieDetail.ratings.metacritic}/100
                </Text>
              )}
              {movieDetail.ratings?.theMovieDb && (
                <Text>
                  <Text weight={"semiBold"}>The Movie DB: </Text>
                  {movieDetail.ratings.theMovieDb}/10
                </Text>
              )}
              {movieDetail.ratings?.rottenTomatoes && (
                <Text>
                  <Text weight={"semiBold"}>Rotten Tomatoes: </Text>
                  {movieDetail.ratings.rottenTomatoes}/100
                </Text>
              )}
            </View>
          )}
          {movieDetail?.boxOffice && (
            <View>
              <Text style={$subtitleLarge} preset="subheading">
                Box Office
              </Text>
              {movieDetail.boxOffice?.budget && (
                <Text>
                  <Text weight={"semiBold"}>Budget: </Text>
                  {movieDetail.boxOffice.budget}
                </Text>
              )}
              {movieDetail.boxOffice?.openingWeekendUSA && (
                <Text>
                  <Text weight={"semiBold"}>Opening Weekend USA: </Text>
                  {movieDetail.boxOffice.openingWeekendUSA}/10
                </Text>
              )}
              {movieDetail.boxOffice?.grossUSA && (
                <Text>
                  <Text weight={"semiBold"}>Gross USA: </Text>
                  {movieDetail.boxOffice.grossUSA}/100
                </Text>
              )}
              {movieDetail.boxOffice?.cumulativeWorldwideGross && (
                <Text>
                  <Text weight={"semiBold"}>Cumulative Worldwide Gross: </Text>
                  {movieDetail.boxOffice.cumulativeWorldwideGross}/100
                </Text>
              )}
            </View>
          )}
          <View>
            <Text style={$subtitleLarge} preset="subheading">
              Trailer
            </Text>

            <Video
              source={{
                uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                type: "mp4",
              }}
              paused={true}
              style={{ width: 350, height: 350 }}
              controls={true}
              onError={(e) => console.tron.log(e)}
              // poster={movieDetail?.image}
              ref={trailerRef}
            />
          </View>

          {movieDetail?.similars && (
            <View>
              <Text style={$subtitleLarge} preset="subheading">
                Similar movies
              </Text>
              <Carousel
                ref={carauselRef}
                data={movieDetail?.similars}
                renderItem={(item) => RenderCarauselItem(item, push)}
                sliderWidth={350}
                itemWidth={300}
                loop={true}
              />
            </View>
          )}
        </>
      )}
    </Screen>
  )
}

const $backgroundVideo: any = {
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
}
const $wrapper: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
}

const $container: ViewStyle = {
  paddingTop: spacing.large + spacing.extraLarge,
  paddingBottom: spacing.huge,
  paddingHorizontal: spacing.large,
}

const $image: ImageStyle = {
  marginBottom: spacing.huge,
  width: "100%",
  height: 400,
  borderRadius: 15,
}
const $title: TextStyle = {
  marginBottom: spacing.large,
}
const $subtitle: TextStyle = {
  marginTop: spacing.extraSmall,
}
const $subtitleLarge: TextStyle = {
  marginTop: spacing.medium,
}
const $listItem: TextStyle = {
  marginRight: spacing.small,
}

const $reportBugsLink: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.large,
  alignSelf: isRTL ? "flex-start" : "flex-end",
}

const $item: ViewStyle = {
  marginBottom: spacing.medium,
}

const $itemsContainer: ViewStyle = {
  marginBottom: spacing.extraLarge,
}

const $button: ViewStyle = {
  marginBottom: spacing.extraSmall,
}

const $buttonContainer: ViewStyle = {
  marginBottom: spacing.medium,
}
const $hint: TextStyle = {
  color: colors.palette.neutral600,
  fontSize: 12,
  lineHeight: 15,
  paddingBottom: spacing.large,
}
