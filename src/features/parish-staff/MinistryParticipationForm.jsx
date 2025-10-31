/* eslint-disable prettier/prettier */
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import styled, { css } from 'styled-components'
import { InputField } from '../../components/inputField'
import { useForm } from '../../hook/useForm'
import { useMinistryService } from '../../hook/useMinistryService'
import { useMinistryPart } from '../../hook/useMinistryPart'
import { CiCalendarDate } from 'react-icons/ci'
import { FaHandsHelping } from 'react-icons/fa' // Ícono de ministerio
import { MdOutlinePersonAddAlt1 } from 'react-icons/md'

export const MinistryParticipationForm = ({ parishStaffId, onSaved }) => {
  const { formData, handleChange, validate } = useForm(
    {
      idPersonal: parishStaffId || null,
      idMinisterio: '',
      idRol: '',
      fechaIni: '',
    },
    (values) => {
      const errs = {}
      if (!values.idPersonal)
        errs.idPersonal = 'El id del personal es requerido'
      if (!values.idMinisterio)
        errs.idMinisterio = 'Debe seleccionar un ministerio'
      if (!values.idRol)
        errs.idRol = 'Debe seleccionar un rol dentro del ministerio'
      if (!values.fechaIni) errs.fechaIni = 'Debe indicar la fecha de inicio'
      return errs
    }
  )

  const { ministry, role, getAllMinistryS, getAllRoleDMinistryS } =
    useMinistryService()
  const { onCreateMinistyParS } = useMinistryPart()

  useEffect(() => {
    getAllMinistryS({ page: 1, limit: 20 })
    getAllRoleDMinistryS({ page: 1, limit: 20 })
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      await onCreateMinistyParS({ data: formData })

      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Participación asignada correctamente',
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

  return (
    <FormWrapper onSubmit={handleSave}>
      <Header>
        <TitleIconContainer>
          <FaHandsHelping size='2em' color='#3498db' />
        </TitleIconContainer>
        <HeaderContent>
          <h2>Participar en un Ministerio</h2>
          <p>Únete a un ministerio y aporta con tu servicio</p>
        </HeaderContent>
      </Header>

      <FormBody>
        {/* Select de ministerio */}
        <SelectGroup>
          <Label htmlFor='idMinisterio'>Ministerio</Label>
          <Select
            id='idMinisterio'
            name='idMinisterio'
            value={formData.idMinisterio || ''}
            onChange={handleChange}>
            {!formData.idMinisterio && (
              <option value=''>Seleccione un ministerio</option>
            )}
            {ministry?.map((minis) => (
              <option key={minis.id_ministerio} value={minis.id_ministerio}>
                {minis.nombre}
              </option>
            ))}
          </Select>
        </SelectGroup>

        {/* Select de rol */}
        <SelectGroup>
          <Label htmlFor='idRol'>Rol dentro del Ministerio</Label>
          <Select
            id='idRol'
            name='idRol'
            value={formData.idRol || ''}
            onChange={handleChange}>
            {!formData.idRol && <option value=''>Seleccione un rol</option>}
            {role?.map((rol) => (
              <option
                key={rol.id_roldentroministerio}
                value={rol.id_roldentroministerio}>
                {rol.nombre}
              </option>
            ))}
          </Select>
        </SelectGroup>

        {/* Fecha de inicio */}
        <InputField
          icon={CiCalendarDate}
          label='Fecha de Inicio'
          type='date'
          name='fechaIni'
          placeholder='Seleccione una fecha'
          value={formData.fechaIni}
          onChange={handleChange}
        />

        <QuoteFooter>
          “El servicio en la comunidad es una forma de amar a Dios.” - San
          Francisco de Asís
        </QuoteFooter>

        {/* Botones */}
        <Actions>
          <SaveBtn type='submit'>
            <MdOutlinePersonAddAlt1 size={18} /> Guardar
          </SaveBtn>
        </Actions>
      </FormBody>
    </FormWrapper>
  )
}

/* ──────────────── ESTILOS ──────────────── */

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
  max-width: 480px;
  display: flex;
  flex-direction: column;
  height: max-content;
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
  position: relative;
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
  bottom: 15px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.gray500};
  text-align: center;
  padding: 10px 0;
  font-style: italic;
  border-top: 1px solid #f0f0f0;
`

const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding-top: 10px;
`

const SaveBtn = styled.button`
  ${ButtonBase}
  background-color: ${({ theme }) => theme.bg4 || '#3498db'};
  color: ${({ theme }) => theme.textsecondary || '#fff'};
  border: none;
  max-width: 180px;

  &:hover {
    background-color: #2980b9;
    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
    transform: translateY(-1px);
  }
`
