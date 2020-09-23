let list = {
    SongListDetails: [],
};

const getSongListDetails = (state = list, { type, payload }) => {
    state = JSON.parse(JSON.stringify(state));
    switch (type) {
        case GET_BANNER: {
            // state.SongListDetails = payload;
            return state;
        }
        default: {
            return state;
        }
    }
};
export default getSongListDetails;
