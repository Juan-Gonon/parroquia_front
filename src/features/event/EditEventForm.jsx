/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import { useEffect } from 'react'
import Swal from 'sweetalert2'
import styled, { css } from 'styled-components'
import { useForm } from '../../hook/useForm'
// import { FaChurch } from 'react-icons/fa'
// import { CiCalendarDate } from 'react-icons/ci'
// import { MdEventAvailable } from 'react-icons/md'
import { useEvent } from '../../hook/useEvent'
import { useCommunity } from '../../hook/useCommunity'
import { useParishService } from '../../hook/useParishService'
import { InputField } from '../../components/inputField'
import { MdEventAvailable, MdNavigateNext } from 'react-icons/md'
import { CiCalendarDate } from 'react-icons/ci'
import { FaChurch } from 'react-icons/fa'
import { LuNavigation } from 'react-icons/lu'

export const EditEventForm = ({ initialData, onSaved, onDeleted }) => {
  const { formData, setFormData, handleChange, validate } = useForm(
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

  const { updateEventS, deleteEventS, evType, getAllEventTypeS } = useEvent()
  const { community, getAllCommunityS } = useCommunity()
  const { parish, getAllParish } = useParishService()

  // --- cargar datos iniciales
  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre ?? '',
        fechaIni: initialData.fecha_ini
          ? new Date(initialData.fecha_ini).toISOString().slice(0, 16)
          : '',
        fechaFin: initialData.fecha_fin
          ? new Date(initialData.fecha_fin).toISOString().slice(0, 16)
          : '',
        descripcion: initialData.descripcion ?? '',
        idComunidad: initialData.id_comunidad ?? '',
        idTipoEvento: initialData.id_tipoevento ?? '',
        aceptaIntenciones: initialData.aceptaintenciones ?? false,
        requiereInscripcion: initialData.requiereinscripcion ?? false,
        idCelebrante: initialData.id_celebrante ?? '',
        nombre_celebrante_externo: initialData.nombrecelebranteexterno ?? '',
      })
    }
  }, [initialData, setFormData])

  // --- cargar catálogos
  useEffect(() => {
    getAllCommunityS({ page: 1, limit: 50 })
    getAllEventTypeS()
    getAllParish({ page: 1, limit: 50 })
  }, [])

  // --- guardar cambios
  const handleSave = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      await updateEventS({ data: formData, id: initialData?.id_evento })

      Swal.fire({
        icon: 'success',
        title: 'Evento actualizado',
        text: 'Los cambios se guardaron correctamente',
        showConfirmButton: false,
        timer: 1800,
        toast: true,
        position: 'top-end',
      })
      onSaved?.()
    } catch (err) {
      Swal.fire('Error', 'No se pudo actualizar el evento', 'error')
    }
  }

  // --- eliminar
  const handleDelete = async () => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Eliminar evento?',
      text: 'Esta acción eliminará el evento permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e74c3c',
    })

    if (!isConfirmed) return

    try {
      await deleteEventS({ id: initialData?.id_evento })
      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'Evento eliminado correctamente',
        showConfirmButton: false,
        timer: 1800,
        toast: true,
        position: 'top-end',
      })
      onDeleted?.()
    } catch (err) {
      Swal.fire('Error', 'No se pudo eliminar el evento', 'error')
    }
  }

  // --- render
  return (
    <FormWrapper onSubmit={handleSave}>
      <Header>
        <TitleIconContainer>
          <FaChurch size='2em' />
        </TitleIconContainer>
        <HeaderContent>
          <h2>Editar Evento</h2>
          <p>Editando: {formData.nombre || '...'}</p>
        </HeaderContent>
        <TitleIconContainer>
          <MdNavigateNext size='1em' cursor='pointer' />
        </TitleIconContainer>
      </Header>

      <FormBody>
        <InputField
          icon={MdEventAvailable}
          type='text'
          name='nombre'
          placeholder='Nombre del evento'
          value={formData.nombre}
          onChange={handleChange}
        />

        <InputField
          icon={CiCalendarDate}
          type='datetime-local'
          name='fechaIni'
          value={formData.fechaIni}
          onChange={handleChange}
        />
        <InputField
          icon={CiCalendarDate}
          type='datetime-local'
          name='fechaFin'
          value={formData.fechaFin}
          onChange={handleChange}
        />

        <TextArea
          name='descripcion'
          placeholder='Descripción'
          value={formData.descripcion}
          onChange={handleChange}
        />

        <FlexRow>
          <Select
            name='idComunidad'
            value={formData.idComunidad}
            onChange={handleChange}>
            <option value=''>Seleccionar comunidad</option>
            {community?.map((com) => (
              <option key={com.id_comunidad} value={com.id_comunidad}>
                {com.nombre}
              </option>
            ))}
          </Select>

          <Select
            name='idTipoEvento'
            value={formData.idTipoEvento}
            onChange={handleChange}>
            <option value=''>Seleccionar tipo</option>
            {evType?.map((t) => (
              <option key={t.id_tipo} value={t.id_tipo}>
                {t.nombre}
              </option>
            ))}
          </Select>
        </FlexRow>

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
          {parish?.map((p) => (
            <option key={p.id} value={p.id}>
              {`${p.nombre} ${p.apellido} (${p.rol})`}
            </option>
          ))}
        </Select>

        <InputField
          icon={MdEventAvailable}
          type='text'
          name='nombre_celebrante_externo'
          placeholder='Celebrante externo (si aplica)'
          value={formData.nombre_celebrante_externo}
          onChange={handleChange}
        />

        <QuoteFooter>
          "Todo lo puedo en Cristo que me fortalece." - Filipenses 4:13
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
  max-width: 800px;
  display: flex;
  flex-direction: column;
  /* height: 95vh; */
  color: ${({ theme }) => theme.text};
  min-height: 95vh;
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
  /* background-color: ${({ theme }) => theme.bg4}; */
  /* color: ${({ theme }) => theme.textsecondary}; */
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
`

const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-around;
  align-items: center;
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
