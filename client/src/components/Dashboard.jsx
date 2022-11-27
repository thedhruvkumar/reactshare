import React , {useContext,useEffect,useState} from 'react'
import authContext from '../context/auth/authContext';
import userContext from "../context/users/userContext";
import { Navigate } from 'react-router-dom';

export const Dashboard = () => {
    const authState = useContext(authContext);
    const UserState = useContext(userContext);
    const {fetchAllUsers,deleteUser} = authState;
    const { realUser } = UserState;
    const [user, setUser] = useState([]);
    
    useEffect(() => {
      fetchAllUsers().then((data)=>{
        setUser(data)
      })

      
    }, [])
    


  return (
    <>

    
   

   {realUser?.isAdmin && <section className="text-gray-600 body-font w-full">
  <div className="container lg:px-5 lg:py-24 p-0 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Users Dashboard</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Manage User Account</p>
    </div>
    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
      <table className="table-auto w-full text-left whitespace-no-wrap">
        <thead>
          <tr>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">id</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Name</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Username</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Email</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Action</th>
            
          </tr>
        </thead>
        <tbody>
        {user && user.map((elm)=>{
          return <tr key={elm._id}>
            <td className="px-4 py-3">{elm._id}</td>
            <td className="px-4 py-3">{elm.name}</td>
            <td className="px-4 py-3">{elm.username}</td>
            <td className="px-4 py-3 text-lg text-gray-900">{elm.email}</td>
            <td className="px-4 py-3 text-lg text-gray-900"><button className='px-4 py-2 text-white bg-red-600 font-medium rounded-md shadow-md hover:bg-red-700' onClick={()=>deleteUser(elm._id)}>Delete</button></td>
          </tr>
          })}
          
        </tbody>
      </table>
    </div>
    
  </div>
</section>}
    </>
  )
}
