import { FormEvent, useContext } from "react"
import logo from "../../assets/logo.svg"
import { NewsContext } from "../../contexts/NewsContext"

export function Header() {
  const { fetchNews, searchTerm, handleChangeSearchTerm } =
    useContext(NewsContext)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await fetchNews(searchTerm)
  }

  return (
    <header className="w-full py-8 flex flex-col lg:flex-row justify-between items-center gap-6">
      <a href="#">
        <img src={logo} alt="" />
      </a>

      <form
        onSubmit={handleSubmit}
        className="relative flex min-w-full lg:min-w-[500px]"
      >
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
    </header>
  )
}
