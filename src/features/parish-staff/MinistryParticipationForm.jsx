/* eslint-disable prettier/prettier */
import { useEffect } from 'react'
import { useForm } from '../../hook/useForm'
import Swal from 'sweetalert2'
import styled from 'styled-components'
import { InputField } from '../../components/inputField'
import { useMinistryService } from '../../hook/useMinistryService'
import { useMinistryPart } from '../../hook/useMinistryPart'
import { CiCalendarDate } from 'react-icons/ci'

export const MinistryParticipationForm = ({ parishStaffId, onSaved }) => {
  const { formData, handleChange, validate } = useForm(
    {
      idPersonal: parishStaffId | null,
      idMinisterio: '',
      idRol: '',
      fechaIni: '',
    },
    (values) => {
      const errs = {}
      if (!values.idPersonal)
        errs.idPersonal = 'El id del personal es requerido'
      if (!values.idMinisterio)
        errs.idMinisterio = 'El id del ministerio es requerido'
      if (!values.idRol)
        errs.idRol = 'El id del Rol dentro del ministerio es requerido'
      if (!values.fechaIni) errs.fechaIni = 'La fecha es requerido'
      return errs
    }
  )
  const { ministry, role, getAllMinistryS, getAllRoleDMinistryS } =
    useMinistryService()
  const { onCreateMinistyParS } = useMinistryPart()

  useEffect(() => {
    return async () => {
      await getAllMinistryS({ page: 1, limit: 20 })
      await getAllRoleDMinistryS({ page: 1, limit: 20 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      await onCreateMinistyParS({ data: formData })

      onSaved()

      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Participacion asignada correctamente',
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true,
        position: 'top-end',
        toast: true,
      })
    } catch (err) {
      Swal.fire('Error', err.message || 'No se pudo guardar', 'error')
    }
  }

  return (
    <FormContainer onSubmit={handleSave}>
      <Title>¿Quires participar en un Ministerio?</Title>

      <Select
        name='idMinisterio'
        value={formData.idMinisterio || ''}
        onChange={handleChange}>
        {!formData.idMinisterio && (
          <option value=''>Seleccione un misterio</option>
        )}
        {ministry?.map((minis) => (
          <option key={minis.id_ministerio} value={minis.id_ministerio}>
            {minis.nombre}
          </option>
        ))}
      </Select>

      <Select name='idRol' value={formData.idRol || ''} onChange={handleChange}>
        {!formData.idRol && <option value=''>Seleccione un rol</option>}
        {role?.map((rol) => (
          <option
            key={rol.id_roldentroministerio}
            value={rol.id_roldentroministerio}>
            {rol.nombre}
          </option>
        ))}
      </Select>

      <InputField
        icon={CiCalendarDate}
        type='date'
        name='fechaIni'
        placeholder='Fecha de Inicio'
        value={formData.fechaIni}
        onChange={handleChange}
      />

      <Actions>
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
