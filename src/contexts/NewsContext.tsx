import axios from "axios"
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from "react"
import { filtersFormData } from "../components/Filters"

interface NewsArticleStructure {
  author: string
  content: string | null
  description: string | null
  publishedAt: string
  source: {
    id: string
    name: string
  }
  title: string
  url: string
  urlToImage: string | null
}

interface NewsContextType {
  fetchNews: (filters?: filtersFormData) => Promise<void>
  highlightNews: NewsArticleStructure[]
  sidebarNews: NewsArticleStructure[]
  galleryNews: NewsArticleStructure[]
  isLoading: boolean
}

interface NewsProviderProps {
  children: ReactNode
}

export const NewsContext = createContext({} as NewsContextType)

export function NewsProvider({ children }: NewsProviderProps) {
  const newsAPIKey = import.meta.env.VITE_NEWS_API_KEY

  const [isLoading, setIsLoading] = useState(false)
  const [latestNews, setLatestNews] = useState<NewsArticleStructure[]>([])

  const [highlightNews, setHighlightNews] = useState<NewsArticleStructure[]>([])
  const [sidebarNews, setSidebarNews] = useState<NewsArticleStructure[]>([])
  const [galleryNews, setGalleryNews] = useState<NewsArticleStructure[]>([])

  const fetchNews = useCallback(
    async (filters?: filtersFormData) => {
      setIsLoading(true)

      const urlSearch =
        filters?.keyword || filters?.language || filters?.sortby
          ? "everything"
          : "top-headlines"

      try {
        const latestNewsResponse = await axios.get(
          `https://newsapi.org/v2/${urlSearch}`,
          {
            params: {
              q: filters?.keyword,
              language: filters?.language,
              sortBy: filters?.sortby,
              ...(filters?.source && { sources: filters?.source }),
              ...(filters?.dateFrom && { from: filters?.dateFrom }),
              ...(filters?.dateTo && { to: filters?.dateTo }),
              ...(!filters?.keyword && { sources: "bbc-news" }),
              pageSize: 10,
              apiKey: newsAPIKey
            }
          }
        )

        setLatestNews(latestNewsResponse.data.articles)
        setIsLoading(false)
      } catch (error) {
        console.error("Something went wrong...", error)
      }
    },
    [setIsLoading]
  )

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  useEffect(() => {
    const firstNews = latestNews.slice(0, 1)
    const secondPartNews = latestNews.slice(1, 4)
    const lastPartNews = latestNews.slice(4)

    setHighlightNews(firstNews)
    setSidebarNews(secondPartNews)
    setGalleryNews(lastPartNews)
  }, [latestNews])

  return (
    <NewsContext.Provider
      value={{
        fetchNews,
        highlightNews,
        sidebarNews,
        galleryNews,
        isLoading
      }}
    >
      {children}
    </NewsContext.Provider>
  )
}
