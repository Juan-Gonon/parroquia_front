/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import styled, { css } from 'styled-components'
import { useForm } from '../../hook/useForm'
import { useIntentionService } from '../../hook/useIntentionService'
import { useCatalogIntentionS } from '../../hook/useCatalogIntentionS'
import { useFeligres } from '../../hook/useFeligres'
import { InputField } from '../../components/inputField'
import { MdAttachMoney } from 'react-icons/md'
import { CiCalendarDate } from 'react-icons/ci'
import { FaPrayingHands } from 'react-icons/fa'

export const EditIntentionForm = ({ initialData, onSaved, onDeleted }) => {
  const { feligreses, getAllFeligres } = useFeligres()
  const {
    typeIntention,
    stateIntention,
    getAllTypeIntentionS,
    getAllStateIntentionS,
  } = useCatalogIntentionS()
  const { updateIntentionS, deleteIntentionS } = useIntentionService()

  const { formData, setFormData, errors, handleChange, validate } = useForm(
    {
      idFeligres: '',
      idEvento: '',
      idTipoIntencion: '',
      idEstadoIntencion: '',
      descripcion: '',
      montoOfrenda: '',
      pagada: false,
      montoPagado: '',
      fechaPago: '',
    },
    (values) => {
      const errs = {}
      if (!values.idFeligres) errs.idFeligres = 'Debe seleccionar un feligrés'
      if (!values.idTipoIntencion)
        errs.idTipoIntencion = 'Debe seleccionar un tipo de intención'
      if (!values.idEstadoIntencion)
        errs.idEstadoIntencion = 'Debe seleccionar un estado de intención'
      if (!values.descripcion) errs.descripcion = 'La descripción es requerida'
      return errs
    }
  )

  // --- cargar catálogos
  useEffect(() => {
    getAllFeligres({ page: 1, limit: 1000 })
    getAllTypeIntentionS()
    getAllStateIntentionS()
  }, [])

  // --- cargar datos iniciales
  useEffect(() => {
    if (initialData) {
      setFormData({
        idFeligres: initialData.id_feligres ?? '',
        idEvento: initialData.id_evento ?? '',
        idTipoIntencion: initialData.id_tipointencion ?? '',
        idEstadoIntencion: initialData.id_estadoin ?? '',
        descripcion: initialData.descripcion ?? '',
        montoOfrenda: initialData.ofrenda ?? '',
        pagada: initialData.estado_pago ?? false,
        montoPagado: initialData.montopagado ?? '',
        fechaPago: initialData.fechaPago
          ? new Date(initialData.fechaPago).toISOString().slice(0, 10)
          : '',
      })
    }
  }, [initialData])

  // --- guardar cambios
  const handleSave = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      await updateIntentionS({
        data: formData,
        id: initialData.id_intencion,
      })

      Swal.fire({
        icon: 'success',
        title: 'Intención actualizada',
        text: 'Los cambios se guardaron correctamente',
        showConfirmButton: false,
        timer: 1800,
        toast: true,
        position: 'top-end',
      })
      onSaved?.()
    } catch (err) {
      Swal.fire('Error', 'No se pudo actualizar la intención', 'error')
    }
  }

  // --- eliminar intención
  const handleDelete = async () => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Eliminar intención?',
      text: 'Esta acción eliminará la intención permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#e74c3c',
    })

    if (!isConfirmed) return

    try {
      await deleteIntentionS({ id: initialData.id_intencion })
      Swal.fire({
        icon: 'success',
        title: 'Eliminada correctamente',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        position: 'top-end',
      })
      onDeleted?.()
    } catch (err) {
      Swal.fire('Error', 'No se pudo eliminar la intención', 'error')
    }
  }

  return (
    <FormWrapper onSubmit={handleSave}>
      <Header>
        <TitleIconContainer>
          <FaPrayingHands size='2em' />
        </TitleIconContainer>
        <HeaderContent>
          <h2>Editar Intención</h2>
          <p>Editando intención de {formData.descripcion || '...'}</p>
        </HeaderContent>
      </Header>

      <FormBody>
        {/* FELIGRÉS */}
        <Select
          name='idFeligres'
          value={formData.idFeligres}
          onChange={handleChange}>
          <option value=''>Seleccionar feligrés</option>
          {feligreses?.map((f) => (
            <option key={f.id_feligres} value={f.id_feligres}>
              {`${f.nombre} ${f.apellido}`}
            </option>
          ))}
        </Select>

        {/* TIPO Y ESTADO */}
        <FlexRow>
          <Select
            name='idTipoIntencion'
            value={formData.idTipoIntencion}
            onChange={handleChange}>
            <option value=''>Tipo de intención</option>
            {typeIntention?.map((t) => (
              <option key={t.id_tipointencion} value={t.id_tipointencion}>
                {t.nombre}
              </option>
            ))}
          </Select>

          <Select
            name='idEstadoIntencion'
            value={formData.idEstadoIntencion}
            onChange={handleChange}>
            <option value=''>Estado</option>
            {stateIntention?.map((s) => (
              <option key={s.id_estadoin} value={s.id_estadoin}>
                {s.nombre}
              </option>
            ))}
          </Select>
        </FlexRow>

        {/* DESCRIPCIÓN */}
        <TextArea
          name='descripcion'
          placeholder='Descripción de la intención'
          value={formData.descripcion}
          onChange={handleChange}
        />

        {/* SWITCH PAGADA */}
        <SwitchContainer>
          <label>
            <input
              type='checkbox'
              name='pagada'
              checked={formData.pagada}
              onChange={(e) =>
                handleChange({
                  target: { name: 'pagada', value: e.target.checked },
                })
              }
            />
            Pagada
          </label>
        </SwitchContainer>

        <InputField
          icon={MdAttachMoney}
          type='number'
          name='montoPagado'
          placeholder='Monto pagado'
          value={formData.montoPagado}
          onChange={handleChange}
          disabled={!formData.pagada}
        />

        <InputField
          icon={CiCalendarDate}
          type='date'
          name='fechaPago'
          placeholder='Fecha de pago'
          value={formData.fechaPago}
          onChange={handleChange}
          disabled={!formData.pagada}
        />

        <InputField
          icon={MdAttachMoney}
          type='number'
          step='0.01'
          name='montoOfrenda'
          placeholder='Monto de la ofrenda'
          value={formData.montoOfrenda}
          onChange={handleChange}
        />

        <QuoteFooter>
          "Que todo lo que hagan sea hecho con amor." - 1 Corintios 16:14
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

/* --- ESTILOS (idénticos a EditEventForm) --- */

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

// const FlexRow = styled.div`
//   display: flex;
//   gap: 15px;
//   flex-wrap: wrap; /* evita desbordamiento */

//   & > * {
//     flex: 1; /* cada hijo toma espacio equitativo */
//   }

//   /* El input de monto pagado será más pequeño */
//   & > :first-child {
//     flex: 0 0 150px; /* ancho fijo para monto */
//   }
// `

const Select = styled.select`
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.fontsm};
  outline: none;
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
