import styled from 'styled-components'
import { useUiModal } from '../../hook/useUiModal'
import { ModalForm } from '../../components/ModalForm'
import { InputField } from '../../components/inputField'
import { useForm } from '../../hook/useForm'
import Swal from 'sweetalert2'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import { CiCalendarDate } from 'react-icons/ci'
import { useMinistryService } from '../../hook/useMinistryService'
import { LiaDoveSolid } from 'react-icons/lia'

export const MinistryModal = ({ onCreated }) => {
  const { closeModal } = useUiModal()
  const { createMinistryS } = useMinistryService()

  const { formData, errors, handleChange, validate, resetForm } = useForm(
    {
      nombre: '',
      descripcion: '',
      fechafundacion: '',
    },
    (values) => {
      const errs = {}
      if (!values.nombre) errs.nombre = 'El nombre del ministerio es requerido'
      return errs
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    closeModal()

    const res = await createMinistryS({ data: formData })
    if (res?.message) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: res.message || 'Ocurrió un error inesperado.',
        confirmButtonText: 'Reintentar',
        confirmButtonColor: '#d33',
        background: '#fff',
        color: '#333',
        iconColor: '#d33',
      })
    } else {
      Swal.fire({
        title: 'Ministerio registrado correctamente',
        text: 'El registro fue exitoso.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#4CAF50',
        background: '#f9f9f9',
        color: '#333',
        iconColor: '#4CAF50',
      })
      onCreated?.()
    }
  }

  return (
    <ModalForm onAfterClose={resetForm}>
      <FormContainer onSubmit={handleSubmit}>
        <Header>
          <TitleIconContainer>
            <LiaDoveSolid size='2em' color='#3498db' />
          </TitleIconContainer>
          <HeaderContent>
            <h2>Crea un nuevo Ministerio</h2>
            <p> "El Señor es mi pastor, nada me falta." - (Salmo 23:1)</p>
          </HeaderContent>
        </Header>

        <InputField
          icon={MdDriveFileRenameOutline}
          type='text'
          name='nombre'
          placeholder='Nombre del ministerio'
          value={formData.nombre}
          onChange={handleChange}
        />
        <ErrorMessage $show={!!errors.nombre}>{errors.nombre}</ErrorMessage>

        <TextArea
          name='descripcion'
          placeholder='Descripción (opcional)'
          value={formData.descripcion}
          onChange={handleChange}
        />

        <InputField
          icon={CiCalendarDate}
          type='date'
          name='fechafundacion'
          placeholder='Fecha de fundación (opcional)'
          value={formData.fechafundacion}
          onChange={handleChange}
        />

        <Actions>
          <CancelButton type='button' onClick={closeModal}>
            Cancelar
          </CancelButton>
          <SubmitButton type='submit'>Guardar</SubmitButton>
        </Actions>
      </FormContainer>
    </ModalForm>
  )
}

/* STYLES */
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 25px;
  background-color: ${({ theme }) => theme.bgtgderecha};
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 480px;
  max-width: 95%;
`

const Title = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.fontlg};
  color: ${({ theme }) => theme.textprimary};
  margin-bottom: 10px;
`

const TextArea = styled.textarea`
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.fontsm};
  resize: vertical;
  min-height: 100px;
  outline: none;

  &:focus {
    border: 2px solid ${({ theme }) => theme.bg4};
  }
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`

const CancelButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.gray300};
  color: ${({ theme }) => theme.gray600};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.gray400};
  }
`

const SubmitButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.bg4};
  color: ${({ theme }) => theme.textsecondary};
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.85rem;
  margin: -8px 0 5px 5px;
  min-height: 18px;
  display: flex;
  align-items: center;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  /* background-color: #fcfcfc; */
  gap: 15px;
`

const TitleIconContainer = styled.div`
  background-color: ${({ theme }) => theme.bg3};
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeaderContent = styled.div`
  flex-grow: 1;

  h2 {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.textprimary || '#333'};
    margin: 0;
  }

  p {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.gray500};
    margin: 0;
    font-weight: 400;
  }
`
