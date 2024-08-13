import { useContext } from "react"
import { NewsContext } from "../../contexts/NewsContext"

export function AsideNews() {
  const { sidebarNews } = useContext(NewsContext)

  return (
    <aside className="bg-dark-blue w-full lg:w-96 p-6">
      <h2 className="text-3xl font-bold text-yellow-500 mb-1">New</h2>
      <ul>
        {sidebarNews.map(article => (
          <li
            key={article.publishedAt}
            className="py-6 border-b solid border-slate-400 last-of-type:border-0 last-of-type:pt-6"
          >
            <div className="text-white">
              <a href={article.url} target="_blank" title={article.title}>
                <h3 className="text-lg font-bold pb-1 hover:text-yellow-500">
                  {article.title}
                </h3>
                <p className="text-sm">{article.description}</p>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}
