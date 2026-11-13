import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {  z }  from "zod"

import { api } from "../services/api"
import { useNavigate } from "react-router"

import { useMutation } from "@tanstack/react-query"

import { Link } from "react-router"
import { Input } from "../components/input"
import { Button } from "../components/button"

import { AxiosError } from "axios"

import { User, Envelope, Lock } from "phosphor-react"

const signUpSchema = z.object({
    name: z.string().trim().min(1, { message: "Informe o nome" }),
    email: z.string().toLowerCase().email("E-mail inválido").refine((email) => email.endsWith("@ctjunior.com.br"), { message: "O final do emal deve conter: @ctjunior.com.br"}),
    password: z.string().trim().min(6, { message: "Senha deve ter no mínimo 6 dígitos"}),
    passwordConfirm: z.string().trim().min(1, "Confirme a senha"),
})
.refine((data) => data.password === data.passwordConfirm, {
    message: "As senhas são diferentes",
    path: ["passwordConfirm"],
}
)
type SignUpForm = z.infer<typeof signUpSchema>
  
export function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpForm>({
        resolver: zodResolver(signUpSchema)
    })

    const navigate = useNavigate() 

    const mutation = useMutation({
        mutationFn: async (data: SignUpForm) => {
             await api.post("/user", {
                name: data.name,
                email: data.email,
                password: data.password,
        })
    },
    onSuccess: () => {
        if(confirm("Usuário cadastrado com sucesso!")){
            navigate("/")
        }
    },
    onError: (error) => {
        if (error instanceof AxiosError)
            return alert(error.response?.data.message)

            return alert("Não foi possível cadastrar!")
        }
    })

    async function onSubmit(data: SignUpForm) {
        mutation.mutate(data)
    }

    return (
    <div className="w-full max-w-[620px] p-6"> 
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">

            <div>
                <Input
                    placeholder="Nome"
                    leftIcon={<User size={20} />}
                    className="pl-10"
                    {...register("name")}
                />
                {errors.name && <span className="text-sm text-red-400">{errors.name.message}</span>}
            </div>

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

            <div>
                <Input
                    type="password"
                    placeholder="Confirme a senha"
                    leftIcon={<Lock size={16} />}
                    className="pl-10"
                    {...register("passwordConfirm")}
                />
                {errors.passwordConfirm && <span className="text-sm text-red-400">{errors.passwordConfirm.message}</span>}
            </div>

            <Button type="submit" disabled={isSubmitting}>
                Cadastrar
            </Button>

            <Link to="/" className="text-center mt-4 hover:text-orange-200 transition ease-linear">
            Já possui cadastro
            </Link>
        
        </form>
    </div>
    )
}