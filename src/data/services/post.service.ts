import axios from "../axios"
import { PostType } from "../types/post.types";
const controller = 'https://localhost:58030/api/Post';

export const getAllPosts= async ():Promise<PostType[]>=>{
const response =await axios.get(`${controller}`);
return response.data;
}

export const getPostById=async (id:number):Promise<PostType>=>{
    const response=await axios.get(`${controller}/${id}`);
    console.log('התגובה היא',response)
    return response.data;
}

export const getPostByToken = async (token: string): Promise<PostType> => {
    const response = await axios.get<PostType>(`http://localhost:5000/api/posts/delete-post/${token}`);
    return response.data;
};
export const addPost=async(post:PostType):Promise<PostType>=>{
    const response=await axios.post(`${controller}`, post);
    return response.data;
}

export const updatePost=async(post:PostType):Promise<PostType>=>{
    const {id, ...postData}=post;
    const response=await axios.put(`${controller}/${id}`, postData);
    return response.data;
}


export const deletePost = async (token: string) => {
    try {
    const response = await axios.delete(`${controller}/delete-post/${token}`);
}
    catch (error) {
        throw new Error('Failed to delete post');
    }
};


export const likePost = async (postId: number): Promise<number> => {
    const response = await axios.post(`/Post/like/${postId}`);
    return response.data; // מספר הלייקים המעודכן
}

export const reportPost = async (postId: number, reportData: { reportReason: string }): Promise<void> => {
    await axios.post(`/Post/send-report-email/${postId}`, reportData);
};

