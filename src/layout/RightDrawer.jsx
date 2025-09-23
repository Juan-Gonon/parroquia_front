/* eslint-disable prettier/prettier */
import Modal from 'react-modal'
import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'

// accesibilidad (asegúrate que #root exista)
Modal.setAppElement('#root')

// Styles globales para las clases que react-modal añade
const DrawerGlobalStyle = createGlobalStyle`
  /* overlay */
  .drawerOverlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    opacity: 0;
    transition: opacity 200ms ease;
    z-index: 999;
    pointer-events: none;
  }
  .drawerOverlay.ReactModal__Overlay--after-open {
    opacity: 1;
    pointer-events: auto;
  }
  .drawerOverlay.ReactModal__Overlay--before-close {
    opacity: 0;
    pointer-events: none;
  }

  /* content (contiene .drawerInner que es el panel real) */
  .drawerContent {
    position: fixed;
    inset: 0; /* ocupa todo para manejar overlay y centrar el inner a la derecha */
    border: none;
    background: transparent;
    padding: 5px;
    overflow: hidden;
    z-index: 1000;
  }

  /* panel interno que desliza: al inicio está fuera (translateX(100%)) */
  .drawerContent .drawerInner {
    height: 100vh;
    width: 450px; /* ancho del panel */
    max-width: calc(100% - 15px); /* deja 15px de gap */
    margin-left: auto; /* lo pone pegado a la derecha */
    box-shadow: -18px 0 40px rgba(0,0,0,0.35);
    transform: translateX(100%);
    transition: transform 300ms cubic-bezier(.2,.9,.2,1);
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    overflow: auto;
  }

  /* estado "abierto" */
  .drawerContent.ReactModal__Content--after-open .drawerInner {
    transform: translateX(0);
  }
  .drawerContent.ReactModal__Content--before-close .drawerInner {
    transform: translateX(100%);
  }
`

const DrawerInner = styled.div`
  background: ${({ theme }) => theme.bgtgderecha || '#fff'};
  padding: 18px;
`

const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
`

export const RightDrawer = ({
  isOpen,
  onClose,
  children,
  closeTimeoutMS = 300,
}) => {
  return (
    <>
      <DrawerGlobalStyle />
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        overlayClassName='drawerOverlay'
        className='drawerContent'
        closeTimeoutMS={closeTimeoutMS}
        shouldCloseOnOverlayClick={true}>
        <div className='drawerInner'>
          <DrawerInner>
            <CloseBtn onClick={onClose} aria-label='Cerrar'>
              ✕
            </CloseBtn>
            {children}
          </DrawerInner>
        </div>
      </Modal>
    </>
  )
}
