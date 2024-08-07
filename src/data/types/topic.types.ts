    import  {UserType}  from './user.types'; // Import the User class if exists
    import { SubjectType } from './subject.types'; // Import the Subject class if exists
    import { PostType } from './post.types'; // Import the Post class if exists
// טיפוס עבור הנושא עם פרטים מלאים
export type TopicType = {
  id?: number;
  title: string;
  wasAnswered: boolean;
  dateCreated: Date;
  dateLastActive: Date;
  userId: number;
  counselorIds?: number[] | null;
  subjectIds?: number[];
  postIds: number[];
};

export type TopicFormType = Omit<TopicType, 'id' | 'dateCreated' | 'dateLastActive'>;
