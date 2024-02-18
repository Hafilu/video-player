import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import mediaJSON from './data/media';
import { setPlaylist } from './redux/actions';
import Navbar from './components/Navbar';
import VideoPlayer from './components/VideoPlayer';
import Home from './pages/Home';
import Playlist from './pages/Playlist';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPlaylist(mediaJSON.categories[0].videos));
  }, [dispatch]);

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className=" gap-4 p-4">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/playlist" exact element={<Playlist/>} />
            <Route path="/video/:id" element={<VideoPlayer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
