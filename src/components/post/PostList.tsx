import React from 'react';
import { List } from '@mui/material';
import PostItem from './PostItem';
import { PostType } from '../../data/types/post.types';

interface PostListProps {
    posts: PostType[];
    topicUserId: number;
    usersMap: { [key: string]: string };
    likedPosts: { [key: number]: { liked: boolean; disliked: boolean } };
    handleLikePost: (postId: number) => void;
    handleReportClick: (postId: number) => void;
    handleContactClick: (counselorId: number) => void;
    formatDate: (date: Date) => string;
}

const PostList: React.FC<PostListProps> = ({
    posts,
    topicUserId,
    usersMap,
    likedPosts,
    handleLikePost,
    handleReportClick,
    handleContactClick,
    formatDate,
}) => {
    return (
        <List>
            {posts && posts.map((post: PostType) => (
                <PostItem
                    key={post.id}
                    post={post}
                    topicUserId={topicUserId}
                    usersMap={usersMap}
                    likedPosts={likedPosts}
                    handleLikePost={handleLikePost}
                    handleReportClick={handleReportClick}
                    handleContactClick={handleContactClick}
                    formatDate={formatDate}
                />
            ))}
        </List>
    );
};

export default PostList;
