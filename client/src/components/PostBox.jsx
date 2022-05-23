import React,{useContext,useEffect,useState} from 'react'
import postContext from '../context/posts/postContext';


export const PostBox = () => {
  const postState = useContext(postContext);
    const {createPost , posts, setPosts} = postState;
    const [data, setData] = useState("")
    const handleCreate = async()=>{
      await createPost(data).then(()=>setData(""))
    }
    const handleChange = (e) =>{
      setData(e.target.value)
    }
    
  return (
    <>
    <div className=' w-[100%] bg-white h-auto p-2 shadow-2xl'>
        <div className="w-[100%]">
          <div className="flex justify-between items-center p-5">
            <div className='w-[100%]'>
            <textarea onChange={handleChange} value={data} name="" id="" cols="10" rows="3" className='my-2 px-4 py-6 shadow-lg border-2 w-[100%] outline-none rounded-lg bg-gray-200 resize-none' placeholder="What's happening?"></textarea>
        <button className='bg-blue-500 rounded-md w-[100%] text-white px-6 py-2 shadow-lg outline-none border-0' onClick={handleCreate} >post</button>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}
