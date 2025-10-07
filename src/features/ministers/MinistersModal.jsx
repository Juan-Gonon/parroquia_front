/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import styled from 'styled-components'
import { useUiModal } from '../../hook/useUiModal'
import { ModalForm } from '../../components/ModalForm'
import { InputField } from '../../components/inputField'
import { useForm } from '../../hook/useForm'
import Swal from 'sweetalert2'
// import { useLider } from '../../hook/useLider'
import { MdOutlineLeaderboard } from 'react-icons/md'
import { CiCalendarDate } from 'react-icons/ci'
import { useCommunity } from '../../hook/useCommunity'
import { useParishService } from '../../hook/useParishService'
import { useEffect } from 'react'

export const MinistersModal = ({ onCreated }) => {
  const { closeModal } = useUiModal()
  // const { createLider } = useLider()
  const { formData, errors, handleChange, validate, resetForm } = useForm(
    {
      idPersonal: '',
      idComunidad: '',
      rolliderazgo: '',
      fechaIni: '',
      fechaFin: '',
      activo: true,
    },
    (values) => {
      const errs = {}
      if (!values.idPersonal)
        errs.idPersonal = 'Debe seleccionar un personal parroquial'
      if (!values.idComunidad)
        errs.idComunidad = 'Debe seleccionar una comunidad'
      if (!values.rolliderazgo)
        errs.rolliderazgo = 'El rol de liderazgo es requerido'
      if (!values.fechaIni) errs.fechaIni = 'La fecha inicial es requerida'
      return errs
    }
  )
  const { getAllCommunityS, community } = useCommunity()
  const { parish, getAllParish } = useParishService()

  useEffect(() => {
    return async () => {
      await getAllCommunityS({ page: 1, limit: 20 })
    }
  }, [])

  useEffect(() => {
    return async () => {
      await getAllParish({ page: 1, limit: 50 })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    closeModal()

    // const res = await createLider({ data: formData })
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
    //     title: 'Líder registrado correctamente',
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
        <Title>Registrar Ministro o Líder</Title>

        <Select
          name='idPersonal'
          value={formData.idPersonal}
          onChange={handleChange}>
          <option value=''>Seleccionar celebrante</option>
          {parish?.map((pari) => (
            <option key={pari.id} value={pari.id}>
              {`${pari.nombre} ${pari.apellido} --  (${pari.rol})`}
            </option>
          ))}
        </Select>
        <ErrorMessage $show={!!errors.idPersonal}>
          {errors.idPersonal}
        </ErrorMessage>

        <Select
          name='idComunidad'
          value={formData.idComunidad}
          onChange={handleChange}>
          <option value=''>Seleccionar comunidad</option>
          {community?.map((comunity) => (
            <option key={comunity.id_comunidad} value={comunity.id_comunidad}>
              {comunity.nombre}
            </option>
          ))}
        </Select>
        <ErrorMessage $show={!!errors.idComunidad}>
          {errors.idComunidad}
        </ErrorMessage>

        <InputField
          icon={MdOutlineLeaderboard}
          type='text'
          name='rolliderazgo'
          placeholder='Rol de liderazgo'
          value={formData.rolliderazgo}
          onChange={handleChange}
        />
        <ErrorMessage $show={!!errors.rolliderazgo}>
          {errors.rolliderazgo}
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

const Title = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.fontlg};
  color: ${({ theme }) => theme.textprimary};
  margin-bottom: 10px;
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
