import { articleItem, feedItem } from '../interfaces'

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
