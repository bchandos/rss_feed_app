import { NavigationContainer, TabRouterOptions } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'
import ProfileScreen from './screens/ProfileScreen'
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
import { HomeIcon, ProfileIcon, SettingsIcons } from './components/Icons'

// interface IContextProps {
//   state: IState
//   dispatch: ({type}:{type:string}) => void
// }

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

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
    headerStyle: {
      backgroundColor: '#229e72',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
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
      console.log(userToken)
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
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
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
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        const token = await register(email, password)
        if (token !== '') {
          dispatch({ type: 'SIGN_IN', token })
        } else {
          dispatch({ type: 'SIGN_OUT' })
        }
      },
    }),
    []
  )

  const screens = !state.isSignout ? (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: () => <HomeIcon /> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: () => <ProfileIcon /> }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarIcon: () => <SettingsIcons /> }}
      />
    </Tab.Navigator>
  ) : (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Password Recovery" component={PasswordRecovery} />
    </Stack.Navigator>
  )

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
