import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useContext, useState } from 'react'
import { Alert, Text, TextInput, View } from 'react-native'
import { register } from '../api'
import AuthContext from '../auth-context'
import PasswordInput from '../components/PasswordInput'
import ThemeButton from '../components/ThemeButton'

type RootStackParamList = {
  'Sign In': undefined
  'Sign Up': undefined
  'Password Recovery': undefined
}

type Props = NativeStackScreenProps<RootStackParamList, 'Sign Up'>

const SignUpScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const { signUp } = useContext(AuthContext)

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
          Sign Up
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
        <PasswordInput
          placeholderText="Confirm Password"
          onChangeText={setPasswordConfirm}
          value={passwordConfirm}
        />
        <View style={{ marginTop: 15 }}>
          <ThemeButton
            bgColor="#229e72"
            textColor="white"
            text="Sign up"
            onPress={() => signUp(email, password)}
          />
          <Text style={{ textAlign: 'center', color: 'gray' }}>or</Text>
          <ThemeButton
            bgColor="white"
            textColor="gray"
            text="Log in"
            onPress={() => navigation.navigate('Sign In')}
          />
        </View>
      </View>
    </View>
  )
}

export default SignUpScreen
