import { TopicType } from './topic.types'; 
import { SubjectType } from './subject.types';
import { UserType } from './user.types'; 

export type CounselorType= {
  id?:number;
  name:string;
  password:string;
  email:string;
  bio: string;
  yearsOfExperience: number;
  educationalInstitutions: string;
  workHistory: string;
  academicDegrees: string;
  answeredTopicsIds?: number[];
  areasOfSpecializationIds?: number[];
};
