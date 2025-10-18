import styled from 'styled-components'
import { useUiModal } from '../../hook/useUiModal'
import { ModalForm } from '../../components/ModalForm'
import { InputField } from '../../components/inputField'
import { useForm } from '../../hook/useForm'
import Swal from 'sweetalert2'
import { useFeligres } from '../../hook/useFeligres'
import { FaPhone, FaUser, FaUserPlus } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export const FeligresModal = ({ onCreated }) => {
  const { closeModal } = useUiModal()
  const { createFeligres } = useFeligres()

  const { formData, errors, handleChange, validate, resetForm } = useForm(
    { nombre: '', apellido: '', telefono: '', email: '' },
    (values) => {
      const errs = {}
      if (!values.nombre) errs.nombre = 'El nombre es requerido'
      if (!values.apellido) errs.apellido = 'El apellido es requerido'
      if (values.telefono && values.telefono.length !== 8)
        errs.telefono = 'Debe tener 8 dígitos'
      return errs
    }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    closeModal()

    const res = await createFeligres({ data: formData })

    if (res?.message && !res.id_feligres) {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear feligrés',
        text: res.message || 'Ocurrió un error inesperado.',
        confirmButtonText: 'Reintentar',
        confirmButtonColor: '#d33',
        background: '#fff',
        color: '#333',
        iconColor: '#d33',
      })
    } else {
      Swal.fire({
        title: 'Feligrés registrado correctamente',
        text: 'El registro fue exitoso.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#4CAF50',
        background: '#f9f9f9',
        color: '#333',
        iconColor: '#4CAF50',
      })
      onCreated?.()
    }
  }

  return (
    <ModalForm onAfterClose={resetForm}>
      <FormContainer onSubmit={handleSubmit}>
        {/* HEADER */}
        <Header>
          <TitleIconContainer>
            <FaUserPlus size='2em' color='#3498db' />
          </TitleIconContainer>
          <HeaderContent>
            <h2>Registrar Feligrés</h2>
            <p>“Servir a Dios con alegría es un acto de amor.”</p>
          </HeaderContent>
        </Header>

        {/* CAMPOS */}
        <InputField
          icon={FaUser}
          type='text'
          name='nombre'
          placeholder='Nombre'
          value={formData.nombre}
          onChange={handleChange}
        />
        <ErrorMessage $show={!!errors.nombre}>{errors.nombre}</ErrorMessage>

        <InputField
          icon={FaUser}
          type='text'
          name='apellido'
          placeholder='Apellido'
          value={formData.apellido}
          onChange={handleChange}
        />
        <ErrorMessage $show={!!errors.apellido}>{errors.apellido}</ErrorMessage>

        <InputField
          icon={FaPhone}
          name='telefono'
          type='text'
          placeholder='Teléfono (opcional)'
          value={formData.telefono}
          onChange={handleChange}
        />
        <ErrorMessage $show={!!errors.telefono}>{errors.telefono}</ErrorMessage>

        <InputField
          icon={MdEmail}
          name='email'
          type='email'
          placeholder='Email (opcional)'
          value={formData.email}
          onChange={handleChange}
        />

        {/* BOTONES */}
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

/* ==================== STYLES ==================== */
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 25px;
  background-color: ${({ theme }) => theme.bgtgderecha};
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 480px;
  max-width: 95%;
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
