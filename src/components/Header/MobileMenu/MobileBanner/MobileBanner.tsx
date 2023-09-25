import { API_URL } from "@/store/const";
import { DefaultComponentsProps } from "@/types/types";
import Image from "next/image";

export default function MobileBanner({productId, imgSrc, title}: DefaultComponentsProps) {
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
        <a href={`/products/${productId}`} className="mt-3 block font-medium text-gray-900">
          <span className="absolute inset-0 z-10" aria-hidden="true" />
            {title}
        </a>
        </div>
    </div>
  )
}