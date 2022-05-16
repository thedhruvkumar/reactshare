import React,{useContext,useEffect,useState} from 'react'
import { Cards } from './Cards'
import { PostBox } from './PostBox'
import postContext from '../context/posts/postContext';
import {useNavigate} from "react-router-dom";

export const Feed = () => {

    const navigate = useNavigate();
    const postState = useContext(postContext);
    const {getTimeline , posts, setPosts} = postState;
    
    
    useEffect(() => {
      getTimeline().then((data)=>{
        setPosts(data)
      })

      
    }, [posts])
    

  return (
    <div className='bg-slate-100 w-full h-screen overflow-auto flex items-center flex-col '>
        <div className='my-8'>

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
