import { promises } from "dns";
import { SubjectType } from "../types/subject.types";
import axios from "../axios";
import exp from "constants";

export const  getAllSubjects=async ():Promise<SubjectType[]>=>{
    const response=await axios.get(`/Subject`);
    return response.data;
}
export const getSubjectById=async(id:number):Promise<SubjectType>=>{
const response=await axios.get(`/Subject/${id}`);
return response.data;
}
export const addSubject=async(subject:SubjectType):Promise<SubjectType>=>{

    const response=await axios.post('/Subject',subject);
    return response.data;

}
export const updateSubject=async(subject:SubjectType):Promise<SubjectType>=>{
    const {id, ...subjectData}=subject;
    const response=await axios.put(`/Subject/${id}`,subjectData);
    return response.data;
}
export const deleteSubject=async(id:number):Promise<void>=>{
    await axios.delete(`/Subject/${id}`);
}