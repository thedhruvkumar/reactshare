import React , {useContext} from 'react'
import authContext from '../context/auth/authContext';

export const Dashboard = async () => {
    const authState = useContext(authContext);
    const {fetchAllUsers} = authState;
    const userData = await fetchAllUsers();



  return (
    <>

{userData.map((i)=> {
   return <div className="conatiner">
    { i.name}
   </div>
       })}
       
   
    </>
  )
}
