import { useContext } from "react"
import { NewsContext } from "../../contexts/NewsContext"
import * as Checkbox from "@radix-ui/react-checkbox"
import * as RadioGroup from "@radix-ui/react-radio-group"
import { CheckIcon } from "@radix-ui/react-icons"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

interface FiltersProps {
  onCloseFilters: () => void
}

const filtersSchema = z
  .object({
    keyword: z.string(),
    language: z.string(),
    sortby: z.enum(["relevancy", "popularity", "publishedAt"]),
    categories: z.array(z.string())
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
    getValues,
    setValue,
    control,
    formState: { errors }
  } = useForm<filtersFormData>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      keyword: "",
      sortby: "publishedAt",
      categories: []
    }
  })

  const { fetchNews } = useContext(NewsContext)

  const onSubmit = async (data: filtersFormData) => {
    console.log(data)
    onCloseFilters()
    await fetchNews(data)
  }

  const handleCategorySelection = (categoryId: string) => {
    const currentCategoriesSelected = getValues("categories")

    if (currentCategoriesSelected.includes(categoryId)) {
      setValue(
        "categories",
        currentCategoriesSelected.filter(id => id !== categoryId)
      )
    } else {
      setValue("categories", [...currentCategoriesSelected, categoryId])
    }
  }

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
          <option value="0">Choose a language</option>
          {allLanguagesAvailable.map(option => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
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
        <h5 className="mb-3">Category</h5>
        {allNewsCategories.map(category => (
          <div className="flex items-center mb-2" key={category.id}>
            <Checkbox.Root
              className="flex h-[20px] w-[20px] appearance-none items-center justify-center bg-white border border-dark-blue focus:shadow-[0_0_0_1px] focus:shadow-dark-blue outline-none"
              id={category.id}
              value={category.id}
              {...register("categories")}
              onCheckedChange={() => handleCategorySelection(category.id)}
            >
              <Checkbox.Indicator className="text-dark-blue">
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label
              className="pl-2 text-sm leading-none text-gray-600"
              htmlFor={category.id}
            >
              {category.label}
            </label>
          </div>
        ))}
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
