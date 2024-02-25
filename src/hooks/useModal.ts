import { useState } from "react";

export const useModal = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const openModal = () => setModalIsVisible(true);
  const closeModal = () => setModalIsVisible(false);

  return [modalIsVisible, openModal, closeModal] as const;
};
