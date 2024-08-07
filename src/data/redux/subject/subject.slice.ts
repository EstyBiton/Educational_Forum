import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {SubjectType} from '../../types/subject.types';

type SubjectStateType={ 

subjects:SubjectType[];

};
const initialState:SubjectStateType={
    subjects:[]
};
const subjectSlice = createSlice({
name:'subject',
initialState,
reducers:{
    addSubject:(state,action:PayloadAction<SubjectType>)=>
    {
        state.subjects.push(action.payload);
    },
    updateSubject:(state,action:PayloadAction<{ id: number; updatedSubject: SubjectType }>)=>
    {
        const { id, updatedSubject } = action.payload;
        const index = state.subjects.findIndex(subject => subject.id === id);
        if (index !== -1) {
         state.subjects[index]=updatedSubject ;
        }
    },
    removeSubject:(state,action:PayloadAction<number>)=>
    {
       const subjectId=action.payload;
       state.subjects=state.subjects.filter(subject=>subject.id!==subjectId);
    },
    setSubject:(state,action:PayloadAction<SubjectType[]>)=>
    {
      state.subjects=action.payload;
    },
}


});
export const { addSubject, updateSubject, removeSubject, setSubject } = subjectSlice.actions;
export default subjectSlice.reducer;

