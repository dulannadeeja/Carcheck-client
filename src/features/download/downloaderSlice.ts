import { createSlice } from "@reduxjs/toolkit";

export type DownloadTask = {
    id: string,
    fileName: string,
    downloadUrl: string,
    progress: number,
    size: number,
    downloadedSize: number,
    type: string,
}

type DownloadState = { 
    queue: DownloadTask[]
}

const initialState:DownloadState  = {
    queue : [],
}

export const downloaderSlice = createSlice({
    name: 'downloader',
    initialState: initialState,
    reducers: {
        addTask: (state, action) => {
            state.queue.push(action.payload)
        },
        removeTask: (state, action) => {
            state.queue = state.queue.filter(task => task.id !== action.payload)
        },
        updateTaskProgress: (state, action) => {
            const {id, progress} = action.payload
            state.queue = state.queue.map(task => {
                if(task.id === id) {
                    task.progress = progress
                }
                return task
            })
        },
        updateTaskDownloadedSize: (state, action) => {
            const {id, downloadedSize} = action.payload
            // convert the downloaded size to megabytes
            let downloadedSizeInMBytes = downloadedSize / 1024 / 1024
            // round the downloaded size to 2 decimal places
            downloadedSizeInMBytes = Math.round(downloadedSizeInMBytes * 100) / 100
            state.queue = state.queue.map(task => {
                if(task.id === id) {
                    task.downloadedSize = downloadedSizeInMBytes
                }
                return task
            })
        },
        updateTaskSize: (state, action) => {
            const {id, size} = action.payload
            // convert the size to megabytes
            let sizeInMBytes = size / 1024 / 1024
            // round the size to 2 decimal places
            sizeInMBytes = Math.round(sizeInMBytes * 100) / 100
            state.queue = state.queue.map(task => {
                if(task.id === id) {
                    task.size = sizeInMBytes
                }
                return task
            })
        }
    }
})

export const { addTask, removeTask, updateTaskProgress, updateTaskDownloadedSize, updateTaskSize } = downloaderSlice.actions

export default downloaderSlice.reducer