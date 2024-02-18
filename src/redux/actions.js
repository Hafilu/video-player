export const setPlaylist = (playlist) => ({
  type: "SET_PLAYLIST",
  payload: playlist,
});

export const moveVideo = (fromIndex, toIndex) => ({
  type: "MOVE_VIDEO",
  payload: { fromIndex, toIndex },
});

export const setCurrentVideo = (video) => ({
  type: "SET_CURRENT_VIDEO",
  payload: video,
});

export const setSearchQuery = (query) => ({
  type: "SET_SEARCH_QUERY",
  payload: query,
});

 
export const addToPlaylist = (video) => ({
    type: 'ADD_TO_PLAYLIST',
    payload: video,
  });
  

  export const removeFromPlaylist = (videoId) => ({
    type: 'REMOVE_FROM_PLAYLIST',
    payload: videoId,
  });