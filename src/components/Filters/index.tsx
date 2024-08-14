import { FormEvent, useContext } from "react"
import { NewsContext } from "../../contexts/NewsContext"

export function Filters() {
  const { fetchNews, searchTerm, handleChangeSearchTerm } =
    useContext(NewsContext)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await fetchNews(searchTerm)
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex min-w-full">
      <input
        type="text"
        placeholder="Search for a news"
        className="block w-full p-4 ps-6 text-sm text-gray-600 border border-gray-300 bg-gray-50"
        value={searchTerm}
        onChange={e => handleChangeSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="text-white absolute end-2.5 bottom-2.5 bg-dark-blue hover:bg-highlight focus:ring-1 focus:outline-none focus:ring-highlight font-medium text-sm px-4 py-2"
      >
        Search
      </button>
    </form>
  )
}
