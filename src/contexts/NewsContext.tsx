import axios from "axios"
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from "react"

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
  fetchNews: (query?: string) => Promise<void>
  highlightNews: NewsArticleStructure[]
  sidebarNews: NewsArticleStructure[]
  galleryNews: NewsArticleStructure[]
  searchTerm: string
  handleChangeSearchTerm: (value: string) => void
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

  const [searchTerm, setSearchTerm] = useState("")

  const fetchNews = useCallback(async (query?: string) => {
    const urlSearch = query ? "everything" : "top-headlines"
    // TODO: create a loading
    try {
      const latestNewsResponse = await axios.get(
        `https://newsapi.org/v2/${urlSearch}`,
        {
          params: {
            q: query,
            ...(!query && { sources: "bbc-news" }),
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

  const handleChangeSearchTerm = (value: string) => {
    setSearchTerm(value)
  }

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
        searchTerm,
        handleChangeSearchTerm
      }}
    >
      {children}
    </NewsContext.Provider>
  )
}
