import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { api } from "../services/api"
import { useNavigate } from "react-router"

import { useMutation } from "@tanstack/react-query"

import { Link } from "react-router"
import { Input } from "../components/input"
import { Button } from "../components/button"

import { AxiosError } from "axios"
import { useAuth } from "../hooks/useAuth"

import { Envelope, Lock } from "phosphor-react"

const SignInSchema = z.object({
    email: z.string().toLowerCase().email("E-mail inválido").refine((email) => email.endsWith("@ctjunior.com.br"), { message: "O final do emal deve conter: @ctjunior.com.br"}),
    password: z.string().trim().min(6, {message: "Senha deve ter no mínimo 6 dígitos"})
})

type SignInForm = z.infer<typeof SignInSchema>

export function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SignInForm>({
        resolver: zodResolver(SignInSchema)
    })

    const navigate = useNavigate()
    const { login } = useAuth()

    const mutation = useMutation({
        mutationFn: async (data: SignInForm) => {
            const response = await api.post("/login", {
                email: data.email,
                password: data.password
            })
            return response.data
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.token)
            login()
            navigate("/send-email")
        },

        onError: (error) => {
            if(error instanceof AxiosError){
                const message = error.response?.data?.message 
                alert(message)
            } else {
                alert("E-mail ou senha inválidos")
            }
        }
    })

    async function onSubmit(data: SignInForm) {
        mutation.mutate(data)
    }
    return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
        
        <div>
            <Input
                type="email"
                placeholder="Seu ct-mail"
                leftIcon={<Envelope size={20} />}
                className="pl-10"
                {...register("email")}
            />
            {errors.email && <span className="text-sm text-red-400">{errors.email.message}</span>}
        </div>

        <div>
            <Input
                type="password"
                placeholder="Digite a senha"
                leftIcon={<Lock size={16} />}
                className="pl-10"
                {...register("password")}
            />
            {errors.password && <span className="text-sm text-red-400">{errors.password.message}</span>}
        </div>
        
        <Button type="submit" disabled={isSubmitting}>
            Entrar
        </Button>
        
        <Link to="/signup" className="text-center mt-6 hover:text-orange-200 transition ease-linear">
        Não possui ct-mail? Clique aqui para criá-lo!
        </Link>
    </form>
    )
}