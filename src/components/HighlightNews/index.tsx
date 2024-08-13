import { useContext } from "react"
import highlightArticleImage from "../../assets/image-web-3-desktop.jpg"
import { NewsContext } from "../../contexts/NewsContext"

export function HighlightNews() {
  const { highlightNews } = useContext(NewsContext)

  return (
    <section className="lg:flex-1 w-full">
      {highlightNews.map(article => (
        <article key={article.publishedAt} className="h-full">
          <div className="w-full max-h-80 object-contain overflow-hidden">
            <img
              src={
                article.urlToImage ? article.urlToImage : highlightArticleImage
              }
              alt=""
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-6 pt-6">
            <h1 className="text-4xl font-bold">{article.title}</h1>
            <div className="max-w-lg min-w-[45%]">
              <p className="text-sm text-gray-600">{article.description}</p>
              <a
                className="mt-6 uppercase font-bold text-sm tracking-widest bg-highlight flex justify-center items-center w-40 h-9 transition-all hover:bg-dark-blue hover:text-white"
                href={article.url}
                title={article.title}
                target="_blank"
              >
                Read more
              </a>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
