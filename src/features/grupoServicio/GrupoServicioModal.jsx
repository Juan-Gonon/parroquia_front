/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components'
import { useUiModal } from '../../hook/useUiModal'
import { ModalForm } from '../../components/ModalForm'
import { InputField } from '../../components/inputField'
import { useForm } from '../../hook/useForm'
import Swal from 'sweetalert2'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import { FaHandsHelping } from 'react-icons/fa'
import { useGrupoServicioService } from '../../hook/useGrupoService'
import { useMinistryService } from '../../hook/useMinistryService'
import { useEffect } from 'react'

export const GrupoServicioModal = ({ onCreated }) => {
  const { closeModal } = useUiModal()
  const { createGrupoS } = useGrupoServicioService()
  const { ministry, getAllMinistryS } = useMinistryService()

  const { formData, errors, handleChange, validate, resetForm } = useForm(
    {
      nombre: '',
      descripcion: '',
      idMinisterio: '',
      activo: true,
    },
    (values) => {
      const errs = {}
      if (!values.nombre) errs.nombre = 'El nombre es requerido'
      if (!values.idMinisterio)
        errs.idMinisterio = 'Debe seleccionar un ministerio asociado'
      return errs
    }
  )

  useEffect(() => {
    return async () => {
      await getAllMinistryS({ page: 1, limit: 20 })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    closeModal()
    const res = await createGrupoS({ data: formData })

    if (res?.message) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: res.message || 'Error inesperado',
      })
    } else {
      Swal.fire({
        title: 'Grupo de Servicio creado',
        text: 'El grupo fue registrado exitosamente.',
        icon: 'success',
      })
      onCreated?.()
    }
  }

  return (
    <ModalForm onAfterClose={resetForm}>
      <FormContainer onSubmit={handleSubmit}>
        <Header>
          <IconBox>
            <FaHandsHelping size='2em' color='#3498db' />
          </IconBox>
          <HeaderContent>
            <h2>Nuevo Grupo de Servicio</h2>
            <p>“El que quiera ser grande, que sirva a los demás.”</p>
          </HeaderContent>
        </Header>

        <InputField
          icon={MdDriveFileRenameOutline}
          name='nombre'
          placeholder='Nombre del grupo'
          value={formData.nombre}
          onChange={handleChange}
        />
        <ErrorMessage $show={!!errors.nombre}>{errors.nombre}</ErrorMessage>

        <TextArea
          name='descripcion'
          placeholder='Descripción (opcional)'
          value={formData.descripcion}
          onChange={handleChange}
        />

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
        <ErrorMessage $show={!!errors.idMinisterio}>
          {errors.idMinisterio}
        </ErrorMessage>

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
  width: 480px;
  max-width: 95%;
`

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text};
  resize: vertical;
  min-height: 100px;
`

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.85rem;
  min-height: 18px;
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`

const CancelButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.gray300};
  color: ${({ theme }) => theme.gray600};
  font-weight: 600;
`

const SubmitButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.bg4};
  color: ${({ theme }) => theme.textsecondary};
  font-weight: 600;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const IconBox = styled.div`
  background: ${({ theme }) => theme.bg3};
  padding: 10px;
  border-radius: 8px;
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
