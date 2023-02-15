import * as React from "react"
import { createDrawerNavigator, DrawerScreenProps } from "@react-navigation/drawer"
import { BasicMovieScreen } from "../screens"
import { observer } from "mobx-react-lite"

import { colors } from "../theme"
import { MovieApiTypes } from "../models/Movies/MovieStore"
type MovieType = {
  title: string
  api: MovieApiTypes
}
export type ShowroomDrawerParamList = {
  [MovieApiTypes.MostPopularTV]: MovieType
  [MovieApiTypes.MostPopularMovies]: MovieType
  [MovieApiTypes.Top250M]: MovieType
  [MovieApiTypes.Top250TV]: MovieType
  [MovieApiTypes.ComingSoon]: MovieType
  [MovieApiTypes.InTheaters]: MovieType
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type ShowroomDrawerScreenProps<T extends keyof ShowroomDrawerParamList> = DrawerScreenProps<
  ShowroomDrawerParamList,
  T
>

const Drawer = createDrawerNavigator<ShowroomDrawerParamList>()

const ShowroomDrawer = observer(function AppStack() {
  return (
    <Drawer.Navigator
      initialRouteName={MovieApiTypes.Top250M}
      screenOptions={{
        drawerStyle: {
          backgroundColor: colors.background,
        },
        header: () => null,
      }}
    >
      <Drawer.Screen
        name={MovieApiTypes.MostPopularMovies}
        component={BasicMovieScreen}
        options={{ title: "Most Popular Movies" }}
        initialParams={{ title: "Most Popular Movies", api: MovieApiTypes.MostPopularMovies }}
      />
      <Drawer.Screen
        name={MovieApiTypes.MostPopularTV}
        options={{ title: "Most Popular TVs" }}
        component={BasicMovieScreen}
        initialParams={{ title: "Most Popular TVs", api: MovieApiTypes.MostPopularTV }}
      />
      <Drawer.Screen
        name={MovieApiTypes.Top250M}
        component={BasicMovieScreen}
        options={{ title: "Top 250 Movies" }}
        initialParams={{ title: "Top 250 Movies", api: MovieApiTypes.Top250M }}
      />
      <Drawer.Screen
        name={MovieApiTypes.Top250TV}
        component={BasicMovieScreen}
        options={{ title: "Top 250 TVs" }}
        initialParams={{ title: "Top 250 TVs", api: MovieApiTypes.Top250TV }}
      />
      <Drawer.Screen
        name={MovieApiTypes.ComingSoon}
        component={BasicMovieScreen}
        options={{ title: "Coming Soon" }}
        initialParams={{ title: "Coming Soon", api: MovieApiTypes.ComingSoon }}
      />
      <Drawer.Screen
        name={MovieApiTypes.InTheaters}
        component={BasicMovieScreen}
        options={{ title: "In Theathers" }}
        initialParams={{ title: "In Theathers", api: MovieApiTypes.InTheaters }}
      />
    </Drawer.Navigator>
  )
})

export const ShowroomNavigator = observer(function AppNavigator() {
  return <ShowroomDrawer />
})
