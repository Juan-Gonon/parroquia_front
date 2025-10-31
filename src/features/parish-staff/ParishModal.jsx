/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { useUiModal } from '../../hook/useUiModal'
import { useParishService } from '../../hook/useParishService'
import { useForm } from '../../hook/useForm'
import { ModalForm } from '../../components/ModalForm'
import { InputField } from '../../components/inputField'
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { MdOutlineHome } from 'react-icons/md'
import { FaRegAddressCard, FaChurch } from 'react-icons/fa'

export const ParishModal = ({ onCreated }) => {
  const { closeModal } = useUiModal()
  const { role, getAllParishRol, createParishS } = useParishService()

  const { formData, errors, handleChange, validate, resetForm } = useForm(
    {
      nombre: '',
      apellido: '',
      direccion: '',
      email: '',
      telefono: '',
      idRol: '',
    },
    (values) => {
      const errs = {}
      if (!values.nombre) errs.nombre = 'El nombre es requerido'
      if (!values.apellido) errs.apellido = 'El apellido es requerido'
      if (!values.idRol) errs.idRol = 'Debe seleccionar un rol'
      return errs
    }
  )

  useEffect(() => {
    getAllParishRol({ page: 1, limit: 20 })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    closeModal()

    const res = await createParishS({ data: formData })
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
        showClass: { popup: 'animate__animated animate__shakeX' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
      })
    } else {
      Swal.fire({
        title: 'Personal parroquial creado correctamente',
        text: 'El registro fue exitoso.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#4CAF50',
        background: '#f9f9f9',
        color: '#333',
        iconColor: '#4CAF50',
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
      })
      onCreated?.()
    }
  }

  return (
    <ModalForm onAfterClose={resetForm}>
      <FormContainer onSubmit={handleSubmit}>
        {/* Encabezado */}
        <Header>
          <TitleIconContainer>
            <FaChurch size='2em' color='#3498db' />
          </TitleIconContainer>
          <HeaderContent>
            <h2>Registrar Personal Parroquial</h2>
            <p>"Servir a Dios es el mayor honor de todos."</p>
          </HeaderContent>
        </Header>

        {/* Campos */}
        <FlexRow>
          <InputField
            icon={AiOutlineUser}
            type='text'
            name='nombre'
            placeholder='Nombre'
            value={formData.nombre}
            onChange={handleChange}
          />
          <InputField
            icon={FaRegAddressCard}
            type='text'
            name='apellido'
            placeholder='Apellido'
            value={formData.apellido}
            onChange={handleChange}
          />
        </FlexRow>
        <ErrorMessage $show={!!errors.nombre || !!errors.apellido}>
          {errors.nombre || errors.apellido}
        </ErrorMessage>

        <InputField
          icon={MdOutlineHome}
          type='text'
          name='direccion'
          placeholder='Dirección'
          value={formData.direccion}
          onChange={handleChange}
        />

        <FlexRow>
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
        </FlexRow>

        <Select name='idRol' value={formData.idRol} onChange={handleChange}>
          <option value=''>Seleccione un rol</option>
          {role?.map((rol) => (
            <option key={rol.id_rol} value={rol.id_rol}>
              {rol.nombre}
            </option>
          ))}
        </Select>
        <ErrorMessage $show={!!errors.idRol}>{errors.idRol}</ErrorMessage>

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

/* ===================== ESTILOS ===================== */

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 25px;
  background-color: ${({ theme }) => theme.bgtgderecha};
  border-radius: 15px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.12);
  width: 700px;
  max-width: 95%;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
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

const FlexRow = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
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
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.gray400};
    transform: scale(1.03);
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
