import React, { FC } from "react"
import { FlatList, SafeAreaView, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../components"

import { colors, spacing } from "../theme"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import MovieListItem from "../models/components/MovieListItem"
import { Movie } from "../models/Movies/Movie"
import { ShowroomDrawerScreenProps } from "../navigators/ShowroomNavigator"
import { MovieApiTypes } from "../models/Movies/MovieStore"
import { observer } from "mobx-react-lite"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"

export const FavoritesScreen: FC<DemoTabScreenProps<"DemoDebug">> = observer(
  function DemoDebugScreen(_props) {
    const {
      movieStore: { favorites, toggleFavorite, hasFavorite },
    } = useStores()

    return (
      <View style={$container}>
        <Text style={$title} preset="heading">
          Favorites
        </Text>
        <SafeAreaView style={$itemsContainer}>
          {/* {top250M.map((item, index) => (
          <MovieListItem key={index} movie={item} />
        ))} */}
          <FlatList<Movie>
            data={favorites}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (
              <MovieListItem
                movie={item.item}
                toggleFavorite={toggleFavorite}
                hasFavorite={hasFavorite}
              />
            )}
          />
        </SafeAreaView>
      </View>
    )
  },
)

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
