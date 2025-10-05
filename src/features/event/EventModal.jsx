/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import styled from 'styled-components'
import { useUiModal } from '../../hook/useUiModal'
import { ModalForm } from '../../components/ModalForm'
import { InputField } from '../../components/inputField'
import { useForm } from '../../hook/useForm'
import Swal from 'sweetalert2'
import { useCommunity } from '../../hook/useCommunity'
import { FaChurch } from 'react-icons/fa'
import { CiCalendarDate } from 'react-icons/ci'
import { MdEventAvailable } from 'react-icons/md'
import { useEffect } from 'react'
import { useEvent } from '../../hook/useEvent'
// import { useEventType } from '../../hook/useEventType'
// import { useCelebrant } from '../../hook/useCelebrant'

export const EventModal = ({ onCreated }) => {
  const { closeModal } = useUiModal()
  const { getAllCommunityS, community } = useCommunity() // aquí deberías tener tu servicio
  const { formData, errors, handleChange, validate, resetForm } = useForm(
    {
      nombre: '',
      fechaIni: '',
      fechaFin: '',
      descripcion: '',
      idComunidad: '',
      idTipoEvento: '',
      aceptaIntenciones: false,
      requiereInscripcion: false,
      idCelebrante: '',
      nombre_celebrante_externo: '',
    },
    (values) => {
      const errs = {}
      if (!values.nombre) errs.nombre = 'El nombre es requerido'
      if (!values.fechaIni) errs.fechaIni = 'La fecha inicial es requerida'
      if (!values.idComunidad)
        errs.idComunidad = 'Debe seleccionar una comunidad'
      if (!values.idTipoEvento)
        errs.idTipoEvento = 'Debe seleccionar un tipo de evento'
      return errs
    }
  )

  const { evType, getAllEventTypeS, createEventS } = useEvent()

  useEffect(() => {
    return async () => {
      await getAllCommunityS({ page: 1, limit: 20 })
    }
  }, [])

  useEffect(() => {
    return async () => {
      await getAllEventTypeS()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    await createEventS({ data: formData })

    closeModal()

    // const res = await createEvent({ data: formData })
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
    //     title: 'Evento creado correctamente',
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
            <FaChurch size='2em' color='#3498db' />
          </TitleIconContainer>
          <HeaderContent>
            <h2>Crea un nuevo evento</h2>
            <p> "El Señor es mi pastor, nada me falta." - (Salmo 23:1)</p>
          </HeaderContent>
        </Header>

        <InputField
          icon={MdEventAvailable}
          type='text'
          name='nombre'
          placeholder='Nombre del evento'
          value={formData.nombre}
          onChange={handleChange}
        />
        <ErrorMessage $show={!!errors.nombre}>{errors.nombre}</ErrorMessage>

        <FlexRow>
          <InputField
            icon={CiCalendarDate}
            type='datetime-local'
            name='fechaIni'
            placeholder='Fecha inicio'
            value={formData.fechaIni}
            onChange={handleChange}
          />
          <InputField
            icon={CiCalendarDate}
            type='datetime-local'
            name='fechaFin'
            placeholder='Fecha fin'
            value={formData.fechaFin}
            onChange={handleChange}
          />
        </FlexRow>
        <ErrorMessage $show={!!errors.fechaIni}>{errors.fechaIni}</ErrorMessage>

        <TextArea
          name='descripcion'
          placeholder='Descripción del evento'
          value={formData.descripcion}
          onChange={handleChange}
        />

        <FlexRow>
          <Select
            name='idComunidad'
            value={formData.idComunidad}
            onChange={handleChange}>
            <option value=''>Seleccionar comunidad</option>
            {/* <option value='1'>Comunidad 1</option>
            <option value='2'>Comunidad 2</option> */}
            {community?.map((comunity) => (
              <option key={comunity.id_comunidad} value={comunity.id_comunidad}>
                {comunity.nombre}
              </option>
            ))}
          </Select>
          <Select
            name='idTipoEvento'
            value={formData.idTipoEvento}
            onChange={handleChange}>
            <option value=''>Seleccionar tipo de evento</option>
            {/* <option value='1'>Misa</option>
            <option value='2'>Formación</option> */}
            {evType?.map((evenType) => (
              <option key={evenType.id_tipo} value={evenType.id_tipo}>
                {evenType.nombre}
              </option>
            ))}
          </Select>
        </FlexRow>
        <ErrorMessage $show={!!errors.idComunidad}>
          {errors.idComunidad}
        </ErrorMessage>
        <ErrorMessage $show={!!errors.idTipoEvento}>
          {errors.idTipoEvento}
        </ErrorMessage>

        <SwitchContainer>
          <label>
            <input
              type='checkbox'
              name='aceptaIntenciones'
              checked={formData.aceptaIntenciones}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: 'aceptaIntenciones',
                    value: e.target.checked,
                  },
                })
              }
            />
            Acepta Intenciones
          </label>
          <label>
            <input
              type='checkbox'
              name='requiereInscripcion'
              checked={formData.requiereInscripcion}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: 'requiereInscripcion',
                    value: e.target.checked,
                  },
                })
              }
            />
            Requiere Inscripción
          </label>
        </SwitchContainer>

        <Select
          name='idCelebrante'
          value={formData.idCelebrante}
          onChange={handleChange}>
          <option value=''>Seleccionar celebrante</option>
          <option value='1'>P. Juan Pérez</option>
          <option value='2'>P. Carlos Gómez</option>
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
  width: 800px;
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
  justify-content: space-around;
`

const TextArea = styled.textarea`
  padding: 12px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.fontsm};
  resize: none;
  min-height: 80px;

  &:focus {
    border: 2px solid ${({ theme }) => theme.bg4};
  }
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
  justify-content: space-between;
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
