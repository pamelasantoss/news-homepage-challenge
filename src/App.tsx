export function App() {
  return (
    <div id="container" className="bg-red-900 max-w-7xl m-auto h-full">
      <header className="bg-orange-500 w-full h-12 py-8"></header>

      <div
        id="news-first-section"
        className="bg-lime-500 flex flex-col lg:flex-row gap-6 py-6"
      >
        <section
          id="left"
          className="bg-amber-900 lg:flex-1 w-full h-12"
        ></section>

        <aside className="bg-dark-blue w-full lg:w-96 p-6">
          <h2 className="text-3xl font-bold text-yellow-500 mb-1">New</h2>
          <ul>
            <li className="py-6 border-b solid border-slate-400">
              <div className="text-white">
                <h4 className="text-lg font-bold pb-1">
                  Hydrogen VS Electric Cars
                </h4>
                <p className="text-sm">
                  Will hydrogen-fueled cars ever catch up to EVs?
                </p>
              </div>
            </li>
            <li className="py-6 border-b solid border-slate-400">
              <div className="text-white">
                <h4 className="text-lg font-bold pb-1">
                  The Downsides of AI Artistry
                </h4>
                <p className="text-sm">
                  What are the possible adverse effects of on-demand AI image
                  generation?
                </p>
              </div>
            </li>
            <li className="pt-6">
              <div className="text-white">
                <h4 className="text-lg font-bold pb-1">
                  Is VC Funding Drying Up?
                </h4>
                <p className="text-sm">
                  Private funding by VC firms is down 50% YOY. We take a look at
                  what that means.
                </p>
              </div>
            </li>
          </ul>
        </aside>
      </div>

      <div
        id="news-section"
        className="bg-purple-800 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6 w-full"
      >
        <article className="bg-blue-500 h-12"></article>
        <article className="bg-blue-500 h-12"></article>
        <article className="bg-blue-500 h-12"></article>
        <article className="bg-blue-500 h-12"></article>
      </div>
    </div>
  )
}
