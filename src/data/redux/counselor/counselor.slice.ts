import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {CounselorType} from '../../types/counselor.types';

type CounselorStateType={
    counselors:CounselorType[];
};
const initialState:CounselorStateType ={
    counselors:[]
};
const counselorSlice=createSlice({
    name:'counselor',
    initialState,
    reducers:{
        addCounselor:(state, action: PayloadAction<CounselorType>)=>{
             state.counselors.push(action.payload);    
        },
        updateCounselor:(state, action: PayloadAction<{ id: number; updatedCounselor: CounselorType }>)=>
        {
            const{id,updatedCounselor}=action.payload;
            const index=state.counselors.findIndex(counselor=>counselor.id===id);
            if(index!=-1)
            {
                state.counselors[index]=updatedCounselor;
            }
        },
        removeCounselor:(state,action:PayloadAction<Number>)=>
        {
            const counselorId=action.payload;
            state.counselors=state.counselors.filter(counselor=>counselor.id!==counselorId)
        },
        setCounselors:(state,action:PayloadAction<CounselorType[]>)=>
        {
            state.counselors=action.payload;
        },
    }

});
export const { addCounselor, updateCounselor, removeCounselor, setCounselors } = counselorSlice.actions;
export default counselorSlice.reducer;
