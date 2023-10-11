import Link from "next/link";
import { useRouter } from "next/router";

export default function Empty() {
  const {asPath} = useRouter();
  const [baseUrl] = asPath.split('?');

  return (
    <div className="flex flex-col items-center justify-center w-full shrink grow mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="mt-6 text-base leading-7 text-gray-600">К сожалению, по вашему запросу ничего не найдено.</p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4">
        <Link
          href="/"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Вернутся на главную
        </Link>
        <Link
          href={baseUrl || '/'}
          className="inline-flex items-center justify-center rounded-md border border-black py-2 px-5 text-center text-sm font-semibold text-black transition hover:bg-black hover:text-white"
        >
        Сбросить фильтры
        </Link>
      </div>
    </div>
  )
}