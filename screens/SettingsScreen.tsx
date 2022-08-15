import { useContext } from 'react'
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  Pressable,
  Text,
  View,
} from 'react-native'
import AuthContext from '../auth-context'
import { ListItem } from '@rneui/themed'

interface menuItem {
  title: string
  key: number
  onPress: () => void
}

const fakeFunc = () => {
  console.log('Fart knocker.')
}

const renderItem: ListRenderItem<menuItem> = ({
  item,
}: ListRenderItemInfo<menuItem>) => (
  <ListItem
    key={item.key}
    style={{ width: '100%', marginBottom: 6 }}
    onPress={item.onPress}
  >
    <ListItem.Content>
      <ListItem.Title
        style={{
          color: 'gray',
          fontWeight: 'bold',
          fontFamily: 'Roboto',
          fontSize: 24,
        }}
      >
        {item.title}
      </ListItem.Title>
    </ListItem.Content>
  </ListItem>
)

const SettingsScreen = () => {
  const { signOut } = useContext(AuthContext)
  const menuItems = [
    {
      title: 'Sign out',
      key: 1,
      onPress: signOut,
    },
    {
      title: 'Change password',
      key: 2,
      onPress: fakeFunc,
    },
  ]
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FlatList
        style={{ width: '100%' }}
        data={menuItems}
        renderItem={renderItem}
      />
    </View>
  )
}

export default SettingsScreen
