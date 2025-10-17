/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import styled from 'styled-components'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useUiModal } from '../../hook/useUiModal'
import { useMinistryPart } from '../../hook/useMinistryPart'
import { useForm } from '../../hook/useForm'
import { ModalForm } from '../../components/ModalForm'
import { FaUserPlus } from 'react-icons/fa'
import { MdOutlineLeaderboard } from 'react-icons/md'
import { InputField } from '../../components/inputField'
import { CiCalendarDate } from 'react-icons/ci'
// import { ModalForm } from '../../components/ModalForm'
// import { InputField } from '../../components/inputField'
// import { useForm } from '../../hook/useForm'
// import { useUiModal } from '../../hook/useUiModal'
// import { useMinistryPart } from '../../hook/useMinistryPart'
// import { useMembersGroup } from '../../hook/useMembersGroup'
// import { FaUserPlus } from 'react-icons/fa'
// import { CiCalendarDate } from 'react-icons/ci'
// import { MdOutlineLeaderboard } from 'react-icons/md'

export const ModalMembersGroup = ({ grupo, onCreated }) => {
  const { closeModal } = useUiModal()
  const { parishPart, getByMinistryParticipationS } = useMinistryPart()
  // const { createMemberS } = useMembersGroup()

  const { formData, errors, handleChange, validate, resetForm, setFormData } =
    useForm(
      {
        idPartMin: '',
        idGrupoServicio: grupo?.id_grupo || '',
        fechaIni: '',
        fechaFin: '',
        roldentrogrupo: '',
        activo: true,
      },
      (values) => {
        const errs = {}
        if (!values.idPartMin)
          errs.idPartMin = 'Debe seleccionar un participante del ministerio'
        if (!values.roldentrogrupo)
          errs.roldentrogrupo = 'El rol dentro del grupo es requerido'
        if (!values.fechaIni) errs.fechaIni = 'La fecha inicial es requerida'
        return errs
      }
    )

  // Cargar lista de participantes del ministerio asociado al grupo
  useEffect(() => {
    if (grupo?.id_ministerio) {
      getByMinistryParticipationS({ id: grupo.id_ministerio })
    }
  }, [grupo])

  // Aseguramos el id del grupo actual
  useEffect(() => {
    if (grupo?.id_grupo) {
      setFormData((prev) => ({ ...prev, idGrupoServicio: grupo.id_grupo }))
    }
  }, [grupo])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    console.log(formData)

    closeModal()

    // const res = await createMemberS({ data: formData })

    // if (res?.message) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: res.message || 'Ocurrió un error inesperado.',
    //     confirmButtonText: 'Reintentar',
    //     confirmButtonColor: '#d33',
    //     background: '#fff',
    //     color: '#333',
    //     iconColor: '#d33',
    //   })
    // } else {
    //   Swal.fire({
    //     title: 'Miembro añadido correctamente',
    //     text: 'El registro fue exitoso.',
    //     icon: 'success',
    //     confirmButtonText: 'Aceptar',
    //     confirmButtonColor: '#4CAF50',
    //     background: '#f9f9f9',
    //     color: '#333',
    //     iconColor: '#4CAF50',
    //   })
    //   onCreated?.()
    // }
  }

  return (
    <ModalForm onAfterClose={resetForm}>
      <FormContainer onSubmit={handleSubmit}>
        <Header>
          <TitleIconContainer>
            <FaUserPlus size='2em' color='#3498db' />
          </TitleIconContainer>
          <HeaderContent>
            <h2>Añadir miembro al grupo</h2>
            <p>“Servid al Señor con alegría.” – (Salmo 100:2)</p>
          </HeaderContent>
        </Header>

        <Select
          name='idPartMin'
          value={formData.idPartMin}
          onChange={handleChange}>
          <option value=''>Seleccionar participante</option>
          {parishPart?.map((part) => (
            <option key={part.id_part_min} value={part.id_part_min}>
              {`${part.nombre} ${part.apellido}`}
            </option>
          ))}
        </Select>
        <ErrorMessage $show={!!errors.idPartMin}>
          {errors.idPartMin}
        </ErrorMessage>

        <InputField
          icon={MdOutlineLeaderboard}
          type='text'
          name='roldentrogrupo'
          placeholder='Rol dentro del grupo'
          value={formData.roldentrogrupo}
          onChange={handleChange}
        />
        <ErrorMessage $show={!!errors.roldentrogrupo}>
          {errors.roldentrogrupo}
        </ErrorMessage>

        <FlexRow>
          <InputField
            icon={CiCalendarDate}
            type='date'
            name='fechaIni'
            placeholder='Fecha inicio'
            value={formData.fechaIni}
            onChange={handleChange}
          />
          <InputField
            icon={CiCalendarDate}
            type='date'
            name='fechaFin'
            placeholder='Fecha fin (opcional)'
            value={formData.fechaFin}
            onChange={handleChange}
          />
        </FlexRow>
        <ErrorMessage $show={!!errors.fechaIni}>{errors.fechaIni}</ErrorMessage>

        <SwitchContainer>
          <label>
            <input
              type='checkbox'
              name='activo'
              checked={formData.activo}
              onChange={(e) =>
                handleChange({
                  target: { name: 'activo', value: e.target.checked },
                })
              }
            />
            Activo
          </label>
        </SwitchContainer>

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
  width: 500px;
  max-width: 95%;
`

const FlexRow = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
`

const Select = styled.select`
  flex: 1;
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

const SwitchContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0 5px;
  label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: ${({ theme }) => theme.fontsm};
    color: ${({ theme }) => theme.textprimary};
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
