import React, { MouseEvent, useState, useEffect } from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Modal, Button, TextField, Box, IconButton } from "@mui/material";

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

  useEffect(() => {
    console.log(icons);
  }, [icons]);

  const handleClose = (iconIndex: number) => {
    setIcons((prevIcons) =>
      prevIcons.map((icon, index) =>
        index === iconIndex ? { ...icon, modalOpen: false } : icon
      )
    );
  };

  const showComment = (iconIndex: number) => {
    setModalIsOpen(true);
    setIcons((prevIcons) =>
      prevIcons.map((icon, index) =>
        index === iconIndex ? { ...icon, modalOpen: true } : icon
      )
    );
  };

  const addComment = (iconIndex: number) => {
    console.log("add comment");
  };

  const handleClickOnScreen = (xPosition: number, yPosition: number) => {
    // if a modal is open, we should not add a new icon
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
      showComment(iconIndex);
      // if (icons[iconIndex].comment) {
      //   showComment(iconIndex);
      // }
      // addComment(iconIndex);
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
          <Modal
            style={{
              position: "absolute",
              top: `${icon.yPosition}%`,
              left: `${icon.xPosition + 5}%`,
            }}
            open={icon.modalOpen}
            onClose={() => handleClose(index)}
          >
            <Box
              sx={{
                background: "white",
                width: 300,
                height: 100,
                borderRadius: 2,
                display: "flex",
                padding: 2,
              }}
            >
              Moa Winberg: {icon.comment}
            </Box>
          </Modal>
        </React.Fragment>
      ))}
    </div>
  );
}

export default App;
