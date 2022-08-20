import { NavigationContainer, TabRouterOptions } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'
import FeedsScreen from './screens/FeedsScreen'
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import PasswordRecovery from './screens/PasswordRecovery'

import { useReducer, useEffect, createContext, useMemo } from 'react'
import * as SecureStore from 'expo-secure-store'
import { authenticateToken, login, register } from './api'
import AuthContext from './auth-context'
import { Alert } from 'react-native'
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { HomeIcon, FeedsIcon, SettingsIcons } from './components/Icons'
import ArticleScreen from './screens/ArticleScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStack = createNativeStackNavigator()
const FeedsStack = createNativeStackNavigator()
const SettingsStack = createNativeStackNavigator()

const App = () => {
  const stackScreenOptions: NativeStackNavigationOptions = {
    headerStyle: {
      backgroundColor: '#229e72',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  const tabScreenOptions: BottomTabNavigationOptions = {
    // headerStyle: {
    //   backgroundColor: '#229e72',
    // },
    // headerTintColor: '#fff',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    // },
    headerShown: false,
    tabBarShowLabel: false,
  }

  type State = {
    isLoading: boolean
    isSignout: boolean
    userToken: string | null
  }

  type Action =
    | { type: 'RESTORE_TOKEN'; token: string }
    | { type: 'SIGN_IN'; token: string }
    | { type: 'SIGN_OUT' }

  const [state, dispatch] = useReducer(
    // https://www.sumologic.com/blog/react-hook-typescript/
    (prevState: State, action: Action): State => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          }
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          }
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  )
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken

      try {
        userToken = await SecureStore.getItemAsync('userToken')
      } catch (e) {
        userToken = null
      }
      // console.log(userToken)
      if (userToken) {
        const validToken = await authenticateToken(userToken)
        if (validToken) {
          dispatch({ type: 'RESTORE_TOKEN', token: userToken })
        } else {
          dispatch({ type: 'SIGN_OUT' })
        }
      } else {
        dispatch({ type: 'SIGN_OUT' })
      }
    }

    bootstrapAsync()
  }, [])

  const authContext = useMemo(
    () => ({
      signIn: async (email: string, password: string) => {
        const token = await login(email, password)
        if (token !== '') {
          await SecureStore.setItemAsync('userToken', token)
          dispatch({ type: 'SIGN_IN', token })
        } else {
          Alert.alert(
            "Username or password incorrect. Get it together amigo, c'mon"
          )
          dispatch({ type: 'SIGN_OUT' })
        }
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync('userToken')
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async (email: string, password: string) => {
        const token = await register(email, password)
        if (token !== '') {
          dispatch({ type: 'SIGN_IN', token })
        } else {
          dispatch({ type: 'SIGN_OUT' })
        }
      },
      getToken: async () => {
        return await SecureStore.getItemAsync('userToken')
      },
    }),
    []
  )

  const HomeStackScreen = () => (
    <HomeStack.Navigator screenOptions={stackScreenOptions}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Article" component={ArticleScreen} />
    </HomeStack.Navigator>
  )

  const FeedStackScreen = () => (
    <FeedsStack.Navigator screenOptions={stackScreenOptions}>
      <FeedsStack.Screen name="Feeds" component={FeedsScreen} />
    </FeedsStack.Navigator>
  )

  const SettingStackScreen = () => (
    <SettingsStack.Navigator screenOptions={stackScreenOptions}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  )

  const UnauthNav = () => (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Password Recovery" component={PasswordRecovery} />
    </Stack.Navigator>
  )

  const AuthNav = () => (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="Home Stack"
        component={HomeStackScreen}
        options={{ tabBarIcon: () => <HomeIcon /> }}
      />
      <Tab.Screen
        name="Feeds Stack"
        component={FeedStackScreen}
        options={{ tabBarIcon: () => <FeedsIcon /> }}
      />
      <Tab.Screen
        name="Settings Stack"
        component={SettingStackScreen}
        options={{ tabBarIcon: () => <SettingsIcons /> }}
      />
    </Tab.Navigator>
  )

  const screens = !state.isSignout ? <AuthNav /> : <UnauthNav />

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {/* <Stack.Navigator screenOptions={screenOptions}>{stack}</Stack.Navigator> */}
        {screens}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App
