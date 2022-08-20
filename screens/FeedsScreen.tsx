import { TouchableNativeFeedback, View } from 'react-native'
import { getUserFeeds, setFeedRefresh } from '../api'
import { useContext, useEffect, useState } from 'react'
import { Avatar, ListItem } from '@rneui/themed'
import AuthContext from '../auth-context'

interface feed {
  id: number
  name: string
  url: string
  image_url: string
  has_content: boolean
}

interface feedItem {
  user_id: number
  feed_id: number
  user_feed_name: string
  auto_expire: boolean
  preview_articles: boolean
  Feed: feed
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

  const refreshFeed = async (feedId: number) => {
    const token = await getToken()
    if (token !== null) {
      const uuids = await setFeedRefresh(token, feedId)
    }
  }

  const displayItems = feedItems.map((item: feedItem, idx: number) => {
    return (
      <TouchableNativeFeedback key={idx} onPress={() => refreshFeed(item.feed_id)}>
        <ListItem style={{ width: '100%', marginBottom: 6}}>
          <Avatar rounded size={32} source={item.Feed.image_url ? { uri: item.Feed.image_url } : {}} />
          <ListItem.Content>
            <ListItem.Title style={{ color: 'gray', fontWeight: 'bold', fontFamily: 'Roboto', fontSize: 24 }}>
              {item.user_feed_name}
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color="gray" />
        </ListItem>
      </TouchableNativeFeedback>
    )
  })
  return (
    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', padding: 6 }}>
      {displayItems}
    </View>
  )
}

export default FeedsScreen
