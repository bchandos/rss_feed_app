import { createContext } from 'react'

type Context = {
  signUp: (email: string, password: string) => void
  signIn: (email: string, password: string) => void
  signOut: () => void
  getToken: () => Promise<string | null>
}

const AuthContext = createContext({} as Context)

export default AuthContext
