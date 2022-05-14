import React,{useState} from "react";
import postContext from "./postContext";

const HOST = process.env.REACT_APP_HOST;

const PostState = (props) => {

    const [posts, setPosts] = useState([]);

  const getTimeline = async()=>{
    const url = `${HOST}/api/posts/timeline/all/`;
    const data = await fetch(url,{
        method:'GET',
        headers:{'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')}
    })

    const json = await data.json();
    return json;
  }

  const createPost = async (desc) =>{
    const url = `${HOST}/api/posts/`;
    const data = await fetch(url,{
        method:'POST',
        headers:{'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')},
        body:JSON.stringify({desc})
    })

    const json = await data.json();
    if(json.success){
        setPosts(...posts,json.savedPost)

    }
    return json;
  }

  const deletePost = async (id)=>{
    const url = `${HOST}/api/posts/${id}`;
    const data = await fetch(url,{
        method:'DELETE',
        headers:{'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')}
    })

    const json = await data.json();
    return json;
  
  }
  const likePost = async(id)=>{
    const url = `${HOST}/api/posts/${id}/like`;
    const data = await fetch(url,{
        method:'PUT',
        headers:{'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')}
        
    })

    const json = await data.json();
    return json;
  }
  return (
    <postContext.Provider value={{ getTimeline , deletePost , createPost , likePost , posts , setPosts }}>
      {props.children}
    </postContext.Provider>
  );
};

export default PostState;
