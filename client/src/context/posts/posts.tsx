import React, { useState , createContext, useContext } from "react";
import { useJwt } from "react-jwt";

export const postContext = createContext<unknown | undefined>(undefined);

// const HOST =  `https://determined-pleat-worm.cyclic.app`;
const HOST =  import.meta.env.VITE_APP_SERVER_HOST || `http://localhost:3001`;

const PostState =  ({children}:{children:React.ReactNode}) => {
  const [posts, setPosts] = useState([]);
  const { decodedToken } = useJwt(
    `${localStorage.getItem("auth-token")}`
  );
  const currUser = decodedToken?.user;
  const getTimeline = async () => {
    
    const url = `${HOST}/api/posts/timeline/all/`;
    const data = await fetch(url, {
      method: "GET",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "auth-token":   `${`${localStorage.getItem("auth-token")}`}`,
      },
    });

    const json = await data.json();
    if (json.length!==0) {
      setPosts(json);
    }
    return json;
  };

  const createPost = async (desc:string) => {
    const url = `${HOST}/api/posts/`;
    const data = await fetch(url, {
      method: "POST",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "auth-token":   `${`${localStorage.getItem("auth-token")}`}`,
      },
      body: JSON.stringify({ desc }),
    });

    const json = await data.json();
    const np =posts.concat(json)
    
    setPosts(np.sort((a:any,b:any)=>b.createdAt - a.createdAt));
    return json;
  };

  const deletePost = async (id:string) => {
    const url = `${HOST}/api/posts/${id}`;
    const data = await fetch(url, {
      mode: 'cors',
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${`${localStorage.getItem("auth-token")}`}`,
      },
    });

    const json = await data.json();
    setPosts(posts.filter((f) => f._id !== id));
    return json;
  };
  const likePost = async (id:string) => {
    
    const url = `${HOST}/api/posts/${id}/like`;
    const data = await fetch(url, {
      mode: 'cors',
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${`${localStorage.getItem("auth-token")}`}`,
      },
    });
    const json = await data.json();
    const newPosts = JSON.parse(JSON.stringify(posts));
    for (let index = 0; index < newPosts.length; index++) {
      const element = newPosts[index];
      if(element._id === id && !element.likes.includes(currUser.id)) 
      { 
        await element.likes.push(currUser.id)
      }else
      {
        if(element._id===id && element.likes.includes(currUser.id)){
          await element.likes.splice(index,currUser.id)
        }
      }
    }
    setPosts(newPosts);
    
    return json;
  }

  const getUserPost = async(id:string)=>{
       
    const url = `${HOST}/api/posts/posts/${id}`;
    const data = await fetch(url, {
      mode: 'cors',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("auth-token")}`,
      },
    });
    const json = await data.json();
    return json;
  }

  return (
    <postContext.Provider
      value={{ getTimeline, deletePost, createPost, likePost, posts, setPosts , getUserPost }}
    >
      {children}
    </postContext.Provider>
  );
};

export default PostState;


export function usePostContext(){
  const auth = useContext(postContext);
  if(auth===undefined) throw new Error("PostContext Undefined");

  return auth;
}