import { NewsContext } from "./contexts/NewsContext"
import { Header } from "./components/Header"
import { NewsGallery } from "./components/NewsGallery"
import { AsideNews } from "./components/AsideNews"
import { HighlightNews } from "./components/HighlightNews"
import { useContext } from "react"
import { Loader } from "./components/Loader"

export function App() {
  const { isLoading } = useContext(NewsContext)

  return (
    <div className="max-w-7xl m-auto h-full px-4">
      <Header />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col lg:flex-row gap-6 py-6">
            <HighlightNews />
            <AsideNews />
          </div>

          <NewsGallery />
        </>
      )}
    </div>
  )
}
