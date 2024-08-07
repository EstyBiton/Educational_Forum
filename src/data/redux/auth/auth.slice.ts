import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FullUserType, UserType } from "../../types/user.types";
import { selectIsAuthenticated } from "./auth.selectors";
import { removeSession } from "../../../components/auth/utils";
import { CounselorType } from "../../types/counselor.types";

type AuthStateType = {
    [x: string]: any;
    user: UserType |CounselorType| null,
    isAuthenticated: boolean,
    isInitialized: boolean

}

const initialState: AuthStateType = {
    user: null,
    isAuthenticated: false,
    isInitialized: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state: AuthStateType, action: PayloadAction<UserType>) => {
            console.log('לפני השינוי', state.user?.name)
            state.user = action.payload;
            state.isAuthenticated = true;
            console.log('האם אומתי?', state.isAuthenticated)
            state.username = action.payload.name; // הוספת שם המשתמש ל-State
            console.log('שמרתי את היוזר בתוך פרוסת האבטחה!')
            console.log('אחרי השינוי', state.user?.name)
        },
        setCounselor: (state: AuthStateType, action: PayloadAction<CounselorType>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },

        setInitialized: (state: AuthStateType) => {
            state.isInitialized = true
        },

        //התנתקות
        logout: (state: AuthStateType) => {
            state.user = null;
            state.isAuthenticated = false;
            state.username="";
            removeSession();
        },
    }
})

export const { setUser,setCounselor, setInitialized, logout } = authSlice.actions

export default authSlice.reducer