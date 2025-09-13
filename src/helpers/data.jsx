import { AiOutlineHome, AiOutlineApartment } from 'react-icons/ai'
import { MdOutlineAnalytics, MdLogout } from 'react-icons/md'
import { TbReportSearch } from 'react-icons/tb'
import { LiaProjectDiagramSolid } from 'react-icons/lia'
import { CiSettings } from 'react-icons/ci'

export const linksArray = [
  {
    label: 'Home',
    icon: <AiOutlineHome />,
    to: 'home',
  },
  {
    label: 'Estadisticas',
    icon: <MdOutlineAnalytics />,
    to: 'estadisticas',
  },
  {
    label: 'Productos',
    icon: <AiOutlineApartment />,
    to: 'productos',
  },
  {
    label: 'Diagramas',
    icon: <LiaProjectDiagramSolid />,
    to: 'diagramas',
  },
  {
    label: 'Reportes',
    icon: <TbReportSearch />,
    to: 'reportes',
  },
]

export const secondaryLinksArray = [
  {
    label: 'Configuraciones',
    icon: <CiSettings />,
    to: 'settings',
  },
  {
    label: 'Salir',
    icon: <MdLogout />,
    to: 'out',
  },
]
