export interface Post{
    _id?:string,
    body?:string,
    likes?: string[],
    createdAt:number,
    updatedAt:number
}