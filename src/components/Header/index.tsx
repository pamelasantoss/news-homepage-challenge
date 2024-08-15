import { useState } from "react"
import logo from "../../assets/logo.svg"
import { Filters } from "../Filters"
import { Cross2Icon } from "@radix-ui/react-icons"

export function Header() {
  const [openFilters, setOpenFilters] = useState(false)

  const handleCloseFiltersDrawer = () => setOpenFilters(false)

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
        className={`fixed z-10 top-0 overflow-y-auto left-0 p-4 w-3/4 lg:w-1/4 h-full bg-white transition-transform duration-300 ease-in-out transform ${openFilters ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          className="absolute z-10 top-3 right-3 w-[20px] h-[20px] flex items-center justify-center bg-dark-blue hover:bg-highlight text-white"
          onClick={() => setOpenFilters(false)}
        >
          <Cross2Icon />
        </button>
        <Filters onCloseFilters={handleCloseFiltersDrawer} />
      </div>

      {openFilters && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={() => setOpenFilters(false)}
        />
      )}
    </>
  )
}
