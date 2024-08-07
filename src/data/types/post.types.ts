// export type PostType= {
//   id: number;
//   topicId: number;
//   userId: number;
//   date: Date;
//   wasReported: boolean;
//   isDeleted: boolean;
//   likes: number;
//   content: string;
// }

export type PostType={
  id: number;
  date: Date;
  likes: number;
  content: string;
  isReported: boolean;
  isDeleted: boolean;
  topicId: number;
  userId?: number;
  counselorId?: number;
}
export type NewPostType = {
  content: string;
  topicId: number;
  userId?: number;
  counselorId?: number;
}
