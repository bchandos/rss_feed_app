export interface articleItem {
  user_id: number
  item_id: number
  read: boolean
  bookmark: boolean
  item: Item
}

export interface Item {
  id: number
  feed_id: number
  title: string
  link: string
  description: string
  content: string | null
  publication_date: string
  media_content: string | null
  guid: string
  feed: feed
}

export interface feed {
  id: number
  name: string
  url: string
  image_url: string
  has_content: boolean
}

export interface feedItem {
  user_id: number
  feed_id: number
  user_feed_name: string
  auto_expire: boolean
  preview_articles: boolean
  feed: feed
}
