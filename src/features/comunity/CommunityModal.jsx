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
      if (!values.direccion) errs.direccion = 'La dirección es requerida'
      if (!values.id_parroquia)
        errs.id_parroquia = 'Debe seleccionar una parroquia'
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
      })
    } else {
      Swal.fire({
        title: 'Comunidad creada correctamente',
        text: 'El registro fue exitoso.',
        icon: 'success',
      })
      onCreated?.()
    }
  }

  return (
    <ModalForm onAfterClose={resetForm}>
      <FormContainer onSubmit={handleSubmit}>
        {/* ENCABEZADO */}
        <Header>
          <IconBox>
            <FaChurch size='2em' color='#3498db' />
          </IconBox>
          <HeaderContent>
            <h2>Nueva Comunidad</h2>
            <p>“Donde hay fe, hay comunidad.”</p>
          </HeaderContent>
        </Header>

        {/* CAMPOS DEL FORMULARIO */}
        <InputField
          icon={FaChurch}
          type='text'
          name='nombre'
          placeholder='Nombre de la comunidad'
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
        <ErrorMessage $show={!!errors.direccion}>
          {errors.direccion}
        </ErrorMessage>

        <InputField
          icon={AiOutlineMail}
          type='email'
          name='email'
          placeholder='Correo electrónico (opcional)'
          value={formData.email}
          onChange={handleChange}
        />

        <InputField
          icon={AiOutlinePhone}
          type='text'
          name='telefono'
          placeholder='Teléfono (opcional)'
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

        {/* BOTONES */}
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

/* ──────────────── ESTILOS ──────────────── */

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 25px;
  background-color: ${({ theme }) => theme.bgtgderecha};
  border-radius: 15px;
  width: 480px;
  max-width: 95%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 5px;
`

const IconBox = styled.div`
  background: ${({ theme }) => theme.bg3};
  padding: 10px;
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
  transition: background 0.2s ease;

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
  transition:
    transform 0.2s ease,
    background 0.2s ease;

  &:hover {
    transform: scale(1.05);
    background-color: ${({ theme }) => theme.bg4hover || '#2980b9'};
  }
`

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.85rem;
  min-height: 18px;
  margin: -5px 0 5px 5px;
  transition: opacity 0.2s ease-in-out;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
`
