// //זה שלי
// // import {PayloadAction, createSlice} from '@reduxjs/toolkit';
// // import {UserType} from '../../types/user.types';

// // type UserStateType={
// //     users:UserType[];
// // };

// // const initialState: UserStateType = {
// //     users: []
// // };

// // const userSlice = createSlice({
// //     name: 'user',
// //     initialState,
// //     reducers: {
// //         addUser: (state, action: PayloadAction<UserType>)=>{
// //           console.log('Reducer, State before adding user:', state.users);
// //           state.users.push(action.payload);
// //           console.log('Reducer, State after adding user:', state.users);
// //         },
// //         // getAllUsers:

        
// //         updateUser: (state, action: PayloadAction<{ id: number; updatedUser: UserType }>) => {
// //             const { id, updatedUser } = action.payload;
// //             const index = state.users.findIndex(user => user.id === id);
// //             if (index !== -1) {
// //               state.users[index] = updatedUser;
// //             }
// //           },
// //           removeUser: (state, action: PayloadAction<number>) => {
// //             const userId = action.payload;
// //             state.users = state.users.filter(user => user.id !== userId);
// //           },
// //           setUsers: (state, action: PayloadAction<UserType[]>) => {
// //             state.users = action.payload;
// //           },
// //         },
// //       });
      
// //       export const { addUser, updateUser, removeUser, setUsers } = userSlice.actions;
// //       export default userSlice.reducer;

// //זה של אתי
// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { UserType } from "../../types/user.types";

// const usersSlice = createSlice({
//     name: 'users',
//     initialState:[],
//     reducers: {
//         setUsers: (state:UserType[], action: PayloadAction<UserType[]>) => {
//             state.length=0
//             state.push(...action.payload)
//         }
//     }
// })

// export const { setUsers } = usersSlice.actions

// export default usersSlice.reducer



//ג'יפיטי עבור רידקס
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../types/user.types';

type UserStateType = {
    users: UserType[];
};

const initialState: UserStateType = {
    users: []
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<UserType>) => {
            console.log('Reducer, State before adding user:', state.users);
            state.users.push(action.payload);
            console.log('Reducer, State after adding user:', state.users);
        },
        updateUser: (state, action: PayloadAction<{ id: number; updatedUser: UserType }>) => {
            const { id, updatedUser } = action.payload;
            const index = state.users.findIndex(user => user.id === id);
            if (index !== -1) {
                state.users[index] = updatedUser;
            }
        },
        removeUser: (state, action: PayloadAction<number>) => {
            const userId = action.payload;
            state.users = state.users.filter(user => user.id !== userId);
        },
        setUsers: (state, action: PayloadAction<UserType[]>) => {
            state.users = action.payload;
        },
    },
});

export const { addUser, updateUser, removeUser, setUsers } = userSlice.actions;
export default userSlice.reducer;
