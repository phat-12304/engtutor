import { Outlet } from 'react-router-dom'
import Header from './components/Header'

function App() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t bg-white">
        <div className="container-page py-6 text-sm text-gray-600 text-center">
          © {new Date().getFullYear()} EngTutor. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
