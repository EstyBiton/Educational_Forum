import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {PostType} from '../../types/post.types';

type PostStateType={ 

posts:PostType[];

};
const initialState:PostStateType={
    posts:[]
};
const postSlice = createSlice({
name:'post',
initialState,
reducers:{
    addPost:(state,action:PayloadAction<PostType>)=>
    {
        state.posts.push(action.payload);
    },
    updatePost:(state,action:PayloadAction<{ id: number; updatedPost: PostType }>)=>
    {
        const { id, updatedPost } = action.payload;
        const index = state.posts.findIndex(post => post.id === id);
        if (index !== -1) {
         state.posts[index]=updatedPost ;
        }
    },
    removePost:(state,action:PayloadAction<number>)=>
    {
       const postId=action.payload;
       state.posts=state.posts.filter(post=>post.id!==postId);
    },
    setPost:(state,action:PayloadAction<PostType[]>)=>
    {
      state.posts=action.payload;
    },
}


});
export const { addPost, updatePost, removePost, setPost } = postSlice.actions;
export default postSlice.reducer;

