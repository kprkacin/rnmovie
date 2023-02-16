/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Button, Icon, ListItem } from "@rneui/base"
import { observer } from "mobx-react-lite"
import React from "react"
import { View, Text, ViewStyle, TextStyle } from "react-native"
import { AutoImage } from "../../components"
import { AppStackParamList } from "../../navigators"
import { colors, spacing } from "../../theme"
import { Movie } from "../Movies/Movie"

type Props = {
  movie: Movie
  toggleFavorite: (movie: Movie) => void
  hasFavorite: (movie: Movie) => boolean
}
const $customListItem: ViewStyle = {
  borderRadius: 15,
  borderWidth: 1,
  marginBottom: 5,
  borderColor: "rgba(158, 150, 150, 0)",
}

const MovieListItem = observer(function EpisodeCard({ movie, toggleFavorite, hasFavorite }: Props) {
  const { navigate } = useNavigation<StackNavigationProp<AppStackParamList>>()
  const [favorite, setFavorite] = React.useState(() => hasFavorite(movie))

  const toggle = (movie: Movie) => {
    toggleFavorite(movie)
    setFavorite(!favorite)
  }

  return (
    <ListItem.Swipeable
      leftWidth={80}
      bottomDivider
      containerStyle={$customListItem}
      rightWidth={90}
      leftContent={(action) => (
        <Button
          containerStyle={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#f4f4f4",
          }}
          type="clear"
          icon={{
            name: "archive-outline",
            type: "material-community",
          }}
          onPress={() => {
            action()
            navigate("MovieDetail", { movie })
          }}
        />
      )}
      rightContent={(action) => (
        <Button
          containerStyle={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#f4f4f4",
          }}
          onPress={() => {
            action()
            toggle(movie)
          }}
          type="clear"
          icon={
            !favorite ? (
              <Icon name="favorite-border" color={colors.tint} />
            ) : (
              <Icon name="favorite" color={colors.tint} />
            )
          }
        />
      )}
    >
      <AutoImage source={{ uri: movie.image }} maxHeight={50} />
      <ListItem.Content>
        <ListItem.Title>{movie.title}</ListItem.Title>
        <ListItem.Subtitle>
          {movie.imDbRating ? (
            <View style={$ratings}>
              <Text>{movie.imDbRating} / 10 </Text>
              <Icon name="star" type="material" color="gold" />
              <Text>({movie.imDbRatingCount})</Text>
            </View>
          ) : (
            <View style={$ratings}>
              <Text>No ratings </Text>
            </View>
          )}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  )
})
const $ratings: TextStyle = {
  paddingTop: spacing.small,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}
export default MovieListItem
