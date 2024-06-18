import React, { MouseEvent, useState, useEffect, useRef } from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Modal, TextField, Box, IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

type Icon = {
  xPosition: number;
  yPosition: number;
  modalOpen: boolean;
  comment?: string;
  userName?: string;
};

function App() {
  const [icons, setIcons] = useState<Icon[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const prevIconsLength = useRef(icons.length);

  useEffect(() => {
    // check if a new icon has been added to open the comment modal
    if (icons.length > prevIconsLength.current) {
      const newIconIndex = icons.length - 1;
      showCommentModal(newIconIndex);
    }
    prevIconsLength.current = icons.length; // update the previous length
  }, [icons]);

  const handleClose = (iconIndex: number) => {
    setIcons((prevIcons) =>
      prevIcons.map((icon, index) =>
        index === iconIndex ? { ...icon, modalOpen: false } : icon
      )
    );
  };

  const showCommentModal = (iconIndex: number) => {
    setModalIsOpen(true);
    setIcons((prevIcons) =>
      prevIcons.map((icon, index) =>
        index === iconIndex ? { ...icon, modalOpen: true } : icon
      )
    );
  };

  const handleCommentChange = (commentInput: string, iconIndex: number) => {
    setModalIsOpen(true);
    setIcons((prevIcons) =>
      prevIcons.map((icon, index) =>
        index === iconIndex ? { ...icon, comment: commentInput } : icon
      )
    );
  };

  const handleClickOnScreen = (xPosition: number, yPosition: number) => {
    if (modalIsOpen) {
      setModalIsOpen(false);
      return;
    }

    const xPercent = (xPosition / window.innerWidth) * 100;
    const yPercent = (yPosition / window.innerHeight) * 100;

    const iconIndex = icons.findIndex(
      (icon) =>
        Math.abs(icon.xPosition - xPercent) <= 2 &&
        Math.abs(icon.yPosition - yPercent) <= 2
    );

    if (iconIndex !== -1) {
      showCommentModal(iconIndex);
    } else {
      const newIcon = {
        xPosition: xPercent,
        yPosition: yPercent,
        modalOpen: false,
      };
      setIcons((prevIcons) => [...prevIcons, newIcon]);
    }
  };

  return (
    <div
      onClick={(e: MouseEvent<HTMLDivElement>) =>
        handleClickOnScreen(e.clientX - 15, e.clientY - 15)
      }
      style={{ height: "100vh", width: "100vw" }}
    >
      {icons.map((icon, index) => (
        <React.Fragment key={index}>
          <Tooltip title={icon.comment || ""} placement="right">
            <IconButton
              style={{
                position: "absolute",
                top: `${icon.yPosition}%`,
                left: `${icon.xPosition}%`,
              }}
              color="inherit"
            >
              <ChatBubbleIcon />
            </IconButton>
          </Tooltip>
          <Modal
            style={{
              position: "absolute",
              top: `${icon.yPosition}%`,
              left: `${icon.xPosition + 3}%`,
            }}
            open={icon.modalOpen}
            onClose={() => handleClose(index)}
          >
            <Box
              sx={{
                background: "white",
                width: 300,
                borderRadius: 2,
                display: "flex",
                flexFlow: "column",
                padding: 2,
              }}
            >
              <TextField
                size="small"
                value={icon.comment || ""}
                onChange={(event) =>
                  handleCommentChange(event.target.value, index)
                }
                placeholder="Add a comment!"
              />
            </Box>
          </Modal>
        </React.Fragment>
      ))}
    </div>
  );
}

export default App;
