/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import styled, { css } from 'styled-components'
import { useForm } from '../../hook/useForm'
import { InputField } from '../../components/inputField'
import { CiCalendarDate } from 'react-icons/ci'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import { useMinistryService } from '../../hook/useMinistryService'
import { LiaDoveSolid } from 'react-icons/lia'

export const EditMinistryFrom = ({ initialData, onSaved, onDeleted }) => {
  const { formData, setFormData, handleChange, validate } = useForm(
    {
      nombre: '',
      descripcion: '',
      fechafundacion: '',
    },
    (values) => {
      const errs = {}
      if (!values.nombre) errs.nombre = 'Debes ingresar un nombre'
      if (!values.fechafundacion)
        errs.fechafundacion = 'La fecha de fundacion es requerida'
      return errs
    }
  )

  const { updateMinistryS, deleteMinistryS } = useMinistryService()

  // --- cargar datos iniciales
  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre ?? '',
        descripcion: initialData.descripcion ?? '',
        fechafundacion: initialData.fechafundacion
          ? new Date(initialData.fechafundacion).toISOString().split('T')[0]
          : '',
      })
    }
  }, [initialData, setFormData])

  // --- guardar cambios
  const handleSave = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      await updateMinistryS({ data: formData, id: initialData?.id })
      Swal.fire({
        icon: 'success',
        title: 'Líder actualizado',
        text: 'Los cambios se guardaron correctamente',
        showConfirmButton: false,
        timer: 1800,
        toast: true,
        position: 'top-end',
      })
      onSaved?.()
    } catch (err) {
      Swal.fire('Error', 'No se pudo actualizar el líder', 'error')
    }
  }

  // --- eliminar
  const handleDelete = async () => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Eliminar líder?',
      text: 'Esta acción eliminará el registro del líder permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e74c3c',
    })

    if (!isConfirmed) return

    try {
      await deleteMinistryS({ id: initialData?.id })
      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'Líder eliminado correctamente',
        showConfirmButton: false,
        timer: 1800,
        toast: true,
        position: 'top-end',
      })
      onDeleted?.()
    } catch (err) {
      Swal.fire('Error', 'No se pudo eliminar el líder', 'error')
    }
  }

  // --- render
  return (
    <FormWrapper onSubmit={handleSave}>
      <Header>
        <TitleIconContainer>
          <LiaDoveSolid size='2em' color='#3498db' />
        </TitleIconContainer>
        <HeaderContent>
          <h2>Editar Ministerio</h2>
          <p>Editando: {initialData?.nombre || '...'}</p>
        </HeaderContent>
      </Header>

      <FormBody>
        <InputField
          icon={MdDriveFileRenameOutline}
          type='text'
          name='nombre'
          placeholder='Nombre del ministerio'
          value={formData.nombre}
          onChange={handleChange}
        />

        <TextArea
          name='descripcion'
          placeholder='Descripción'
          value={formData.descripcion}
          onChange={handleChange}
        />

        <InputField
          icon={CiCalendarDate}
          type='date'
          name='fechafundacion'
          placeholder='Fecha de fundacion'
          value={formData.fechafundacion}
          onChange={handleChange}
        />

        <QuoteFooter>
          "Servir con humildad es el camino del verdadero liderazgo."
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

/* ---- estilos heredados del EditEventForm ---- */

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
  max-width: 500px;
  display: flex;
  flex-direction: column;
  height: 95vh;
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
`

const HeaderContent = styled.div`
  flex-grow: 1;
  h2 {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0;
    color: ${({ theme }) => theme.textprimary};
  }
  p {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.gray500};
    margin: 0;
  }
`

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
`

const FlexRow = styled.div`
  display: flex;
  gap: 15px;
`

const Select = styled.select`
  /* flex: 1; */
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.fontsm};
  outline: none;
`

const SwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
  label {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`

const QuoteFooter = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.gray500};
  text-align: center;
  padding: 10px 0;
  font-style: italic;
  border-top: 1px solid #f0f0f0;
  position: absolute;
  bottom: 30px;
  width: 85%;
`

const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 80px;
  width: 90%;
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
