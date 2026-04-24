/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import styled, { css } from 'styled-components'
import { useForm } from '../../hook/useForm'
import { InputField } from '../../components/inputField'
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai'
import { FaRegAddressCard, FaRegUserCircle } from 'react-icons/fa'
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

  useEffect(() => {
    getAllParishRol({ page: 1, limit: 20 })
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!validate()) return
    try {
      await updateParishS({ data: formData, id: formData.id })
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Registro actualizado correctamente',
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
    <FormWrapper onSubmit={handleSave}>
      <Header>
        <IconCircle>
          <FaRegUserCircle size='1.8em' />
        </IconCircle>
        <HeaderText>
          <h2>Editar Párroco</h2>
          <p>Editando: {formData.nombre || '...'}</p>
        </HeaderText>
      </Header>

      <FormBody>
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

        <Select
          name='idRol'
          value={formData.idRol || ''}
          onChange={handleChange}>
          {!formData.idRol && <option value=''>Seleccione un rol</option>}
          {role?.map((rol) => (
            <option key={rol.id_rol} value={rol.id_rol}>
              {rol.nombre}
            </option>
          ))}
        </Select>

        <QuoteFooter>
          “El que sirve a los demás, sirve a Dios.” – San Vicente de Paúl
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

/* ----------------- ESTILOS ------------------ */

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
  max-width: 700px;
  display: flex;
  flex-direction: column;
  min-height: max-content;
  color: ${({ theme }) => theme.text};
`

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  gap: 15px;
`

const IconCircle = styled.div`
  background-color: ${({ theme }) => theme.bg3};
  padding: 10px;
  border-radius: 50%;
  color: ${({ theme }) => theme.textprimary};
`

const HeaderText = styled.div`
  h2 {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0;
    color: ${({ theme }) => theme.textprimary};
  }
  p {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.gray500};
    margin: 0;
  }
`

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
`

const Select = styled.select`
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.fontsm};
  outline: none;

  &:focus {
    border: 2px solid ${({ theme }) => theme.bg4};
  }
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
  padding-top: 10px;
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
