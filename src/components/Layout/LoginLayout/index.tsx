import React, { Fragment } from 'react'
import Header from './Header'

export const LoginLayout = ({children}:any) => {
  return (
    <div>
      <Header/>
      {children}
    </div>
  )
}
