import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Avatar, Button, Card } from '@rneui/themed'
import { useContext, useEffect, useState } from 'react'
import { Text, View, TouchableNativeFeedback, ListRenderItem, ListRenderItemInfo, FlatList } from 'react-native'
import { getFeedItems } from '../api'
import AuthContext from '../auth-context'

type RootStackParamList = {
  Home: undefined
  Article: undefined
}

interface articleItem {
  user_id: number
  item_id: number
  read: boolean
  bookmark: boolean
  item: Item
}

interface Item {
  id: number
  feed_id: number
  title: string
  link: string
  description: string
  content: string | null
  publication_date: string
  media_content: string | null
  guid: string
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen = ({ navigation }: Props) => {
  const [articles, setArticles] = useState(Array<articleItem>)

  const { getToken } = useContext(AuthContext)

  const articleNav = () => {
    navigation.navigate('Article')
  }

  useEffect(() => {
    const loadArticles = async () => {
      const token = await getToken()
      if (token !== null) {
        const apiArticles = await getFeedItems(token)
        setArticles(apiArticles)
      }
    }
    loadArticles()
  }, [])


  const renderItem: ListRenderItem<articleItem> = ({
    item,
  }: ListRenderItemInfo<articleItem>) => (
      <TouchableNativeFeedback onPress={() => articleNav()} key={item.item_id} style={{ width: '100%'}}>
         <Card>
           <Card.Title>{item.item.title}</Card.Title>
           <Card.Divider />
           <Text>{item.item.description}</Text>
         </Card>
       </TouchableNativeFeedback>
  )

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        style={{ width: '100%' }}
        data={articles}
        renderItem={renderItem}
      />
    </View>
  )
}

export default HomeScreen
