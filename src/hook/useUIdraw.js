import { useDispatch, useSelector } from 'react-redux'
import { onCloseDraw, onOpenDraw } from '../app/drawUI/drawSlice'

export const useUIdraw = () => {
  const { isDrawOpen } = useSelector((state) => state.uiDraw)
  const dispatch = useDispatch()

  const openDraw = () => {
    dispatch(onOpenDraw())
  }

  const closeDraw = () => {
    dispatch(onCloseDraw())
  }
  return {
    isDrawOpen,
    openDraw,
    closeDraw,
  }
}
