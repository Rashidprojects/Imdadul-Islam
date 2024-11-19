import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div className="flex gap-4 items-center justify-center text-2xl">
        <button onClick={() => navigate('admin-portal')}>Admin</button>
        <button onClick={() => navigate('user-dashboard')}>Dashboard</button>
        <button onClick={() => navigate('home')}>Home</button>
    </div>
  )
}

export default Navbar