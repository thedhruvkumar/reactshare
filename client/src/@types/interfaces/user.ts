export interface User{
    _id:string,
    username:string,
    email:string,
    profilePicture?:string,
    coverPicture?:string,
    follower:string[],
    following:string[],
    isAdmin:boolean,
    isVerified:boolean,
    createdAt:bigint,
    updatedAt:bigint
    
}