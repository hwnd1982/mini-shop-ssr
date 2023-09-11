import { MainContainer } from "../../components/MainContainer/MainContainer";

export default ({user}) => {  
  console.log(user);
  return (
    <MainContainer keywords={user.name}>
      <h1>Пользователь с id: {user.id}</h1>
      <p>Имя пользователя: {user.name}</p>
    </MainContainer>
  )
}

export const getServerSideProps = async ({params}) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
  const user = await response.json();

  return {
    props: {user}
  }
}