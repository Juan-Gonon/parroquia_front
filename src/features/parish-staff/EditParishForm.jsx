/* eslint-disable react-hooks/exhaustive-deps */
// EditParishForm.jsx
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import styled from 'styled-components'
import { useForm } from '../../hook/useForm'
import { InputField } from '../../components/inputField'
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai'
import { FaRegAddressCard } from 'react-icons/fa'
import { MdOutlineHome } from 'react-icons/md'
import { useParishService } from '../../hook/useParishService'

export const EditParishForm = ({ initialData, onSaved, onDeleted }) => {
  const { formData, setFormData, handleChange, validate } = useForm(
    {
      nombre: '',
      apellido: '',
      direccion: '',
      email: '',
      telefono: '',
      idRol: '',
      id: null,
    },
    (values) => {
      const errs = {}
      if (!values.nombre) errs.nombre = 'El nombre es requerido'
      if (!values.apellido) errs.apellido = 'El apellido es requerido'
      return errs
    }
  )
  const { role, getAllParishRol, onDeleteParish, updateParishS } =
    useParishService()

  useEffect(() => {
    if (initialData) {
      const foundRole = role.find((r) => r.nombre === initialData.rol)
      setFormData({
        nombre: initialData.nombre ?? '',
        apellido: initialData.apellido ?? '',
        direccion: initialData.direccion ?? '',
        email: initialData.email ?? '',
        telefono: initialData.telefono ?? '',
        idRol: foundRole?.id_rol ?? '',
        id: initialData.id ?? null,
      })
    }
  }, [initialData, setFormData, role])

  // console.log(formData)

  useEffect(() => {
    getAllParishRol({ page: 1, limit: 20 })
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!validate()) return
    try {
      await updateParishS({ data: formData, id: formData.id })
      // Swal.fire('Guardado', 'Datos actualizados correctamente', 'success'
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Registro actualizados correctamente',
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true,
        position: 'top-end',
        toast: true,
      })
      onSaved?.()
    } catch (err) {
      Swal.fire('Error', err.message || 'No se pudo guardar', 'error')
    }
  }

  const handleDelete = async () => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Eliminar?',
      text: 'Esta acción es irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e74c3c',
    })

    if (!isConfirmed) return

    try {
      await onDeleteParish(formData.id)

      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'Registro eliminado correctamente',
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true,
        position: 'top-end',
        toast: true,
      })

      onDeleted?.()
    } catch (err) {
      Swal.fire('Error', err.message || 'No se pudo eliminar', 'error')
    }
  }

  return (
    <FormContainer onSubmit={handleSave}>
      <Title>Editar Personal</Title>

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

      <Select name='idRol' value={formData.idRol || ''} onChange={handleChange}>
        {!formData.idRol && <option value=''>Seleccione un rol</option>}

        {role?.map((rol) => (
          <option key={rol.id_rol} value={rol.id_rol}>
            {rol.nombre}
          </option>
        ))}
      </Select>

      <Actions>
        <DangerBtn type='button' onClick={handleDelete}>
          Eliminar
        </DangerBtn>
        <SaveBtn type='submit'>Guardar</SaveBtn>
      </Actions>
    </FormContainer>
  )
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 6px;
`

const Title = styled.h3`
  margin: 6px 0 8px;
  color: ${({ theme }) => theme.textprimary};
`

const Actions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 12px;
`

const DangerBtn = styled.button`
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
`
const SaveBtn = styled.button`
  background: ${({ theme }) => theme.bg4};
  color: ${({ theme }) => theme.textsecondary};
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
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
