import React,{useContext,useEffect} from 'react'
import { Cards } from './Cards'
import { PostBox } from './PostBox'
import postContext from '../context/posts/postContext';


export const Feed = () => {

    
    const postState = useContext(postContext);
    const {getTimeline , posts} = postState;
    
    
    useEffect(() => {
      getTimeline()
    }, [posts])
    

  return (
    <div className='bg-slate-100 w-full h-auto overflow-auto flex items-center flex-col '>
        <div className='my-8'>

        <div className="w-[640px] mb-16">
        <PostBox/>
        </div>
        <div className="w-[640px] ">
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
