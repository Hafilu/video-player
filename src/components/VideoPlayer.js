import React from "react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { Card, CardContent, Typography } from "@mui/material";
import "./VideoPlayer.css";
const VideoPlayer = () => {
  const currentVideo = useSelector((state) => state.currentVideo);

  return (
    <div className="pt-20">
      <Card variant="outlined">
        {currentVideo ? (
          <ReactPlayer
            url={currentVideo.sources}
            controls
            width="100%"
            playing={true}
          />
        ) : (
          <div className="video-placeholder ">
            <h3 className="m-8">Select a video to start playing</h3>
          </div>
        )}
        <CardContent>
          {currentVideo ? (
            <>
              <Typography variant="h5">{currentVideo.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {currentVideo.description}
              </Typography>
            </>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoPlayer;
