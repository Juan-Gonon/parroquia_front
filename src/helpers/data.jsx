import { AiOutlineHome } from 'react-icons/ai'
import {
  MdLogout,
  MdOutlineChurch,
  MdEventAvailable,
  MdOutlineLeaderboard,
} from 'react-icons/md'
import { TbFishChristianity, TbReportSearch } from 'react-icons/tb'
import { LiaDoveSolid } from 'react-icons/lia'
// import { CiSettings } from 'react-icons/ci'
import { FaPersonPraying } from 'react-icons/fa6'
import { FaPrayingHands } from 'react-icons/fa'
import { GrGroup } from 'react-icons/gr'

export const linksArray = [
  {
    label: 'Home',
    icon: <AiOutlineHome />,
    to: 'home',
  },
  {
    label: 'Personal',
    icon: <FaPersonPraying />,
    to: 'parish-staff',
  },
  {
    label: 'Comunidad',
    icon: <MdOutlineChurch />,
    to: 'communities',
  },
  {
    label: 'Eventos',
    icon: <MdEventAvailable />,
    to: 'event',
  },
  {
    label: 'Ministros',
    icon: <MdOutlineLeaderboard />,
    to: 'comunity-leader',
  },
  {
    label: 'Feligres',
    icon: <TbFishChristianity />,
    to: 'feligreses',
  },
  {
    label: 'Intencion',
    icon: <FaPrayingHands />,
    to: 'intention',
  },
  {
    label: 'Ministerio',
    icon: <LiaDoveSolid />,
    to: 'ministry',
  },
  {
    label: 'Liturgia',
    icon: <TbReportSearch />,
    to: 'liturgy-turns',
  },
  {
    label: 'Grupos',
    icon: <GrGroup />,
    to: 'service-group',
  },
]

export const secondaryLinksArray = [
  // {
  //   label: 'Configuraciones',
  //   icon: <CiSettings />,
  //   to: 'settings',
  // },
  {
    label: 'Salir',
    icon: <MdLogout />,
    to: 'out',
  },
]
