import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Avatar, Button, Card } from '@rneui/themed'
import { useContext, useEffect, useState } from 'react'
import { Text, View, TouchableNativeFeedback, ListRenderItem, ListRenderItemInfo, FlatList } from 'react-native'
import { getFeedItems } from '../api'
import AuthContext from '../auth-context'
import { articleItem } from '../interfaces'

type RootStackParamList = {
  Home: undefined
  Article: undefined
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen = ({ navigation }: Props) => {
  const [articles, setArticles] = useState(Array<articleItem>)

  const { getToken } = useContext(AuthContext)

  const articleNav = () => {
    navigation.navigate('Article')
  }

  useEffect(() => {
    // https://medium.com/doctolib/react-stop-checking-if-your-component-is-mounted-3bb2568a4934
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
           <Card.Title>
              <Avatar rounded size={32} source={item.item.feed.image_url ? { uri: item.item.feed.image_url } : {}}/>
              {item.item.title}
            </Card.Title>
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
