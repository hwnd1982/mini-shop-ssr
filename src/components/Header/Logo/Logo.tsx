import Image from 'next/image'
import Link from 'next/link'
import  logoURL from './logo.svg'

export default function Logo() {
  return (
    <div className="ml-4 flex lg:ml-0">
      <Link href="/">
        <span className="sr-only">Your Company</span>
        <Image src={logoURL} alt='Логотои магазина: Inspired'/>
      </Link>
    </div>
  )
}