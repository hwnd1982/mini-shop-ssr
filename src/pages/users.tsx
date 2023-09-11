import Link from "next/link";
import { MainContainer } from "../components/MainContainer/MainContainer";
import { redirect } from 'next/navigation'
import { useEffect } from "react";

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: [Object]
  },
}

const Users = ({users}: {users: []}) => {

  return (
    <MainContainer keywords={'users'}>
      <h1>Список пользователей</h1>
      <ul>
        {users.map(({id, name}) => 
          <li key={id}>
            <Link href={`/users/${id}`}>
              {name}
            </Link>
          </li>)}
      </ul>
    </MainContainer>
  )
}

export default Users;

export const getStaticProps = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: [] = await response.json() || [];
    
    if (response.status !== 200) {
      return {
        redirect: {
          destination: '/',
        }
      }
    }

    return {
      props: {users}
    }
  } catch (err) {
    return {
      redirect: {
        destination: '/',
      }
    }
  }
}
