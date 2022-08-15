import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useContext, useState } from 'react'
import { Text, TextInput, View, Pressable } from 'react-native'
import AuthContext from '../auth-context'
import PasswordInput from '../components/PasswordInput'
import ThemeButton from '../components/ThemeButton'

type RootStackParamList = {
  'Sign In': undefined
  'Sign Up': undefined
  'Password Recovery': undefined
}

type Props = NativeStackScreenProps<RootStackParamList, 'Sign In'>

const SignInScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ elevation: 2, padding: 10 }}>
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 30,
            textAlign: 'center',
            marginTop: -50,
            marginBottom: 15,
          }}
        >
          Sign In
        </Text>
        <TextInput
          placeholder="E-mail"
          textContentType="emailAddress"
          autoComplete="email"
          keyboardType="email-address"
          style={{
            width: 300,
            padding: 10,
            margin: 10,
            borderColor: '#a4a4a4',
            borderWidth: 1,
            borderRadius: 5,
          }}
          onChangeText={setEmail}
          value={email}
        ></TextInput>
        <PasswordInput
          placeholderText="Password"
          onChangeText={setPassword}
          value={password}
        />
        <Pressable
          style={{ paddingHorizontal: 10 }}
          onPress={() => navigation.navigate('Password Recovery')}
        >
          <Text
            style={{
              textAlign: 'right',
              fontWeight: '800',
              color: 'blue',
            }}
          >
            Forgot password?
          </Text>
        </Pressable>
        <View style={{ marginTop: 15 }}>
          <ThemeButton
            bgColor="#229e72"
            textColor="white"
            text="Log in"
            onPress={() => signIn(email, password)}
          />
          <Text style={{ textAlign: 'center', color: 'gray' }}>or</Text>
          <ThemeButton
            bgColor="white"
            textColor="gray"
            text="Sign up"
            onPress={() => navigation.navigate('Sign Up')}
          />
        </View>
      </View>
    </View>
  )
}

export default SignInScreen
