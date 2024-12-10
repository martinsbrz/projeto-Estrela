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
        <LogOff />
        <div className="main-children">{children}</div>
      </div>
      <NavBar />
    </main>
  )
}