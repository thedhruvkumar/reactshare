import React,{useContext,useEffect,useState} from 'react'
import userContext from '../context/users/userContext';
import postContext from '../context/posts/postContext';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from 'react-router-dom';

export const Cards = ({desc,userId,date,id,likes}) => {
  const UserState = useContext(userContext);
  const PostState = useContext(postContext);
    const {getUser} = UserState;
    const {deletePost , likePost , posts,setPosts,getTimeline} = PostState;
    const [user, setUser] = useState({});
    const [isLiked, setLike] = useState(false)
    const newDate = new Date(date)
    const formattedDate = `${newDate.getDate()}-${newDate.getMonth()+1}-${newDate.getFullYear()} `
    useEffect(() => {
      getUser(userId).then((data)=>{
        setUser(data)
        

      })

      getTimeline().then((data)=>{
        setPosts(data)
        
    })
      
    }, [user,posts])

    const handleDelete =async(id)=>{
      getTimeline().then((data)=>{
        setPosts(data)
    })
    await deletePost(id)
    }
    const handleLike = async(id)=>{
      getTimeline().then((data)=>{
        setPosts(data)
    })
      await likePost(id)
    }
    
  return (
    <div>

<div key={user._id} className="p-0 my-5 w-[100%]">
    
    <div className=" w-[100%] shadow-xl lg:flex">
      
      <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-[100%]">
        
        <div className="flex items-center">
          <img className="w-10 h-10 rounded-full mr-4" src="/user.png" alt="Avatar of Writer"/>
          <div className="text-sm">
            <Link to={`/user/${userId}`} className="text-gray-900 leading-none font-semibold text-base">{user.name} {user.isVerified?<VerifiedIcon style={{ color: "blue" }} />:""} <span className='text-gray-400 text-sm font-light'>@{user.username}</span> </Link>
            <p className="text-gray-600">{formattedDate}</p>
          </div>
        </div>
          <div className="mt-4 p-3">
          <p className="text-gray-700 text-base">{desc}</p>
          
          
        </div>
        <div className="px-11 flex justify-between items-center">
      <button onClick={()=>handleDelete(id)} className='px-8 py-3 w-48 rounded-md shadow-md bg-red-500 font-semibold text-white'>Delete</button>
      <button onClick={()=>handleLike(id)} className='px-8 py-3 w-48 rounded-md shadow-md bg-gray-500 font-semibold text-white'>({likes.length}){isLiked?"Liked":"Like"}</button>

        </div>
      </div>
    </div>
  </div>
    </div>
  )
}
