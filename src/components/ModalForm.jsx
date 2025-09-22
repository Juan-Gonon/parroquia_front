/* eslint-disable prettier/prettier */
import Modal from 'react-modal'
import { useUiModal } from '../hook/useUiModal'

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // desvanecido
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '12px',
    padding: 0, // 👈 importante, el padding lo maneja tu form
    border: 'none', // 👈 quitar borde blanco
    background: 'transparent', // 👈 eliminar fondo blanco
  },
}

Modal.setAppElement('#root')

export const ModalForm = ({ children, onAfterClose }) => {
  const { isModelOpen, closeModal } = useUiModal()
  // let subtitle

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00'
  // }

  return (
    <Modal
      isOpen={isModelOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Example Modal'
      closeTimeoutMS={200}
      onAfterClose={onAfterClose}>
      {children}
    </Modal>
  )
}
