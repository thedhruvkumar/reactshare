import React,{useContext,useEffect,useState} from 'react'
import { Cards } from './Cards'
import { PostBox } from './PostBox'
import postContext from '../context/posts/postContext';


export const Feed = () => {


    const postState = useContext(postContext);
    const {getTimeline , posts, setPosts} = postState;
    
    
    useEffect(() => {
      getTimeline().then((data)=>{
        setPosts(data)
      })

      
    }, [posts])
    

  return (
    <div className='min-h-full bg-slate-100 w-[100%] flex justify-center items-center '>
        <div className='my-8'>
      <button className="px-10 py-3 bg-red-500 font-semibold text-white my-5" onClick={()=> localStorage.removeItem("auth-token")}>Logout</button>

        <div className="w-[640px] mb-16">
        <PostBox/>
        </div>
        <div className="w-[640px] ">
        {posts.map((item)=>{
            return <div key={item._id}>
            <Cards id={item._id} desc={item.desc} userId={item.userId} likes={item.likes} date={item.createdAt}/>
            </div>
            
        })}
        </div>
        
        </div>
    </div>
  )
}
