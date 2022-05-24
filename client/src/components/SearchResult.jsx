import React,{useContext} from 'react'
import { useParams } from "react-router-dom";
import userContext from "../context/users/userContext";

export const SearchResult = () => {

    const { query } = useParams();
    const UserState = useContext(userContext);
    const { getAllUsers } = UserState;

  return (
      <>
    <div>SearchResult - {query}</div>
      </>
  )
}
