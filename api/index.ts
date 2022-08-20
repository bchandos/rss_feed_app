const BASE_URL = 'http://192.168.12.151:8000'

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: email,
      password: password,
    }),
  })
  if (response.ok) {
    const jsonResponse = await response.json()
    return jsonResponse.access_token
  }
  return ''
}

export const register = async (
  email: string,
  password: string
): Promise<string> => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: email,
      password: password,
    }),
  })

  if (response.ok) {
    const jsonResponse = await response.json()
    return jsonResponse.access_token
  }
  return ''
}

export const authenticateToken = async (token: string): Promise<boolean> => {
  const response = await fetch(`${BASE_URL}/auth/check-token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
  })
  if (response.ok) {
    return true
  }
  return false
}

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

export const getUserFeeds = async (token: string): Promise<Array<feedItem>> => {
  const response = await fetch(`${BASE_URL}/user_feeds`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (response.ok) {
    return await response.json()
  }
  return []
}

export const setFeedRefresh = async (
  token: string,
  feedId?: number
): Promise<Array<string>> => {
  const feedIdObj = feedId ? { body: JSON.stringify({ feed_id: feedId }) } : {}
  const response = await fetch(`${BASE_URL}/user_feeds/update`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    ...feedIdObj,
  })
  if (response.ok) {
    return await response.json()
  }
  return []
}

export const getFeedItems = async (
  token: string,
  feedId?: number
): Promise<Array<articleItem>> => {
  const response = await fetch(`${BASE_URL}/user_items`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (response.ok) {
    return await response.json()
  }
  return []
}
