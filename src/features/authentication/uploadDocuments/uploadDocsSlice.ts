import { createSlice } from "@reduxjs/toolkit"
import { BusinessVerificationDocType, IdentityVerificationDocType } from "../auth"


const initialState = {
    photoID: "",
    photoIDError: "",
    businessRegistration: "",
    businessRegistrationError: "",
    typeOfPhotoID: IdentityVerificationDocType.nationalId,
    typeOfBusinessDoc: BusinessVerificationDocType.businessRegistration
}

export const uploadDocsSlice = createSlice({
    name: 'uploadDocs',
    initialState,
    reducers: {
        setPhotoID: (state, action) => {
            state.photoID = action.payload
            state.photoIDError = ""
        },
        setBusinessRegistration: (state, action) => {
            state.businessRegistration = action.payload
            state.businessRegistrationError = ""
        },
        resetPhotoID: (state) => {
            state.photoID = ""
            state.photoIDError = ""
        },
        resetBusinessRegistration: (state) => {
            state.businessRegistration = ""
            state.businessRegistrationError = ""
        },
        setPhotoIDError: (state, action) => {
            state.photoIDError = action.payload
            state.photoID = ""
        },
        setBusinessRegistrationError: (state, action) => {
            state.businessRegistrationError = action.payload
            state.businessRegistration = ""
        },
        setPhotoIDType: (state, action) => {
            state.typeOfPhotoID = action.payload
        },
        setBusinessDocType: (state, action) => {
            state.typeOfBusinessDoc = action.payload
        }

    }
})

export const { setPhotoID, setBusinessDocType, setPhotoIDType, setPhotoIDError, setBusinessRegistrationError, setBusinessRegistration, resetPhotoID, resetBusinessRegistration } = uploadDocsSlice.actions

export default uploadDocsSlice.reducer