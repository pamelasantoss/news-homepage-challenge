import { useContext } from "react"
import { NewsContext } from "../../contexts/NewsContext"

import articleImage from "../../assets/image-top-laptops.jpg"

export function NewsGallery() {
  const { galleryNews } = useContext(NewsContext)

  return (
    <div className="py-6 grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
      {galleryNews.map(article => (
        <article key={article.publishedAt}>
          <a
            href={article.url}
            target="_blank"
            title={article.title}
            className="flex flex-col gap-4"
          >
            <div className="w-full object-contain overflow-hidden">
              <img
                src={article.urlToImage ? article.urlToImage : articleImage}
                alt=""
              />
            </div>
            <div>
              <h4 className="font-bold mb-2 hover:text-highlight">
                {article.title}
              </h4>
              <p className="text-sm text-gray-600">{article.description}</p>
            </div>
          </a>
        </article>
      ))}
    </div>
  )
}
