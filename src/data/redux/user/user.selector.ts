import {RootState} from '../store';
export const selectUsers = (state: RootState) =>state.users;

// עבור הוספת בדיקה
// import { RootState } from '../store';

// export const selectUser = (state: RootState) => {
//     console.log('selector, User state:', state.user);
//     return state.user;
// };

