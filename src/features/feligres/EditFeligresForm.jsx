/* eslint-disable no-unused-vars */

import { useEffect } from 'react'
import Swal from 'sweetalert2'
import styled, { css } from 'styled-components'
import { useFeligres } from '../../hook/useFeligres'
import { useForm } from '../../hook/useForm'
import { FaPhone, FaUser } from 'react-icons/fa'
import { InputField } from '../../components/inputField'
import { MdEmail } from 'react-icons/md'

export const EditFeligresForm = ({ initialData, onSaved, onDeleted }) => {
  const { formData, setFormData, handleChange, validate } = useForm(
    {
      nombre: '',
      apellido: '',
      telefono: '',
      email: '',
    },
    (values) => {
      const errs = {}
      if (!values.nombre) errs.nombre = 'El nombre es obligatorio'
      if (!values.apellido) errs.apellido = 'El apellido es obligatorio'
      return errs
    }
  )

  const { updateFeligres, deleteFeligres } = useFeligres()

  // --- cargar datos iniciales
  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre ?? '',
        apellido: initialData.apellido ?? '',
        telefono: initialData.telefono ?? '',
        email: initialData.email ?? '',
      })
    }
  }, [initialData, setFormData])

  // --- guardar cambios
  const handleSave = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      await updateFeligres({
        id: initialData.id_feligres,
        data: formData,
      })
      Swal.fire({
        icon: 'success',
        title: 'Feligrés actualizado',
        text: 'Los cambios se guardaron correctamente',
        showConfirmButton: false,
        timer: 1800,
        toast: true,
        position: 'top-end',
      })
      onSaved?.()
    } catch (err) {
      Swal.fire('Error', 'No se pudo actualizar el feligrés', 'error')
    }
  }

  // --- eliminar
  const handleDelete = async () => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Eliminar feligrés?',
      text: 'Esta acción eliminará el registro permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e74c3c',
    })

    if (!isConfirmed) return

    try {
      await deleteFeligres({ id: initialData.id_feligres })
      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'Feligrés eliminado correctamente',
        showConfirmButton: false,
        timer: 1800,
        toast: true,
        position: 'top-end',
      })
      onDeleted?.()
    } catch (err) {
      Swal.fire('Error', 'No se pudo eliminar el feligrés', 'error')
    }
  }

  // --- render
  return (
    <FormWrapper onSubmit={handleSave}>
      <Header>
        <TitleIconContainer>
          <FaUser size='2em' color='#3498db' />
        </TitleIconContainer>
        <HeaderContent>
          <h2>Editar Feligrés</h2>
          <p>Editando: {initialData?.nombre || '...'}</p>
        </HeaderContent>
      </Header>

      <FormBody>
        <InputField
          icon={FaUser}
          type='text'
          name='nombre'
          placeholder='Nombre'
          value={formData.nombre}
          onChange={handleChange}
        />

        <InputField
          icon={FaUser}
          type='text'
          name='apellido'
          placeholder='Apellido'
          value={formData.apellido}
          onChange={handleChange}
        />

        <InputField
          icon={FaPhone}
          type='text'
          name='telefono'
          placeholder='Teléfono'
          value={formData.telefono}
          onChange={handleChange}
        />

        <InputField
          icon={MdEmail}
          type='email'
          name='email'
          placeholder='Correo electrónico'
          value={formData.email}
          onChange={handleChange}
        />

        <QuoteFooter>
          "Cada persona es una parte valiosa de nuestra comunidad."
        </QuoteFooter>

        <Actions>
          <DangerBtn type='button' onClick={handleDelete}>
            Eliminar
          </DangerBtn>
          <SaveBtn type='submit'>Guardar Cambios</SaveBtn>
        </Actions>
      </FormBody>
    </FormWrapper>
  )
}

/* ---- estilos similares a EditLiderForm ---- */

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

const FormWrapper = styled.form`
  background-color: ${({ theme }) => theme.bgtotal};
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  height: 95vh;
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
  gap: 18px;
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
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
  gap: 12px;
  justify-content: space-around;
  align-items: center;
`

const DangerBtn = styled.button`
  ${ButtonBase}
  background: none;
  color: #e74c3c;
  border: 1px solid #e74c3c;

  &:hover {
    background: ${({ theme }) => theme.gray500};
  }
`

const SaveBtn = styled.button`
  ${ButtonBase}
  background-color: ${({ theme }) => theme.bg4};
  color: ${({ theme }) => theme.textsecondary};
  border: none;

  &:hover {
    background-color: #2980b9;
  }
`
