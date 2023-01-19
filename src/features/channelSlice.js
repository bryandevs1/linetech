import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    channelName: null,
    channelId: null,
};

export const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        setChannelInfo: (state, action) => {
            state.channelName = action.payload.channelName;
            state.channelId = action.payload.channelId;
        },
    
    },
});

export const  { setChannelInfo } = channelSlice.actions;

export const selectChannelId = (state) => state.channel.channelId;
export const selectChannelName = (state) => state.channel.channelName;

export default channelSlice.reducer;