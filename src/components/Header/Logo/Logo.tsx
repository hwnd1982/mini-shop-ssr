import Image from 'next/image'
import  logoURL from './logo.svg'

export default function Logo() {
  return (
    <div className="ml-4 flex lg:ml-0">
      <a href="/">
        <span className="sr-only">Your Company</span>
        <Image src={logoURL} alt='Логотои магазина: Inspired'/>
      </a>
    </div>
  )
}