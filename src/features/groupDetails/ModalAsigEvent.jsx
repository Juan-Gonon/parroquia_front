/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import styled from 'styled-components'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useUiModal } from '../../hook/useUiModal'
import { useHomeInfo } from '../../hook/useHomeInfo'
import { useForm } from '../../hook/useForm'
import { ModalForm } from '../../components/ModalForm'
import { FaCalendarPlus } from 'react-icons/fa'
import { useAsigEventGroup } from '../../hook/useAsigEventGroup'

export const ModalAsignEvent = ({ grupo, onCreated }) => {
  const { closeModal } = useUiModal()
  const { eventU, getAllUpcomingEventS } = useHomeInfo()
  const { createAsigEventGrouptS } = useAsigEventGroup()

  const { formData, errors, handleChange, validate, resetForm, setFormData } =
    useForm(
      {
        idEvento: '',
        idGrpSrv: grupo?.id_grupo || '',
        notas: '',
      },
      (values) => {
        const errs = {}
        if (!values.idEvento) errs.idEvento = 'Debe seleccionar un evento'
        return errs
      }
    )

  useEffect(() => {
    getAllUpcomingEventS()
  }, [])

  useEffect(() => {
    if (grupo?.id_grupo) {
      setFormData((prev) => ({ ...prev, idGrpSrv: grupo.id_grupo }))
    }
  }, [grupo])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    closeModal()

    try {
      await createAsigEventGrouptS({ data: formData })
      // console.log(formData)

      Swal.fire({
        title: 'Asignación creada correctamente',
        text: 'El grupo fue asignado al evento exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#4CAF50',
        background: '#f9f9f9',
        color: '#333',
        iconColor: '#4CAF50',
      })

      onCreated?.()
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Ocurrió un error inesperado.',
        confirmButtonText: 'Reintentar',
        confirmButtonColor: '#d33',
        background: '#fff',
        color: '#333',
        iconColor: '#d33',
      })
    }
  }

  return (
    <ModalForm onAfterClose={resetForm}>
      <FormContainer onSubmit={handleSubmit}>
        <Header>
          <IconBox>
            <FaCalendarPlus size='2em' color='#2ecc71' />
          </IconBox>
          <HeaderContent>
            <h2>Asignar evento al grupo</h2>
            <p>Selecciona un evento próximo para este grupo.</p>
          </HeaderContent>
        </Header>

        <Select
          name='idEvento'
          value={formData.idEvento}
          onChange={handleChange}>
          <option value=''>Seleccionar evento</option>
          {eventU?.map((ev) => (
            <option key={ev.id_evento} value={ev.id_evento}>
              {ev.nombre}
            </option>
          ))}
        </Select>
        <ErrorMessage $show={!!errors.idEvento}>{errors.idEvento}</ErrorMessage>

        <TextArea
          name='notas'
          placeholder='Notas (opcional)'
          value={formData.notas}
          onChange={handleChange}
        />

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

/* === STYLES === */
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 25px;
  background-color: ${({ theme }) => theme.bgtgderecha};
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 95%;
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

const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  resize: none;
  border-radius: 8px;
  border: none;
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.fontsm};
  outline: none;

  &:focus {
    border: 2px solid ${({ theme }) => theme.bg4};
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
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`

const IconBox = styled.div`
  background-color: ${({ theme }) => theme.bg3};
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeaderContent = styled.div`
  h2 {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.textprimary};
    margin: 0;
  }

  p {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.gray500};
    margin: 0;
  }
`
