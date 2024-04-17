import { createSlice } from "@reduxjs/toolkit";


interface PendingAccount {
    firstName: string;
    lastName: string;
    accountType: string;
    email: string;
    status: string;
    note: string;
}

const initialState = {
    pendingAccounts: [] as PendingAccount[],
}

export const pendingAccountsSlice = createSlice({
    name: 'pendingAccounts',
    initialState,
    reducers: {
        updatePendingAccount: (state, action) => {
            const { email, status, note } = action.payload;
            const account = state.pendingAccounts.find(account => account.email === email);
            if (account) {
                account.status = status;
                account.note = note;
            }
        },
        loadPendingAccounts: (state, action) => {
            state.pendingAccounts = action.payload;
        }
    }
});

export const { updatePendingAccount, loadPendingAccounts } = pendingAccountsSlice.actions;

export default pendingAccountsSlice.reducer;