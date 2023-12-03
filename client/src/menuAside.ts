import {
  mdiAccountCircle,
  mdiMonitor,
  mdiSquareEditOutline,
  mdiTable,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiBook,
  mdiShoppingOutline,
  mdiAccount,
  mdiOfficeBuilding,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    href: '/projects',
    label: 'Projecten',
    icon: mdiBook,
  },
  {
    href: '/customers',
    label: 'Klanten',
    icon: mdiOfficeBuilding,
  },
  {
    href: '/profile',
    label: 'Profiel',
    icon: mdiAccountCircle,
  },
]

export default menuAside
