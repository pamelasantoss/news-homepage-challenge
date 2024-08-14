import { useState } from "react"
import logo from "../../assets/logo.svg"
import { Filters } from "../Filters"

export function Header() {
  const [openFilters, setOpenFilters] = useState(false)

  return (
    <>
      <header className="w-full py-8 flex flex-col lg:flex-row justify-between items-center gap-6">
        <a href="#">
          <img src={logo} alt="" />
        </a>

        <button
          type="button"
          onClick={() => setOpenFilters(true)}
          className="text-white end-2.5 bottom-2.5 bg-dark-blue hover:bg-highlight focus:ring-1 focus:outline-none focus:ring-highlight font-medium text-sm px-4 py-2"
        >
          Customize your news page
        </button>
      </header>

      <div
        className={`fixed z-10 top-0 left-0 p-4 w-3/4 lg:w-1/4 h-full bg-white transition-transform duration-300 ease-in-out transform ${openFilters ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button onClick={() => setOpenFilters(false)}>Fechar!</button>
        <Filters />
      </div>

      {openFilters && <div className="fixed inset-0 bg-black opacity-50" />}
    </>
  )
}
