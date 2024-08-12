import highlightArticleImage from "./assets/image-web-3-desktop.jpg"

export function App() {
  return (
    <div className="max-w-7xl m-auto h-full px-4">
      <header className="bg-orange-500 w-full h-12 py-8"></header>

      <div className="flex flex-col lg:flex-row gap-6 py-6">
        <section className="lg:flex-1 w-full">
          <article className="h-full">
            <div className="w-full max-h-60 object-contain overflow-hidden">
              <img src={highlightArticleImage} alt="" />
            </div>
            <div className="flex flex-col lg:flex-row gap-6 pt-6">
              <h1 className="text-4xl font-bold">
                The Bright Future of Web 3.0?
              </h1>
              <div className="max-w-lg">
                <p className="text-sm text-gray-600">
                  We dive into the next evolution of the web that claims to put
                  the power of the platforms back into the hands of the people,
                  But is it really fulfilling its promise?
                </p>
                <a
                  className="mt-6 uppercase font-bold text-sm tracking-widest bg-highlight flex justify-center items-center w-40 h-9 transition-all hover:bg-dark-blue hover:text-white"
                  href="#"
                  target="_blank"
                >
                  Read more
                </a>
              </div>
            </div>
          </article>
        </section>

        <aside className="bg-dark-blue w-full lg:w-96 p-6">
          <h2 className="text-3xl font-bold text-yellow-500 mb-1">New</h2>
          <ul>
            <li className="py-6 border-b solid border-slate-400">
              <div className="text-white">
                <a href="#">
                  <h4 className="text-lg font-bold pb-1 hover:text-yellow-500">
                    Hydrogen VS Electric Cars
                  </h4>
                  <p className="text-sm">
                    Will hydrogen-fueled cars ever catch up to EVs?
                  </p>
                </a>
              </div>
            </li>
            <li className="py-6 border-b solid border-slate-400">
              <div className="text-white">
                <a href="#">
                  <h4 className="text-lg font-bold pb-1 hover:text-yellow-500">
                    The Downsides of AI Artistry
                  </h4>
                  <p className="text-sm">
                    What are the possible adverse effects of on-demand AI image
                    generation?
                  </p>
                </a>
              </div>
            </li>
            <li className="pt-6">
              <div className="text-white">
                <a href="#">
                  <h4 className="text-lg font-bold pb-1 hover:text-yellow-500">
                    Is VC Funding Drying Up?
                  </h4>
                  <p className="text-sm">
                    Private funding by VC firms is down 50% YOY. We take a look
                    at what that means.
                  </p>
                </a>
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
