'use client'

import { LuUser } from 'react-icons/lu'
import { IoStatsChart } from 'react-icons/io5'
import { FaRegNewspaper } from 'react-icons/fa'
import { RiSaveLine } from 'react-icons/ri'

interface SettingsIconProps {
  iconType: 'user' | 'newspaper' | 'save' | 'stats'
}

const ICON_MAP = {
  user: LuUser,
  newspaper: FaRegNewspaper,
  save: RiSaveLine,
  stats: IoStatsChart,
} as const

export const SettingsIcon = ({ iconType }: SettingsIconProps) => {
  const IconComponent = ICON_MAP[iconType]
  return <IconComponent className="icono-seccion" />
}
