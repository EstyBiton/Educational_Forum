//זה שלי
// import { FullUserType } from "../types/user.types"
// import axios from './axios'
// export const getUserById = async (id: number): Promise<FullUserType>=>{
//     const response = await axios.get(`/User/${id}`)
//     return response.data
// }

import axios from "axios";

// export const getAllUsers = async (): Promise<FullUserType[]> => {
//     // לקריאת get & delete אין body
//     const response = await axios.get(`/User`);
//     const users = await response.data;
//     return users;
// }

// // export const addUser = async (newUser: FullUserType):Promise<number>=>{
// //         console.log("WENT TO ADD USER, BEFORE RETURN")
// // const response = await axios.post(`/User`, newUser);   
// // const user = await response.data
// // return user.id
// // }

// export const addUser = async (newUser: FullUserType): Promise<number> => {
//     console.log("WENT TO ADD USER, BEFORE RETURN");
//     await axios.post(`/User`, newUser);   
//     const userId = newUser.id;
//     if (typeof userId === 'number') {
//         return userId;
//     } else {
//         throw new Error('User ID is undefined');
//     }
// };



// export const updateUser = async (user: FullUserType): Promise<FullUserType> => {
//     const { id, ...userData } = user;
//     const response =await axios.put(`/User/${id}`, userData);
//     return response.data

// };


// export const deleteUser = async (id: number):Promise<void> => {
//     await axios.delete(`/const controller = 'User'
// export const getUsers = async () => {
//     const response = await axios.get('/User')
//     return response.data
// };

// //זה של אתי
// // api/user.ts

// // import axios from "../utils/axios";

// const controller = 'User';
const controller = 'https://localhost:58030/api/User';

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${controller}/GetAll`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to get all users: ${error}`);
    }
};


export const getUserById = async (id: number) => {
    try {
        const response = await axios.get(`${controller}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to get user by ID: ${error}`);
    }
};

export const addUser = async (user: FormData) => {
    try {
        const response = await axios.post(`${controller}/SignUp`, user);
        console.log(' ,בתוך ההוספה ולפני ההחזרה', response);
        return response.data;
    } catch (error) {
        console.log('בתוך ההוספה ונכשל', error);
        
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Failed to add user: ' + error.message);
            }
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};
