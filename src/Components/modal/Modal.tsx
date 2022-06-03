import {
    ModalBlock,
    ModalClose,
    ModalContainer,
    ModalHeader,
    ModalOverlay,
    ModalTitle,
  } from "./modal.style";
  type ModalProps= {
      close: () => void;
      title: string;
      active: boolean;
  }
  const Modal = ({ title, active, close }:ModalProps) => {
    return (
      <>
        {active && (
          <ModalBlock>
            <ModalOverlay onClick={close}></ModalOverlay>
            <ModalContainer>
              <ModalHeader>
                <ModalTitle>{title}</ModalTitle>
                <ModalClose onClick={close}>X</ModalClose>
              </ModalHeader>
            </ModalContainer>
          </ModalBlock>
        )}
      </>
    );
  };
  export default Modal;