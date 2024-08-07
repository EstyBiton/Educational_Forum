// redux-persist בלי
// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./user/user.slice";
// import counselorReducer from "./counselor/counselor.slice";
// import subjectReducer from "./subject/subject.slice";
// import topicReducer from "./topic/topic.slice";
// import postReducer from "./post/post.slice";
// import authReducer from "./auth/auth.slice"
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'; // שימוש בגרסה לפיתוח בלבד
// import { TypedUseSelectorHook, useSelector } from "react-redux";


// export const store=configureStore({
//     reducer:{
//         //אתי הפכה לרבים
//         // user: userReducer,
//         users: userReducer,
//         counselor: counselorReducer,
//         subject:subjectReducer,
//         topic:topicReducer,
//         post:postReducer,
//         auth: authReducer,
//     },
//     devTools: process.env.NODE_ENV !== 'production', // הפעלת Redux DevTools רק במצב פיתוח

// })

// //הייתה פה רק השורה הזאת
// // export type RootState = ReturnType<typeof store.getState>

// export type RootState = ReturnType<typeof store.getState>

// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// //מגיפיטי בשביל ההתנתקות
// export type AppDispatch = typeof store.dispatch;



// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';
// import { Provider, TypedUseSelectorHook, useSelector } from 'react-redux';
// import userReducer from "./user/user.slice";
// import counselorReducer from "./counselor/counselor.slice";
// import subjectReducer from "./subject/subject.slice";
// import topicReducer from "./topic/topic.slice";
// import postReducer from "./post/post.slice";
// import authReducer from "./auth/auth.slice";

// const rootReducer = combineReducers({
//     users: userReducer,
//     counselor: counselorReducer,
//     subject: subjectReducer,
//     topic: topicReducer,
//     post: postReducer,
//     auth: authReducer,
// });

// const persistConfig = {
//     key: 'root',
//     storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//     reducer: persistedReducer,
//     devTools: process.env.NODE_ENV !== 'production', // הפעלת Redux DevTools רק במצב פיתוח
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;

// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export type AppDispatch = typeof store.dispatch;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user.slice";
import counselorReducer from "./counselor/counselor.slice";
import subjectReducer from "./subject/subject.slice";
import topicReducer from "./topic/topic.slice";
import postReducer from "./post/post.slice";
import authReducer from "./auth/auth.slice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { thunk } from 'redux-thunk';  // ייבוא thunk לא בצורה הנכונה

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  users: userReducer,
  counselor: counselorReducer,
  subject: subjectReducer,
  topic: topicReducer,
  post: postReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }).concat(thunk),  // הוספת thunk למערך ה-middleware
  devTools: process.env.NODE_ENV !== 'production', // הפעלת Redux DevTools רק במצב פיתוח
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;