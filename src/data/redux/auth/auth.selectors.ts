import { RootState } from "../store";

export const selectAuth = (state: RootState) => state.auth;
export const selectUserName = (state: RootState) => state.auth.user?.name;
export const selectUserId = (state: RootState) => state.auth.user?.id;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

//זה לא טוב כי יש לו פה רק שלוש שדות
export const isProfessional = (state: RootState) => {
    return !!state.auth.user && 'bio' in state.auth.user;
};

// export const selectIsAuthenticated = (state: RootState) => !!state.auth.token;
