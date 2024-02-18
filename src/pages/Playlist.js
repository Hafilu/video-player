import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
 
import './Playlist.css';
import { setCurrentVideo } from '../redux/actions';
import Video from '../components/Video';

const Playlist = () => {
  const dispatch = useDispatch();
  const favlist = useSelector((state) => state.favlist);
  const searchQuery = useSelector((state) => state.searchQuery);

  useEffect(() => {
    dispatch(setCurrentVideo(null));
  }, [dispatch]);

  const filteredPlaylist = favlist.filter((video) => {
    const searchString = searchQuery.toLowerCase();
    return (
      video.title.toLowerCase().includes(searchString) 
    );
  });

  return (
    <div className='playlist'>
      {filteredPlaylist.length > 0 ? (
        <Grid container className='playlist-container'>
          {filteredPlaylist.map((video, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3} className='playlist-item'>
              <Video video={video} index={index} componentType="playlist" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" style={{ margin: '20px' }}>
          No Results Found
        </Typography>
      )}
    </div>
  );
};

export default Playlist;
