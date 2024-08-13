import { NewsProvider } from "./contexts/NewsContext"
import { Header } from "./components/Header"
import { NewsGallery } from "./components/NewsGallery"
import { AsideNews } from "./components/AsideNews"
import { HighlightNews } from "./components/HighlightNews"

export function App() {
  return (
    <NewsProvider>
      <div className="max-w-7xl m-auto h-full px-4">
        <Header />

        <div className="flex flex-col lg:flex-row gap-6 py-6">
          <HighlightNews />
          <AsideNews />
        </div>

        <NewsGallery />
      </div>
    </NewsProvider>
  )
}
