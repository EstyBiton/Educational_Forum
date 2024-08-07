import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TopicType} from '../../types/topic.types';
type TopicStateType={
    topics:TopicType[];
};

const initialState: TopicStateType = {
    topics: []
};

const topicSlice=createSlice({
    name: 'topic',
    initialState,
    reducers: {
        addTopic: (state, action: PayloadAction<TopicType>)=>{
            state.topics.push(action.payload);
        },
        updateTopic: (state, action:PayloadAction<{id: number; updatedTopic:TopicType}>)=> {
            const {id, updatedTopic} = action.payload;
            const index=state.topics.findIndex(topic=>topic.id===id);
            if(index!=-1)
            {
            state.topics[index]=updatedTopic;
        }
        },
        removeTopic: (state, action:PayloadAction<number>)=> {
            const topicId=action.payload;
            state.topics=state.topics.filter(topic=> topic.id!==topicId);
        },
        setTopics: (state, action: PayloadAction<TopicType[]>)=> {
            state.topics=action.payload;
        },
    },
});
      
      export const { addTopic, updateTopic, removeTopic, setTopics} = topicSlice.actions;
      export default topicSlice.reducer;