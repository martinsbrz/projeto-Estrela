'use client';

import { NextUIProvider } from "@nextui-org/system"
import LogOff from "../ui/logoff"
import NavBar from "../ui/navbar"

export default function Layout (
  {
    children
  } : {
    children: React.ReactNode
  }
) {
  return (
    <main className="main main-home">
      <div className="display-container">
        <NextUIProvider>
          <div className="main-children">{children}</div>
        </NextUIProvider>
      </div>
      <NavBar />
    </main>
  )
}