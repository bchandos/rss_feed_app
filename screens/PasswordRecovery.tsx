import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TextInput, View, Text } from 'react-native'
import ThemeButton from '../components/ThemeButton'

type RootStackParamList = {
  'Sign In': undefined
  'Sign Up': undefined
  'Password Recovery': undefined
}

type Props = NativeStackScreenProps<RootStackParamList, 'Password Recovery'>

const PasswordRecovery = ({ navigation }: Props) => {
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
          Recover Password
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
        ></TextInput>
        <View style={{ marginTop: 15 }}>
          <ThemeButton
            bgColor="#229e72"
            textColor="white"
            text="Submit Request"
            onPress={() => console.log('fart')}
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

export default PasswordRecovery
