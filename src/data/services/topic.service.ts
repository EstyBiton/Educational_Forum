// import axios from "axios";

// import { TopicType, TopicFormType } from "../types/topic.types";


// const controller = 'https://localhost:58030/api/Topic';

// // export const getAllTopics = async () => {
// //     try {
// //         const response = await axios.get(`${controller}`);
// //         return response.data;
// //     } catch (error) {
// //         throw new Error(`Failed to get all Topics: ${error}`);
// //     }
// // };


// export const getTopicById = async (id: string) => {
//     try {
//         const response = await axios.get(`${controller}/${id}`);
//         return response.data;
//     } catch (error) {
//         throw new Error(`Failed to get Topic by ID: ${error}`);
//     }
// };

// const getPostsByTopicId = async (topicId: number) => {
//     try {
//         const response = await axios.get(`${controller}/${topicId}/posts`);
//         return response.data;
//     } catch (error) {
//         throw new Error(`Failed to get posts for Topic ID ${topicId}: ${error}`);
//     }
// };

// // פונקציה לשליפת כל הטופיקים והפוסטים שלהם
// export const getAllTopics = async () => {
//     try {
//         const response = await axios.get(`${controller}`);
//         const topics = response.data;

//         // שימוש ב-Promise.all כדי לשלוף את כל הפוסטים במקביל
//         const topicsWithPosts = await Promise.all(
//             topics.map(async (topic: any) => {
//                 const posts = await getPostsByTopicId(topic.id);
//                 return { ...topic, posts };
//             })
//         );

//         return topicsWithPosts;
//     } catch (error) {
//         throw new Error(`Failed to get all Topics: ${error}`);
//     }
// };
// // export const addTopic = async (topic: FormData) => {
// //     try {
// //         const response = await axios.post(`${controller}`, topic);
// //         console.log(' ,בתוך ההוספה ולפני ההחזרה', response);
// //         return response.data;
// //     } catch (error) {
// //         console.log('בתוך ההוספה ונכשל', error);
        
// //         if (axios.isAxiosError(error)) {
// //             if (error.response && error.response.data && error.response.data.message) {
// //                 throw new Error(error.response.data.message);
// //             } else {
// //                 throw new Error('Failed to add Topic: ' + error.message);
// //             }
// //         } else {
// //             throw new Error('An unknown error occurred');
// //         }
// //     }
// // };

// export const addTopic = async (topic: FormData) => {
//     try {
//         const response = await axios.post(`${controller}`, topic);
//         console.log('בתוך ההוספה ולפני ההחזרה', response);
//         return response.data;
//     } catch (error) {
//         console.log('בתוך ההוספה ונכשל', error);

//         if (axios.isAxiosError(error)) {
//             if (error.response) {
//                 // הדפס את תגובת השרת במידה וקיימת
//                 console.log('Response data:', error.response.data);
//                 console.log('Response status:', error.response.status);
//                 console.log('Response headers:', error.response.headers);
//                 if (error.response.data && error.response.data.message) {
//                     throw new Error(error.response.data.message);
//                 } else {
//                     throw new Error('Failed to add Topic: ' + error.message);
//                 }
//             } else if (error.request) {
//                 // הבעיה היתה בבקשה עצמה
//                 console.log('Request data:', error.request);
//                 throw new Error('No response received: ' + error.message);
//             } else {
//                 // שגיאה שהתרחשה במהלך הגדרת הבקשה
//                 throw new Error('Request setup error: ' + error.message);
//             }
//         } else {
//             throw new Error('An unknown error occurred');
//         }
//     }
// };


// // export const getAllTopics = async ():Promise<TopicType[]>=>{
// // const response=await axios.get('/Topic');
// // return response.data;
// // }

// // export const getTopicById=async (id:number):Promise<TopicType>=>{
// // const response=await axios.get(`/Topic/${id}`);
// // return (response).data;
// // }


// // export const addTopic = async (topic: TopicFormType): Promise<TopicType> => {
// //     const topicWithDates: TopicType = {
// //         ...topic,
// //         id: 0, // יש לקבוע את ה-id בשרת
// //         dateCreated: new Date(),
// //         dateLastActive: new Date()
// //     };

// //     const response = await axios.post('/Topic', topicWithDates);
// //     return response.data;
// // };

// // export const updateTopic=async(topic:TopicType):Promise<TopicType>=>
// // {
// //     const {id, ...topicData}=topic;
// //     const response=await axios.put(`/Topic/${id}`, topicData);
// //     return response.data;
// // }

// // export const deleteTopic=async(id:number):Promise<void>=>{
// //     await axios.delete(`/Topic/${id}`)
// // }

import axios from "axios";
import { TopicType, TopicFormType } from "../types/topic.types";
import { getSession } from "../../components/auth/utils";

const controller = 'https://localhost:58030/api/Topic';

// export const getTopicById = async (id: string) => {
//     try {
//         const response = await axios.get(`${controller}/${id}`);
//         return response.data;
//     } catch (error) {
//         throw new Error(`Failed to get Topic by ID: ${error}`);
//     }
// };


// export const getTopicById = async (id: number) => {
//     try {
//         // שליפת הטופיק עם הפוסטים שלו
//         const topicResponse = await axios.get(`${controller}/${id}`);
//         const topic = topicResponse.data;

//         // שליפת הפוסטים של הטופיק
//         const postsResponse = await axios.get(`${controller}/${id}/posts`);
//         const posts = postsResponse.data;

//         // החזרת הטופיק עם רשימת הפוסטים שלו
//         return { ...topic, posts };
//     } catch (error) {
//         throw new Error(`Failed to get Topic by ID: ${error}`);
//     }
// };

//מחודש כדי שלא ייפול כשיש 0 פוסטים - זאת אומרת כשהפוסט היחיד שהיה פשוט נמחק
//למרות שהיה עדיף לעשות שכשהפוסט הפותח נמחק - כל האשכול נמחק

export const getTopicById = async (id: number) => {
    try {
        const topicResponse = await axios.get(`${controller}/${id}`);
        const topic = topicResponse.data;

        try {
            const postsResponse = await axios.get(`${controller}/${id}/posts`);
            const posts = postsResponse.data;
            return { ...topic, posts };
        } catch (postsError) {
            if (axios.isAxiosError(postsError) && postsError.response?.status === 404) {
                // אם אין פוסטים, מחזיר את הטופיק ללא פוסטים
                return { ...topic, posts: [] };
            } else {
                throw postsError;
            }
        }
    } catch (error) {
        throw new Error(`Failed to get Topic by ID: ${error}`);
    }
};

// const getPostsByTopicId = async (topicId: number) => {
//     try {
//         const response = await axios.get(`${controller}/${topicId}/posts`);
//         return response.data;
//     } catch (error) {
//         throw new Error(`Failed to get posts for Topic ID ${topicId}: ${error}`);
//     }
// };

//מחודש כדי שלא ייפול כשיש 0 פוסטים - זאת אומרת כשהפוסט היחיד שהיה פשוט נמחק
//למרות שהיה עדיף לעשות שכשהפוסט הפותח נמחק - כל האשכול נמחק
const getPostsByTopicId = async (topicId: number) => {
    try {
        const response = await axios.get(`${controller}/${topicId}/posts`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            // אם אין פוסטים לטופיק, מחזיר מערך ריק
            return [];
        } else {
            throw new Error(`Failed to get posts for Topic ID ${topicId}: ${error}`);
        }
    }
};

// פונקציה לשליפת כל הטופיקים והפוסטים שלהם
//צריך לעשות שזה ישלוף רק את הטופיק ופוסט ראשון, אחד, לכל טופיק. או בלי פוסטים כלל
export const getAllTopics = async () => {
    try {
        const response = await axios.get(`${controller}`);
        const topics = response.data;

        // שימוש ב-Promise.all כדי לשלוף את כל הפוסטים במקביל
        const topicsWithPosts = await Promise.all(
            topics.map(async (topic: any) => {
                const posts = await getPostsByTopicId(topic.id);
                return { ...topic, posts };
            })
        );

        return topicsWithPosts;
    } catch (error) {
        throw new Error(`Failed to get all Topics: ${error}`);
    }
};
export const addTopic = async (topic: FormData) => {
    try {
        const token = getSession();
        if (!token) {
            console.log('בהוספה לא מצאתי שום טוקן')
            throw new Error('No token found');
        }
        console.log('הטוקן שמצאתי בפונקציית ההוספה הוא',token)
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await axios.post(`${controller}`, topic, config);
        console.log('בתוך ההוספה ולפני ההחזרה', response);
        return response.data;
    } catch (error) {
        console.log('בתוך ההוספה ונכשל', error);

        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.log('Response data:', error.response.data);
                console.log('Response status:', error.response.status);
                console.log('Response headers:', error.response.headers);
                if (error.response.data && error.response.data.message) {
                    throw new Error(error.response.data.message);
                } else {
                    throw new Error('Failed to add Topic: ' + error.message);
                }
            } else if (error.request) {
                console.log('Request data:', error.request);
                throw new Error('No response received: ' + error.message);
            } else {
                throw new Error('Request setup error: ' + error.message);
            }
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};
