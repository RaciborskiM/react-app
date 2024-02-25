import { ReactNode } from "react";
import { Modal as MuiModal, Box } from "@mui/material";

import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <MuiModal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="basic-modal-title"
      aria-describedby="basic-modal-description"
    >
      <Box
        className={styles.modalContent}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;
