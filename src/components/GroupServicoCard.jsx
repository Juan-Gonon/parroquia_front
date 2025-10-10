import styled, { useTheme } from 'styled-components'
import { MdOutlineDescription, MdDelete, MdEdit } from 'react-icons/md'
import { FaHandsHelping } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { useGrupoServicioService } from '../hook/useGrupoService'

export const GrupoServicioCard = ({ grupo, handleSelect }) => {
  const theme = useTheme()
  const { deleteGrupoS } = useGrupoServicioService()
  const { id_grupo, nombre, descripcion, activo, ministerio } = grupo

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: '¿Eliminar grupo?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
    })

    if (confirm.isConfirmed) {
      try {
        await deleteGrupoS({ id: id_grupo })
        Swal.fire('Eliminado', 'Grupo eliminado correctamente', 'success')
      } catch {
        Swal.fire('Error', 'No se pudo eliminar el grupo', 'error')
      }
    }
  }

  return (
    <Card $theme={theme}>
      <ParishText>{ministerio}</ParishText>
      <Header>
        <FaHandsHelping color={theme.primary} size='1.4em' />
        <h2>{nombre}</h2>
      </Header>

      <Body>
        <p>{descripcion || 'Sin descripción'}</p>
        <Status $active={activo}>{activo ? 'Activo' : 'Inactivo'}</Status>
      </Body>
      <Footer>
        <IconButton onClick={() => handleSelect(grupo)}>
          <MdEdit size='1.4em' />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <MdDelete size='1.4em' />
        </IconButton>
      </Footer>
    </Card>
  )
}

const ParishText = styled.span`
  font-size: ${({ theme }) => theme.fontsm};
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  text-transform: uppercase;
  text-align: end;
  /* background: red; */
  display: block;
`

/* STYLES */
const Card = styled.div`
  background: ${({ theme }) => theme.bgtgderecha};
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  h3 {
    /* background: red; */
    text-align: end;
    /* display: inline-block; */
    color: ${({ theme }) => theme.textprimary};
    text-transform: uppercase;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  h2 {
    font-size: 1.1rem;
    margin: 0;
    color: ${({ theme }) => theme.textprimary};
  }
`

const Body = styled.div`
  margin-top: 10px;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  padding: 10px 5px;
`

const Status = styled.span`
  display: inline-block;
  margin-top: 10px;
  font-weight: 600;
  padding: 5px 20px;
  border-radius: 10px;
  background-color: ${({ $active }) =>
    $active ? 'rgba(46, 204, 113, 0.6)' : 'rgba(231, 76, 60, 0.6)'};
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px); /* soporte para Safari */
  border: 1px solid rgba(255, 255, 255, 0.3); /* opcional, para darle un borde suave */
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 10px;
  border-top: 1px solid ${({ theme }) => theme.bg3};
`

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
  &:hover {
    color: ${({ theme }) => theme.primary}cc;
  }
`
