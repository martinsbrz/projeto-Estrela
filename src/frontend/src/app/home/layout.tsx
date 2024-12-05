import 'normalize.css';
import LogOff from "../ui/tsx/logoff"
import BottomNavBar from "../ui/tsx/navbar"

export default function Layout (
  {
    children
  } : {
    children: React.ReactNode
  }
) {
  return (
    <main className="main" style={{paddingBottom: 0}}>
      <LogOff />
      <div>{children}</div>
      <BottomNavBar />
    </main>
  )
}