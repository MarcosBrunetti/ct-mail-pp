import { Outlet, NavLink, useNavigate } from "react-router"

import CtLogo from "../assets/ctlogo1.png"
import { useAuth } from "../hooks/useAuth"

import { HouseSimple, PaperPlaneRight, Envelope, User, SignOut } from "phosphor-react"

export function AccountLayout() {
    const navigate = useNavigate()
    const { logout } = useAuth()

    const handleLogout = () => {
        localStorage.removeItem("token")
        logout()
        navigate("/")
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 flex flex-col md:flex-row gap-4 items-stretch">

            <aside className="md:flex-1 flex-col w-full lg:w-[300px] max-w-[330px] bg-white rounded-[24px] border border-black-ct shadow-sm">

                <div className="flex items-center gap-4 p-8 border-b border-gray-50">
                    <img src={CtLogo} alt="logo" className="w-full max-w-[300px] object-contain" />
                </div>

                <nav className="flex-1 px-8 py-6 flex flex-col gap-6 font-semibold">
                    <NavLink to="/" className={({ isActive }) => isActive
                        ? "flex items-center gap-4 px-4 py-4 text-orange-600 bg-orange-50 rounded-xl font-medium text-[20px]"
                        : "flex items-center gap-4 px-4 py-4 text-gray-600 hover:bg-gray-50 hover:text-orange-600 rounded-xl font-medium transition-colors text-[20px]"
                    }>
                        <HouseSimple size={20} />
                        Entrada
                    </NavLink>

                    <NavLink to="/enviados" className={({ isActive }) => isActive
                        ? "flex items-center gap-4 px-4 py-4 text-orange-600 bg-orange-50 rounded-xl font-medium text-[20px]"
                        : "flex items-center gap-4 px-4 py-4 text-gray-600 hover:bg-gray-50 hover:text-orange-600 rounded-xl font-medium transition-colors text-[20px]"
                    }>
                        <PaperPlaneRight size={20} />
                        Enviados
                    </NavLink>

                    <NavLink to="/send-email" className={({ isActive }) => isActive
                        ? "flex items-center gap-4 px-4 py-4 text-orange-600 bg-orange-50 rounded-xl font-medium text-[20px]"
                        : "flex items-center gap-4 px-4 py-4 text-gray-600 hover:bg-gray-50 hover:text-orange-600 rounded-xl font-medium transition-colors text-[20px]"
                    }>
                        <Envelope size={20} />
                        Enviar e-mail
                    </NavLink>

                    <NavLink to="/perfil" className={({ isActive }) => isActive
                        ? "flex items-center gap-4 px-4 py-4 text-orange-600 bg-orange-50 rounded-xl font-medium text-[20px]"
                        : "flex items-center gap-4 px-4 py-4 text-gray-600 hover:bg-gray-50 hover:text-orange-600 rounded-xl font-medium transition-colors text-[20px]"
                    }>
                        <User size={20} />
                        Editar perfil
                    </NavLink>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-4 py-4 text-orange-600 hover:bg-orange-50 rounded-xl font-medium transition-colors border border-orange-100 mt-4 text-[20px]"
                    >
                        <SignOut size={20} />
                        Sair
                    </button>
                </nav>

            </aside>

            
            <main className="md:flex-1 bg-white rounded-[24px] p-8 shadow-sm border border-gray-100">
                <Outlet />
            </main>

        </div>
    )
}
