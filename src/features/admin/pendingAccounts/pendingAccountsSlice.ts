import { createSlice } from "@reduxjs/toolkit";
import { AccountStatus, UserDocument } from "../../authentication/auth";


const initialState = {
    pendingAccounts: [] as UserDocument[],
}

export const pendingAccountsSlice = createSlice({
    name: 'pendingAccounts',
    initialState,
    reducers: {
        updateStatus: (state, action) => {
            const {_id, status } = action.payload;
            // set the status of the account to approved
            state.pendingAccounts = state.pendingAccounts.map(account => {
                if (account._id === _id) {
                    account.status = status;
                }
                return account;
            });
            
        },
        setPendingAccounts: (state, action) => {
            state.pendingAccounts = action.payload;
        }
    }
});

export const { updateStatus, setPendingAccounts } = pendingAccountsSlice.actions;

export default pendingAccountsSlice.reducer;