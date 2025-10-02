/* eslint-disable prettier/prettier */

import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import styled, { css } from 'styled-components'
import { useForm } from '../../hook/useForm' // Tu hook para manejo de formularios
import { InputField } from '../../components/inputField' // Tu componente de Input
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { FaRegAddressCard, FaChurch } from 'react-icons/fa' // Ícono de iglesia para el título
import { MdOutlineHome } from 'react-icons/md'
import { useCommunity } from '../../hook/useCommunity'
// import { useCommunityService } from '../../hook/useCommunityService' // Asumo tu hook de servicio

export const EditCommunityForm = ({ initialData, onSaved, onDeleted }) => {
  // 1. Definición del Estado del Formulario
  const { formData, setFormData, handleChange, validate } = useForm(
    {
      nombre: '',
      direccion: '',
      telefono: '',
      email: '',
      id_parroquia: '',
    },
    (values) => {
      const errs = {}
      if (!values.nombre)
        errs.nombre = 'El nombre de la comunidad es requerido.'
      if (!values.direccion) errs.direccion = 'La dirección es requerida.'
      if (!values.id_parroquia) errs.id_parroquia = 'La parroquia es requerida.'
      return errs
    }
  )
  const { updateCommunityS } = useCommunity()

  // 3. Efecto para Cargar Datos Iniciales
  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre ?? '',
        direccion: initialData.direccion ?? '',
        telefono: initialData.telefono ?? '',
        email: initialData.email ?? '',
        id_parroquia: initialData.id_parroquia ?? '',
      })
    }
  }, [initialData, setFormData])

  const handelSave = async (e) => {
    e.preventDefault()

    if (!validate()) return

    try {
      await updateCommunityS({ data: formData, id: initialData?.id_comunidad })

      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'Detalles de la comunidad actualizados correctamente',
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true,
        position: 'top-end',
        toast: true,
      })
      onSaved?.()
    } catch (err) {
      Swal.fire(
        'Error',
        err.message || 'No se pudo guardar la comunidad',
        'error'
      )
    }
  }

  // const handleDelete = async () => {
  //   const { isConfirmed } = await Swal.fire({
  //     title: '¿Eliminar Comunidad?',
  //     text: 'Esta acción eliminará la comunidad y es irreversible. ¿Deseas continuar?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Sí, eliminar',
  //     cancelButtonText: 'Cancelar',
  //     confirmButtonColor: '#e74c3c',
  //   })

  //   if (!isConfirmed) return

  //   try {
  //     await onDeleteCommunity(formData.id)

  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Eliminado',
  //       text: 'Comunidad eliminada correctamente',
  //       showConfirmButton: false,
  //       timer: 1800,
  //       timerProgressBar: true,
  //       position: 'top-end',
  //       toast: true,
  //     })
  //     onDeleted?.()
  //   } catch (err) {
  //     Swal.fire(
  //       'Error',
  //       err.message || 'No se pudo eliminar la comunidad',
  //       'error'
  //     )
  //   }
  // }

  // --- RENDERIZADO ---

  return (
    <FormWrapper onSubmit={handelSave}>
      <Header>
        <TitleIconContainer>
          <FaChurch size='2em' color='#3498db' />
        </TitleIconContainer>
        <HeaderContent>
          <h2>Detalles de la Comunidad</h2>
          <p>Editando la información de {formData.nombre || '...'}</p>
        </HeaderContent>
      </Header>

      <FormBody>
        {/* 1. Nombre de la Comunidad */}
        <InputField
          icon={MdOutlineHome}
          label='Nombre de la Comunidad'
          type='text'
          name='nombre'
          placeholder='Nombre de la Comunidad'
          value={formData.nombre}
          onChange={handleChange}
        />

        {/* 2. Dirección (FaRegAddressCard) */}
        <InputField
          icon={FaRegAddressCard}
          label='Dirección'
          type='text'
          name='direccion'
          placeholder='Calle Principal, 123'
          value={formData.direccion}
          onChange={handleChange}
        />

        {/* 3. Teléfono (AiOutlinePhone) */}
        <InputField
          icon={AiOutlinePhone}
          label='Teléfono'
          type='text'
          name='telefono'
          placeholder='+(502)'
          value={formData.telefono}
          onChange={handleChange}
        />

        {/* 4. Email (AiOutlineMail) */}
        <InputField
          icon={AiOutlineMail}
          label='Email'
          type='email'
          name='email'
          placeholder='correo@ejemplo.com'
          value={formData.email}
          onChange={handleChange}
        />

        {/* 5. Select de Parroquia */}
        <SelectGroup>
          <Label htmlFor='idParroquia'>Parroquia</Label>
          <Select
            id='idParroquia'
            name='idParroquia'
            value={formData.idParroquia || ''}
            onChange={handleChange}>
            {!formData.id_parroquia && (
              <option value=''>Seleccione un rol</option>
            )}

            <option value='1'>Santa Catalina de Alejandría</option>
          </Select>
        </SelectGroup>

        <QuoteFooter>
          "El Señor es mi pastor, nada me falta." - Salmo 23:1
        </QuoteFooter>

        {/* Botones de acción */}
        <Actions>
          <DangerBtn type='button'>Eliminar</DangerBtn>
          <SaveBtn type='submit'>
            <AiOutlineMail size={18} style={{ margin: '0' }} /> Guardar Cambios
          </SaveBtn>
        </Actions>
      </FormBody>
    </FormWrapper>
  )
}

// --- STYLED COMPONENTS ---

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

// Contenedor principal del formulario, que actúa como el Modal/Card
const FormWrapper = styled.form`
  background-color: ${({ theme }) => theme.bgtotal};
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  height: auto;
  overflow: hidden;
  height: 95vh;
  color: ${({ theme }) => theme.text};
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

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 25px;
  flex-grow: 1;
  overflow-y: auto;
`

const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Label = styled.label`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.gray500};
  font-weight: 500;
  margin-left: 5px;
  opacity: 0.8;
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

const QuoteFooter = styled.div`
  position: absolute;
  /* margin-top: 15px; */
  font-size: 0.8rem;
  color: ${({ theme }) => theme.gray500};
  text-align: center;
  padding: 10px 0;
  font-style: italic;
  border-top: 1px solid #f0f0f0;
  bottom: 15px;
  text-align: center;
  width: 80%;
`

const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  padding: 15px 0 0;
  /* border-top: 1px solid #eee; */
  position: absolute;
  bottom: 80px;
  width: 80%;
`

const DangerBtn = styled.button`
  ${ButtonBase}
  background: none;
  color: #e74c3c;
  border: 1px solid #e74c3c;
  width: 120px;

  &:hover {
    background: ${({ theme }) => theme.gray500};
    transform: translateY(-1px);
  }
`
const SaveBtn = styled.button`
  ${ButtonBase}
  background-color: ${({ theme }) => theme.bg4 || '#3498db'};
  color: ${({ theme }) => theme.textsecondary || '#fff'};
  border: none;
  flex-grow: 1;
  max-width: 200px;

  &:hover {
    background-color: #2980b9;
    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
    transform: translateY(-1px);
  }
`
