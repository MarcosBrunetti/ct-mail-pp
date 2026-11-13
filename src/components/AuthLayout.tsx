import { Outlet } from "react-router";

import CtLogo2 from "../assets/ctlogo2.png"

export function AuthLayout() {
    return (
        <div className="w-screen min-h-screen p-4 bg-orange-ct flex flex-col justify-center items-center text-gray-100">
            <main className="bg-black-ct rounded-[20px] flex items-center justify-center flex-col w-full max-w-[875px] md:min-h-[600px] px-6 py-10">
                <img src={CtLogo2} alt="logo" className="w-full max-w-[512px] h-auto mb-6 mt-0 -translate-y-6" />
                <div className="w-full max-w-[472px]">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

