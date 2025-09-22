/* eslint-disable prettier/prettier */
import { useState } from 'react'
import styled from 'styled-components'
import { useUiModal } from '../../hook/useUiModal'
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { MdOutlineHome } from 'react-icons/md'
import { FaRegAddressCard } from 'react-icons/fa'
import { ModalForm } from '../../components/ModalForm'
import { InputField } from '../../components/inputField'
// import { useThemeStore } from '../../hook/useThemeStore'

export const ParishModal = () => {
  // const { theme } = useThemeStore()
  const { closeModal } = useUiModal()
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    email: '',
    telefono: '',
    idRol: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    // Aquí iría el dispatch hacia Redux o el fetch/axios a tu backend
    closeModal()
  }

  const resetForm = () =>
    setFormData({
      nombre: '',
      apellido: '',
      direccion: '',
      email: '',
      telefono: '',
      idRol: '',
    })

  return (
    <ModalForm onAfterClose={resetForm}>
      <FormContainer onSubmit={handleSubmit}>
        <Title>Registrar Personal Parroquial</Title>

        <InputField
          icon={AiOutlineUser}
          type='text'
          name='nombre'
          placeholder='Nombre'
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        <InputField
          icon={FaRegAddressCard}
          type='text'
          name='apellido'
          placeholder='Apellido'
          value={formData.apellido}
          onChange={handleChange}
          required
        />

        <InputField
          icon={MdOutlineHome}
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
          name='idRol'
          value={formData.idRol}
          onChange={handleChange}
          required>
          <option value=''>Seleccione un rol</option>
          <option value='1'>Sacerdote</option>
          <option value='2'>Catequista</option>
          <option value='3'>Administrador</option>
        </Select>

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
  width: 400px;
  max-width: 90%;
`

const Title = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.fontlg};
  color: ${({ theme }) => theme.textprimary};
  margin-bottom: 10px;
`

// const InputGroup = styled.div`
//   display: flex;
//   align-items: center;
//   background-color: ${({ theme }) => theme.bg2};
//   padding: 10px 15px;
//   border-radius: 8px;
//   gap: 10px;
//   transition: border 0.2s ease;

//   &:focus-within {
//     border: 2px solid ${({ theme }) => theme.bg4};
//   }
// `

// const Icon = styled.span`
//   color: ${({ theme }) => theme.texttertiary};
//   font-size: 1.2em;
// `

// const Input = styled.input`
//   border: none;
//   outline: none;
//   background: transparent;
//   flex: 1;
//   color: ${({ theme }) => theme.text};
//   font-size: ${({ theme }) => theme.fontsm};
// `

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
