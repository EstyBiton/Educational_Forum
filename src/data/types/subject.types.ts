import { TopicType } from './topic.types'; 

export type SubjectType= {
  id: number;
  parentId: number;
  content: string;
  topics?: TopicType[];
}
