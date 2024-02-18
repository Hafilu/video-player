import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDrag, useDrop } from "react-dnd";
import { moveVideo, setCurrentVideo, addToPlaylist, removeFromPlaylist } from "../redux/actions";
import { Card, CardContent, Typography, CardMedia, IconButton, Tooltip } from "@mui/material";
import { AddCircleOutline, PlaylistAddCheck } from "@mui/icons-material";
import { ItemTypes } from "../constants";
import "./Video.css";
 

const Video = ({ video, index ,componentType}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const favlist = useSelector((state) => state.favlist);
    const isAdded = favlist.some((item) => item?.title === video?.title);

  
    const handleVideoClick = () => {
      dispatch(setCurrentVideo(video));
      navigate(`/video/${index}`);
    };
  
    const handleAddToPlaylist = (event) => {
      event.stopPropagation();
  
      if (isAdded) {
        dispatch(removeFromPlaylist(video.title));
      } else {
        dispatch(addToPlaylist(video));
      }
    };
  
    const [, drag] = useDrag({
      type: ItemTypes.VIDEO,
      item: { index,componentType },
    });
  
    const [, drop] = useDrop({
        accept: ItemTypes.VIDEO,
        hover: (draggedItem) => {
          if (
            draggedItem.index !== index &&
            draggedItem.componentType === "playlist" &&
            componentType === "playlist"
          ) {
            dispatch(moveVideo(draggedItem.index, index));
            draggedItem.index = index;
          }
        },
      });
      
    return (
      <Card
        onClick={handleVideoClick}
        ref={(node) => drag(drop(node))}
        className="video-card"
      >
        {video.thumb && (
          <CardMedia
            component="img"
            alt={video.title}
            className="video-media"
            image={video.thumb}
          />
        )}
        <CardContent className="video-content">
        <Typography variant="h6">{video.title}</Typography>
        <Tooltip
          title={isAdded ? "Remove from Playlist" : "Add to Playlist"}
          arrow
          placement="bottom"
        >
          <IconButton onClick={handleAddToPlaylist} color="text-stone-900">
            {isAdded ? <PlaylistAddCheck /> : <AddCircleOutline />}
          </IconButton>
        </Tooltip>
      </CardContent>
      </Card>
    );
  };
  
  export default Video;
  