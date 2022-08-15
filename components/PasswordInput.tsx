import { View, TextInput, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
  placeholderText: string
  onChangeText: Dispatch<SetStateAction<string>>
  value: string
}

const PasswordInput = ({ placeholderText, onChangeText, value }: Props) => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  return (
    <View>
      <TextInput
        secureTextEntry={!passwordVisible}
        placeholder={placeholderText}
        textContentType="password"
        autoComplete="password"
        style={{
          width: 300,
          padding: 10,
          margin: 10,
          borderColor: '#a4a4a4',
          borderWidth: 1,
          borderRadius: 5,
          position: 'relative',
        }}
        onChangeText={onChangeText}
        value={value}
      ></TextInput>
      <Pressable
        style={{ position: 'absolute', right: '7%', top: '33%' }}
        onPress={() => setPasswordVisible(!passwordVisible)}
      >
        <MaterialIcons
          name={passwordVisible ? 'visibility-off' : 'visibility'}
          size={24}
          color="gray"
        />
      </Pressable>
    </View>
  )
}

export default PasswordInput
