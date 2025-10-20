/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import styled from 'styled-components'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useUiModal } from '../../hook/useUiModal'
import { useFeligres } from '../../hook/useFeligres'
import { useIntentionService } from '../../hook/useIntentionService'
import { useForm } from '../../hook/useForm'
import { MdAttachMoney } from 'react-icons/md'
import { FaPrayingHands } from 'react-icons/fa'
import { CiCalendarDate } from 'react-icons/ci'
import { ModalForm } from '../../components/ModalForm'
import { InputField } from '../../components/inputField'
import { useCatalogIntentionS } from '../../hook/useCatalogIntentionS'

export const ModalIntencion = ({ idEvento, onCreated }) => {
  const { closeModal } = useUiModal()
  const { feligreses, getAllFeligres } = useFeligres()
  const {
    typeIntention,
    stateIntention,
    getAllTypeIntentionS,
    getAllStateIntentionS,
  } = useCatalogIntentionS()
  const { createIntencionS } = useIntentionService()

  const { formData, errors, handleChange, validate, resetForm } = useForm(
    {
      idFeligres: '',
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

  useEffect(() => {
    getAllFeligres({ page: 1, limit: 1000 })
    getAllTypeIntentionS()
    getAllStateIntentionS()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    closeModal()

    try {
      const payload = { ...formData, idEvento }

      await createIntencionS({ data: payload })
      // console.log(payload)
      Swal.fire({
        title: 'Intención creada correctamente',
        text: 'El registro fue exitoso.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#4CAF50',
      })
      onCreated?.()
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Ocurrió un error inesperado.',
        confirmButtonText: 'Reintentar',
        confirmButtonColor: '#d33',
      })
    }
  }
  // console.log(stateIntention)

  return (
    <ModalForm onAfterClose={resetForm}>
      <FormContainer onSubmit={handleSubmit}>
        <Header>
          <TitleIconContainer>
            <FaPrayingHands size='2em' color='#3498db' />
          </TitleIconContainer>
          <HeaderContent>
            <h2>Nueva Intención</h2>
            <p>“Pedid y se os dará.” – Mateo 7:7</p>
          </HeaderContent>
        </Header>

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
        <ErrorMessage $show={!!errors.idFeligres}>
          {errors.idFeligres}
        </ErrorMessage>

        {/* TIPO INTENCIÓN */}
        <Select
          name='idTipoIntencion'
          value={formData.idTipoIntencion}
          onChange={handleChange}>
          <option value=''>Seleccionar tipo de intención</option>
          {typeIntention?.map((t) => (
            <option key={t.id_tipointencion} value={t.id_tipointencion}>
              {t.nombre}
            </option>
          ))}
        </Select>
        <ErrorMessage $show={!!errors.idTipoIntencion}>
          {errors.idTipoIntencion}
        </ErrorMessage>

        {/* ESTADO INTENCIÓN */}
        <Select
          name='idEstadoIntencion'
          value={formData.idEstadoIntencion}
          onChange={handleChange}>
          <option value=''>Seleccionar estado de intención</option>
          {stateIntention?.map((e) => (
            <option key={e.id_estadoin} value={e.id_estadoin}>
              {e.nombre}
            </option>
          ))}
        </Select>
        <ErrorMessage $show={!!errors.idEstadoIntencion}>
          {errors.idEstadoIntencion}
        </ErrorMessage>

        {/* DESCRIPCIÓN */}
        <InputField
          icon={MdAttachMoney}
          type='text'
          name='descripcion'
          placeholder='Descripción de la intención'
          value={formData.descripcion}
          onChange={handleChange}
        />
        <ErrorMessage $show={!!errors.descripcion}>
          {errors.descripcion}
        </ErrorMessage>

        {/* MONTO OFRENDA */}
        <InputField
          icon={MdAttachMoney}
          type='number'
          step='0.01'
          name='montoOfrenda'
          placeholder='Monto de la ofrenda (opcional)'
          value={formData.montoOfrenda}
          onChange={handleChange}
        />

        {/* PAGADA */}
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

        {/* MONTO PAGADO Y FECHA */}
        <FlexRow>
          <InputField
            icon={MdAttachMoney}
            type='number'
            step='0.01'
            name='montoPagado'
            placeholder='Monto pagado (opcional)'
            value={formData.montoPagado}
            onChange={handleChange}
          />
          <InputField
            icon={CiCalendarDate}
            type='date'
            name='fechaPago'
            placeholder='Fecha de pago (opcional)'
            value={formData.fechaPago}
            onChange={handleChange}
          />
        </FlexRow>

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
  opacity: ${({ $show }) => ($show ? 1 : 0)};
`
const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
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
