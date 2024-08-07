// import axios from "axios";
// import { FullCounselorType } from "../types/counselor.types";

// export const getCounselorById=async(id:number):Promise<FullCounselorType>=>
// {
//     const response=await axios.get(`/Counselor${id}`);
//     return response.data;
// }
// export const addCounselor=async (counselor:FullCounselorType):Promise<FullCounselorType>=>{
//     const response=await axios.post('Counselor',counselor);
//     return response.data;

// }
// export const updateCounselor=async(counselor:FullCounselorType):Promise<FullCounselorType>=>
// {
//     const {id, ...counselorData}=counselor;
//     const response=await axios.put(`Counselor${id}`,counselorData);
//     return response.data;
// }
// export const deleteCounselor=async (id:number):Promise<void>=>
// {
//     await axios.delete(`Counselor${id}`);
// }

import axios from "axios";
//אז למה צריך את האקסיוס שעשיתי אני
const controller = 'https://localhost:58030/api/Counselor';

export const getAllCounselors = async () => {
    try {
        const response = await axios.get(`${controller}`);
        console.log(`response: ${response}`)
        return response.data;
    } catch (error) {
        throw new Error(`Failed to get all counselors: ${error}`);
    }
};


export const getCounselorById = async (id: number) => {
    try {
        const response = await axios.get(`${controller}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to get counselor by ID: ${error}`);
    }
};

export const addCounselor = async (counselor: FormData) => {
    try {
        const response = await axios.post(`${controller}/SignUp`, counselor);
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
