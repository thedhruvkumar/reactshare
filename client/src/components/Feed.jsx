import React,{useContext,useEffect} from 'react'
import { Cards } from './Cards'
import { PostBox } from './PostBox'
import postContext from '../context/posts/postContext';


export const Feed = () => {

    
    const postState = useContext(postContext);
    const {getTimeline , posts} = postState;
    
    
    useEffect(() => {
      if(localStorage.getItem("auth-token")){
        getTimeline()
      }
    }, [])
    

  return (
    <div className='bg-slate-100 w-full h-100% overflow-auto flex items-center flex-col lg:p-0 p-2'>
        <div className='my-8'>

        <div className="lg:w-[640px] w-full mb-16">
        <PostBox/>
        </div>
        <div className="lg:w-[640px] w-full ">
        {!posts && <div>No posts to show</div>}
        {posts && posts.map((item)=>{
            return <div key={item._id}>
            <Cards id={item._id} desc={item.desc} userId={item.userId} likes={item.likes} date={item.createdAt}/>
            </div>
            
        })}
        </div>
        
        </div>
    </div>
  )
}
