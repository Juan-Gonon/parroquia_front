// EditParishForm.jsx
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import styled from 'styled-components'
import { useForm } from '../../hook/useForm'
import { InputField } from '../../components/inputField'
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai'
import { FaRegAddressCard } from 'react-icons/fa'
import { MdOutlineHome } from 'react-icons/md'

export const EditParishForm = ({ initialData, onSaved, onDeleted }) => {
  // inicializa con initialData vacío para no romper
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

  // cuando cambie initialData, lo cargamos en el form
  useEffect(() => {
    if (initialData) {
      // asegúrate que las keys coincidan con tu form (id, nombre, apellido, ...)
      setFormData({
        nombre: initialData.nombre ?? '',
        apellido: initialData.apellido ?? '',
        direccion: initialData.direccion ?? '',
        email: initialData.email ?? '',
        telefono: initialData.telefono ?? '',
        idRol: initialData.idRol ?? initialData.rol ?? '',
        id: initialData.id ?? null,
      })
    }
  }, [initialData, setFormData])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!validate()) return
    try {
      // llama a tu servicio de update
      // await updateParishService(formData.id, formData)
      // Simulación: si usas useParishService, llama al método correspondiente aquí
      // await updateParishService(formData.id, formData) // <-- implementa esto en tus servicios
      console.log({
        id: formData.id,
        formData,
      })
      Swal.fire('Guardado', 'Datos actualizados correctamente', 'success')
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
      confirmButtonText: 'Eliminar',
    })

    if (!isConfirmed) return

    try {
      // await deleteParishService(formData.id)
      // await deleteParishService(formData.id) // <-- implementa esto
      console.log(formData.id)
      Swal.fire('Eliminado', 'Registro eliminado', 'success')
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

      {/* si quieres mostrar rol como select, hazlo igual que tu modal de crear */}
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
