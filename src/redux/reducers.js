const initialState = {
  playlist: [],
  currentVideo: JSON.parse(localStorage.getItem("currentVideo")) || null,
  searchQuery: "",
  favlist: JSON.parse(localStorage.getItem("favlist")) || [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PLAYLIST":
      return { ...state, playlist: action.payload };
    case "MOVE_VIDEO":
      const { fromIndex, toIndex } = action.payload;
      const updatedPlaylist = [...state.favlist];
      const [movedVideo] = updatedPlaylist.splice(fromIndex, 1);
      updatedPlaylist.splice(toIndex, 0, movedVideo);
      return { ...state, favlist: updatedPlaylist };
    case "SET_CURRENT_VIDEO":
      localStorage.setItem("currentVideo", JSON.stringify(action.payload));
      return { ...state, currentVideo: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "ADD_TO_PLAYLIST":
      const updatedPlaylistAdd = [...state.favlist, action.payload];
      localStorage.setItem("favlist", JSON.stringify(updatedPlaylistAdd));
      return { ...state, favlist: updatedPlaylistAdd };

    case "REMOVE_FROM_PLAYLIST":
      const filteredPlaylist = state.favlist.filter(
        (video) => video.title !== action.payload
      );
      localStorage.setItem("favlist", JSON.stringify(filteredPlaylist));
      return { ...state, favlist: filteredPlaylist };

    default:
      return state;
  }
};

export default rootReducer;
