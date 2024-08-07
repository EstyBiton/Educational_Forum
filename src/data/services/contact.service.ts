import axios from 'axios';
const controller = 'https://localhost:58030/api/Contact';


//לעשות טייפ מיוחד לשני אלו, עדיין אין לי
export interface ContactRequest {
    userName: string;
    userEmail: string;
    message: string;
}

export interface ContactCounselorRequest extends ContactRequest {
    counselorName: string;
    counselorEmail: string;
}


export const contactCounselor = async (request: ContactCounselorRequest): Promise<void> => {
    try {
        await axios.post(`${controller}/counselor`, request);
        console.log('Email sent to counselor.');
    } catch (error) {
        handleError(error);
    }
};



export const contactGeneral = async (request: ContactRequest): Promise<void> => {
    try {
        await axios.post(`${controller}/general`, request);
        console.log('Email sent to general contact.');
    } catch (error) {
        handleError(error);
    }
};

const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
            if (error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Failed to send email: ' + error.message);
            }
        } else if (error.request) {
            console.error('Request data:', error.request);
            throw new Error('No response received: ' + error.message);
        } else {
            throw new Error('Request setup error: ' + error.message);
        }
    } else {
        throw new Error('An unknown error occurred');
    }
};