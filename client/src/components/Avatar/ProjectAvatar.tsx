/* eslint-disable @next/next/no-img-element */
// Why disabled:
// avatars.dicebear.com provides svg avatars
// next/image needs dangerouslyAllowSVG option for that

import React, { ReactNode } from 'react'

type Props = {
  projectName: string
  className?: string
  children?: ReactNode
}

export default function ProjectAvatar({
  projectName,
  className = '',
  children,
}: Props) {
  const avatarImage = `https://api.dicebear.com/7.x/initials/svg?seed=${projectName}`

  return (
    <div className={className}>
      <img
        src={avatarImage}
        alt={projectName}
        className="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800"
      />
      {children}
    </div>
  )
}
