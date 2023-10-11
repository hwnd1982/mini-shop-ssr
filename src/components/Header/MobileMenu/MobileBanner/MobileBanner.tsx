import { API_URL } from "@/store/const";
import { ClickHandler } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export default function MobileBanner({productId, imgSrc, title, onClick}: {
  productId: string
  imgSrc: string
  title: string
  onClick: ClickHandler
}) {
  return (
    <div className="grid gap-x-4">
      <div className="group relative text-sm">
        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
          <Image
            width={300}
            height={150}
            src={`${API_URL}/${imgSrc}`}
            alt={title.toString()}
            className="object-cover object-center" 
            priority={true}
          />
        </div>
        <Link href={`/products/${productId}`} onClick={onClick} className="mt-3 block font-medium text-gray-900">
          <span className="absolute inset-0 z-10" aria-hidden="true" />
            {title}
        </Link>
        </div>
    </div>
  )
}