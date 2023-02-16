import React, { FC } from "react"
import { FlatList, TextStyle, View, ViewStyle } from "react-native"
import { Text, Screen } from "../components"

import { colors, spacing } from "../theme"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import MovieListItem from "../models/components/MovieListItem"
import { Movie } from "../models/Movies/Movie"
import { ShowroomDrawerScreenProps } from "../navigators/ShowroomNavigator"
import { MovieApiTypes } from "../models/Movies/MovieStore"
import { observer } from "mobx-react-lite"

type BasicMovieScreenProps = ShowroomDrawerScreenProps<MovieApiTypes.MostPopularTV> & {
  api: MovieApiTypes
  title: string
}

export const BasicMovieScreen: FC<BasicMovieScreenProps> = observer(function BasicMovieScreen(
  _props,
) {
  const {
    movieStore: { data, favorites, fetchData, toggleFavorite, hasFavorite },
  } = useStores()

  const { api, title } = _props.route.params
  console.tron.log(api, title, "props")

  React.useEffect(() => {
    ;(async () => {
      fetchData(api)
    })()
  }, [api, fetchData])
  console.tron.log(data, "movieStore")

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text style={$title} preset="heading">
        {title}
      </Text>
      <View style={$itemsContainer}>
        {/* {top250M.map((item, index) => (
          <MovieListItem key={index} movie={item} />
        ))} */}
        <FlatList<Movie>
          data={data.get(api) || []}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => <Text preset="subheading">No items! Try another type!</Text>}
          renderItem={(item) => (
            <MovieListItem
              movie={item.item}
              toggleFavorite={toggleFavorite}
              hasFavorite={hasFavorite}
            />
          )}
        />
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingTop: spacing.large + spacing.extraLarge,
  paddingBottom: spacing.huge,
  paddingHorizontal: spacing.large,
}

const $title: TextStyle = {
  marginBottom: spacing.huge,
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
