/* eslint-disable prettier/prettier */
import styled from 'styled-components'
import { useUiModal } from '../../hook/useUiModal'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { ModalForm } from '../../components/ModalForm'
import { InputField } from '../../components/inputField'
import { useForm } from '../../hook/useForm'
import Swal from 'sweetalert2'
import { MapPin } from 'lucide-react'
import { FaChurch } from 'react-icons/fa'
import { useCommunity } from '../../hook/useCommunity'

export const CommunityModal = ({ onCreated }) => {
  // const { theme } = useThemeStore()
  const { closeModal } = useUiModal()
  const { createCommunityS } = useCommunity()
  const { formData, errors, handleChange, validate, resetForm } = useForm(
    {
      nombre: '',
      direccion: '',
      telefono: '',
      email: '',
      id_parroquia: '',
    },
    (values) => {
      const errs = {}
      if (!values.nombre) errs.nombre = 'El nombre es requerido'
      if (!values.direccion) errs.apellido = 'La direccion es requerido'
      if (!values.id_parroquia)
        errs.id_parroquia = 'Debe seleccionar la parroquia'
      return errs
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    closeModal()

    const res = await createCommunityS({ data: formData })

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
        showClass: {
          popup: 'animate__animated animate__shakeX',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      })
    } else {
      Swal.fire({
        title: 'Comunidad creada correctamente',
        text: 'El registro fue exitoso.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#4CAF50', // verde moderno
        background: '#f9f9f9',
        color: '#333',
        iconColor: '#4CAF50',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      })

      onCreated?.()
    }
  }

  return (
    <>
      <ModalForm onAfterClose={resetForm}>
        <FormContainer onSubmit={handleSubmit}>
          <Title>Registrar Comunidad</Title>

          <InputField
            icon={FaChurch}
            type='text'
            name='nombre'
            placeholder='Nombre'
            value={formData.nombre}
            onChange={handleChange}
          />
          <ErrorMessage $show={!!errors.nombre}>{errors.nombre}</ErrorMessage>

          <InputField
            icon={MapPin}
            type='text'
            name='direccion'
            placeholder='Dirección'
            value={formData.direccion}
            onChange={handleChange}
          />

          <InputField
            icon={AiOutlineMail}
            type='email'
            name='email'
            placeholder='Correo electrónico'
            value={formData.email}
            onChange={handleChange}
          />

          <InputField
            icon={AiOutlinePhone}
            type='text'
            name='telefono'
            placeholder='Teléfono'
            value={formData.telefono}
            onChange={handleChange}
          />

          <Select
            name='id_parroquia'
            value={formData.id_parroquia}
            onChange={handleChange}>
            <option value=''>Seleccione una parroquia</option>
            <option value='1'>Santa Catalina de Alejandría</option>
          </Select>
          <ErrorMessage $show={!!errors.id_parroquia}>
            {errors.id_parroquia}
          </ErrorMessage>

          <Actions>
            <CancelButton type='button' onClick={closeModal}>
              Cancelar
            </CancelButton>
            <SubmitButton type='submit'>Guardar</SubmitButton>
          </Actions>
        </FormContainer>
      </ModalForm>
    </>
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
  width: 400px;
  max-width: 90%;
`

const Title = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.fontlg};
  color: ${({ theme }) => theme.textprimary};
  margin-bottom: 10px;
`

const Select = styled.select`
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.fontsm};
  outline: none;
  cursor: pointer;

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
  color: #e74c3c; /* rojo moderno */
  font-size: 0.85rem;
  margin: -8px 0 5px 5px;
  min-height: 18px; /* mantiene espacio aunque no haya error */
  display: flex;
  align-items: center;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`
