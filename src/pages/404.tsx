import Link from "next/link";

export default function Error() {
  return (
      <main className="flex flex-col min-h-screen">
        <section className="flex flex-col items-center justify-center w-full shrink grow mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <p className="inline-block leading-loose border-r border-black/50 text-2xl align-middle font-semibold text-black mr-5 pr-6">404</p>
            <h1 className="inline-block my-4 align-middle text-base font-normal tracking-tight text-gray-900">Страница не найдена</h1>
          </div>
          <p className="mt-6 text-base leading-7 text-gray-600">К сожалению, мы не смогли найти страницу, которую вы ищете.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
        </div>
      </section>
    </main>
  )
}
