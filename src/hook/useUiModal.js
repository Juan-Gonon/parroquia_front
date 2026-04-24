import { useDispatch, useSelector } from 'react-redux'
import { onCloseModal, onOpenModal } from '../app/modalUI/modalSlice'

export const useUiModal = () => {
  const { isModelOpen } = useSelector((state) => state.uiModal)
  const dispatch = useDispatch()

  const openModal = () => {
    dispatch(onOpenModal())
  }

  const closeModal = () => {
    dispatch(onCloseModal())
  }
  return {
    isModelOpen,
    openModal,
    closeModal,
  }
}
