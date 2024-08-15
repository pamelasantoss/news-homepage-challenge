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
}

interface NewsProviderProps {
  children: ReactNode
}

export const NewsContext = createContext({} as NewsContextType)

export function NewsProvider({ children }: NewsProviderProps) {
  const [latestNews, setLatestNews] = useState<NewsArticleStructure[]>([])

  const [highlightNews, setHighlightNews] = useState<NewsArticleStructure[]>([])
  const [sidebarNews, setSidebarNews] = useState<NewsArticleStructure[]>([])
  const [galleryNews, setGalleryNews] = useState<NewsArticleStructure[]>([])

  const fetchNews = useCallback(async (filters?: filtersFormData) => {
    const urlSearch =
      filters?.keyword || filters?.sortby ? "everything" : "top-headlines"
    // TODO: create a loading
    try {
      const latestNewsResponse = await axios.get(
        `https://newsapi.org/v2/${urlSearch}`,
        {
          params: {
            q: filters?.keyword,
            sortBy: filters?.sortby,
            ...(!filters?.keyword && { sources: "bbc-news" }),
            pageSize: 10,
            apiKey: "bf2221da190b474c9a534058cb683759" // TODO: put this in an env file
          }
        }
      )

      setLatestNews(latestNewsResponse.data.articles)
    } catch (error) {
      console.error("Something went wrong...", error)
    }
  }, [])

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
        galleryNews
      }}
    >
      {children}
    </NewsContext.Provider>
  )
}
