/* eslint-disable no-unused-vars */

import Swal from 'sweetalert2'
import styled, { css } from 'styled-components'
import { FaUserFriends } from 'react-icons/fa'
import { useGroupMembers } from '../../hook/useGroupMembers'

export const EditMemberForm = ({ initialData, onDeleted }) => {
  const { deleteMemberS } = useGroupMembers()

  // --- eliminar miembro del grupo
  const handleDelete = async () => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Eliminar miembro del grupo?',
      text: `Esta acción eliminará a ${initialData?.nombre || 'este miembro'} del grupo "${initialData?.nombre_grupo}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e74c3c',
    })

    if (!isConfirmed) return

    try {
      await deleteMemberS({ id: initialData?.id_miembrogrupo })
      Swal.fire({
        icon: 'success',
        title: 'Miembro eliminado',
        text: 'El miembro ha sido eliminado correctamente.',
        showConfirmButton: false,
        timer: 1800,
        toast: true,
        position: 'top-end',
      })
      onDeleted?.()
    } catch (err) {
      Swal.fire('Error', 'No se pudo eliminar el miembro', 'error')
    }
  }

  // --- render
  return (
    <FormWrapper>
      <Header>
        <TitleIconContainer>
          <FaUserFriends size='2em' color='#3498db' />
        </TitleIconContainer>
        <HeaderContent>
          <h2>Eliminar miembro del grupo</h2>
          <p>
            Miembro: {initialData?.nombre} {initialData?.apellido}
          </p>
        </HeaderContent>
      </Header>

      <FormBody>
        <InfoRow>
          <Label>Nombre:</Label>
          <Value>{`${initialData?.nombre} ${initialData?.apellido}`} </Value>
        </InfoRow>
        <InfoRow>
          <Label>Grupo:</Label>
          <Value>{initialData?.nombre_grupo || '—'}</Value>
        </InfoRow>

        <InfoRow>
          <Label>Rol dentro del grupo:</Label>
          <Value>{initialData?.rol_ministerio || '—'}</Value>
        </InfoRow>

        <InfoRow>
          <Label>Fecha de inicio:</Label>
          <Value>
            {initialData?.fecha_ini_msia
              ? new Date(initialData.fecha_ini_msia).toISOString().split('T')[0]
              : '—'}
          </Value>
        </InfoRow>

        <InfoRow>
          <Label>Activo:</Label>
          <Value>{initialData?.activo ? 'Sí' : 'No'}</Value>
        </InfoRow>

        <QuoteFooter>"Servir en comunidad es servir a Dios mismo."</QuoteFooter>

        <Actions>
          <DangerBtn type='button' onClick={handleDelete}>
            Eliminar Miembro
          </DangerBtn>
        </Actions>
      </FormBody>
    </FormWrapper>
  )
}

/* ---- estilos ---- */
const ButtonBase = css`
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.95rem;
  line-height: 1;
`

const FormWrapper = styled.div`
  background-color: ${({ theme }) => theme.bgtotal};
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  height: 93vh;
  color: ${({ theme }) => theme.text};
`

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  gap: 15px;
`

const TitleIconContainer = styled.div`
  background-color: ${({ theme }) => theme.bg3};
  padding: 8px;
  border-radius: 8px;
`

const HeaderContent = styled.div`
  flex-grow: 1;
  h2 {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0;
    color: ${({ theme }) => theme.textprimary};
  }
  p {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.gray500};
    margin: 0;
  }
`

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  background-color: ${({ theme }) => theme.bg2};
  padding: 10px 14px;
  border-radius: 8px;
`

const Label = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.textprimary};
`

const Value = styled.span`
  color: ${({ theme }) => theme.gray600};
`

const QuoteFooter = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.gray500};
  text-align: center;
  padding: 10px 0;
  font-style: italic;
  border-top: 1px solid #f0f0f0;
`

const Actions = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`

const DangerBtn = styled.button`
  ${ButtonBase}
  background: none;
  color: #e74c3c;
  border: 1px solid #e74c3c;

  &:hover {
    background: rgba(231, 76, 60, 0.1);
  }
`
