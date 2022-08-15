import { Text, View } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { getUserFeeds } from '../api'
import { useContext, useEffect, useState } from 'react'
import { ListItem } from '@rneui/themed'
import AuthContext from '../auth-context'

interface feedItem {
  user_id: number
  feed_id: number
  user_feed_name: string
  auto_expire: boolean
  preview_articles: boolean
}

const FeedsScreen = () => {
  const [feedItems, setFeedItems] = useState(Array<feedItem>)

  const { getToken } = useContext(AuthContext)

  useEffect(() => {
    const getFeeds = async () => {
      const token = await getToken()
      if (token !== null) {
        const apiFeedItems = await getUserFeeds(token)
        setFeedItems(apiFeedItems)
      }
    }
    getFeeds()
  }, [])

  const displayItems = feedItems.map((item: feedItem, idx: number) => {
    return (
      <ListItem key={idx} style={{ width: '100%', marginBottom: 6}}>
        <ListItem.Content>
          <ListItem.Title style={{ color: 'gray', fontWeight: 'bold', fontFamily: 'Roboto', fontSize: 24 }}>
            {item.user_feed_name}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron color="gray" />
      </ListItem>
    )
  })
  return (
    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', padding: 6 }}>
      {displayItems}
    </View>
  )
}

export default FeedsScreen
