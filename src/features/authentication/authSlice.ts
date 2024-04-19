import { createSlice } from '@reduxjs/toolkit';

type User = {
    accessToken: string,
    refreshToken: string,
    email: string,
    accountType: string,
    status: string,
    firstName: string,
    lastName: string,
    avatar: string,
}

type InitialState = {
    user:User | null 
    noticeOfAccount: string | null
}

const initialState:InitialState = {
    noticeOfAccount: null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            if (action.payload.staySignedIn) localStorage.setItem('user', JSON.stringify(action.payload.user));
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.user = null;
            state.noticeOfAccount = null;
            localStorage.removeItem('user');
        }
    }
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;