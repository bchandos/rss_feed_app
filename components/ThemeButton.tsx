import { Pressable, View, Text, Platform } from 'react-native'

interface Props {
  bgColor: string
  text: string
  textColor: string
  onPress: () => void
}

const ThemeButton = ({ bgColor, text, textColor, onPress }: Props) => {
  return (
    <View style={{ flexDirection: 'row', padding: 10 }}>
      <Pressable
        style={{
          padding: 10,
          flex: 1,
          borderRadius: 3,
          backgroundColor: bgColor,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
            },
            android: {
              elevation: 2,
            },
          }),
        }}
        onPress={onPress}
      >
        <Text
          style={{
            textAlign: 'center',
            color: textColor,
            fontWeight: '800',
            ...Platform.select({
              android: {
                textTransform: 'uppercase',
              },
            }),
          }}
        >
          {text}
        </Text>
      </Pressable>
    </View>
  )
}

export default ThemeButton
