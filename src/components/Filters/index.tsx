import { useContext, useEffect, useState } from "react"
import { NewsContext } from "../../contexts/NewsContext"
import * as RadioGroup from "@radix-ui/react-radio-group"
import { CheckIcon } from "@radix-ui/react-icons"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { DateRange, DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { format } from "date-fns"

interface FiltersProps {
  onCloseFilters: () => void
}

const filtersSchema = z
  .object({
    keyword: z.string(),
    language: z.string(),
    source: z.string(),
    sortby: z.enum(["relevancy", "popularity", "publishedAt"]),
    dateFrom: z.string().nullable(),
    dateTo: z.string().nullable(),
    category: z.string()
  })
  .superRefine(({ keyword, language }, ctx) => {
    if (language !== "" && keyword === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You must add a keyword to use the language option",
        path: ["keyword"]
      })
    }
  })

export type filtersFormData = z.infer<typeof filtersSchema>

export function Filters({ onCloseFilters }: FiltersProps) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<filtersFormData>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      keyword: "",
      sortby: "publishedAt",
      dateFrom: null,
      dateTo: null,
      category: ""
    }
  })

  const { fetchNews } = useContext(NewsContext)
  const [searchFromToDates, setSearchFromToDates] = useState<
    DateRange | undefined
  >()

  const onSubmit = async (data: filtersFormData) => {
    onCloseFilters()
    await fetchNews(data)
  }

  useEffect(() => {
    const dateFrom =
      searchFromToDates && searchFromToDates.from
        ? format(searchFromToDates.from, "yyyy-MM-dd")
        : null
    const dateTo =
      searchFromToDates && searchFromToDates.to
        ? format(searchFromToDates.to, "yyyy-MM-dd")
        : null

    if (dateFrom && dateTo) {
      setValue("dateFrom", dateFrom)
      setValue("dateTo", dateTo)
    }
  }, [register, searchFromToDates, setValue])

  const allLanguagesAvailable = [
    { id: "ar", label: "Arabic" },
    { id: "de", label: "German" },
    { id: "en", label: "English" },
    { id: "es", label: "Spanish" },
    { id: "fr", label: "French" },
    { id: "he", label: "Hebrew" },
    { id: "it", label: "Italian" },
    { id: "nl", label: "Dutch" },
    { id: "no", label: "Norwegian" },
    { id: "pt", label: "Portuguese" },
    { id: "ru", label: "Russian" },
    { id: "ud", label: "Urdu" },
    { id: "zh", label: "Chinese" }
  ]

  const allSortByOptios = [
    { id: "relevancy", label: "Most Relevant" },
    { id: "popularity", label: "Most Popular" },
    { id: "publishedAt", label: "Newest" }
  ]

  const allNewsCategories = [
    { id: "business", label: "Business" },
    { id: "entertainment", label: "Entertainment" },
    { id: "general", label: "General" },
    { id: "health", label: "Health" },
    { id: "science", label: "Science" },
    { id: "sports", label: "Sports" },
    { id: "technology", label: "Technology" }
  ]

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col gap-6 min-w-full"
    >
      <div>
        <h5 className="mb-3">Filters</h5>
        <input
          type="text"
          placeholder="Search for keyword..."
          className="block w-full p-3 ps-4 text-sm text-gray-600 border border-gray-300 data-[error=true]:border-red-600"
          {...register("keyword")}
          data-error={errors.keyword ? true : false}
        />
        {errors.keyword?.message && (
          <span className="text-sm text-red-600">
            {errors.keyword?.message}
          </span>
        )}
      </div>

      <div>
        <h5 className="mb-3">Choose the news language</h5>
        <select
          className="w-full p-3 ps-4 text-sm text-gray-600 border border-gray-300"
          {...register("language")}
        >
          <option value="">Choose a language</option>
          {allLanguagesAvailable.map(option => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h5 className="mb-3">Choose your favorite source</h5>
        <input
          type="text"
          placeholder="Type your favorite source. Ex.: BBC News"
          className="block w-full p-3 ps-4 text-sm text-gray-600 border border-gray-300"
          {...register("source")}
        />
      </div>

      <div>
        <h5 className="mb-3">Sort by</h5>
        <Controller
          control={control}
          name="sortby"
          render={({ field }) => (
            <RadioGroup.Root
              className="flex flex-col gap-2"
              onValueChange={field.onChange}
              value={field.value}
            >
              {allSortByOptios.map(option => (
                <div className="flex items-center" key={option.id}>
                  <RadioGroup.Item
                    id={option.id}
                    value={option.id}
                    className="bg-white w-[20px] h-[20px] border border-dark-blue focus:shadow-[0_0_0_1px] focus:shadow-dark-blue outline-none cursor-pointer"
                  >
                    <RadioGroup.Indicator className="text-dark-blue flex items-center justify-center">
                      <CheckIcon />
                    </RadioGroup.Indicator>
                  </RadioGroup.Item>
                  <label
                    className="pl-2 text-sm leading-none text-gray-600"
                    htmlFor={option.id}
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup.Root>
          )}
        />
      </div>

      <div>
        <h5 className="mb-3">Choose the date</h5>
        <DayPicker
          mode="range"
          selected={searchFromToDates}
          onSelect={setSearchFromToDates}
        />
      </div>

      <div>
        <h5 className="mb-3">Category</h5>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <RadioGroup.Root
              className="flex flex-col gap-2"
              onValueChange={field.onChange}
              value={field.value}
            >
              {allNewsCategories.map(option => (
                <div className="flex items-center" key={option.id}>
                  <RadioGroup.Item
                    id={option.id}
                    value={option.id}
                    className="bg-white w-[20px] h-[20px] border border-dark-blue focus:shadow-[0_0_0_1px] focus:shadow-dark-blue outline-none cursor-pointer"
                  >
                    <RadioGroup.Indicator className="text-dark-blue flex items-center justify-center">
                      <CheckIcon />
                    </RadioGroup.Indicator>
                  </RadioGroup.Item>
                  <label
                    className="pl-2 text-sm leading-none text-gray-600"
                    htmlFor={option.id}
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup.Root>
          )}
        />
      </div>

      <div>
        <button
          type="submit"
          className="text-white end-2.5 bottom-2.5 bg-dark-blue hover:bg-highlight focus:ring-1 focus:outline-none focus:ring-highlight font-medium text-sm px-4 py-2"
        >
          Apply filters
        </button>
      </div>
    </form>
  )
}
