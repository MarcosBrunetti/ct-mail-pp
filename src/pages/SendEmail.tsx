import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { api } from "../services/api"
import { useNavigate } from "react-router"

import { useMutation } from "@tanstack/react-query"

import { Input } from "../components/input"
import { Button } from "../components/button"

import { AxiosError } from "axios"

import { Envelope, Pencil } from "phosphor-react"

const sendEmailSchema = z.object({
    email: z.string().email("E-mail inválido"),
    title: z.string().trim().min(1, { message: "Informe o título" }),
    content: z.string().trim().min(1, { message: "Informe o conteúdo" }),
})

type SendEmailForm = z.infer<typeof sendEmailSchema>

export function SendEmail() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SendEmailForm>({
        resolver: zodResolver(sendEmailSchema)
    })

    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: async (data: SendEmailForm) => {
            const token = localStorage.getItem("token")
            const response = await api.post("/email", {
                destinatarioEmail: data.email,
                title: data.title,
                content: data.content
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        },
        onSuccess: () => {
            alert("E-mail enviado com sucesso!")
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                const message = error.response?.data?.message
                alert(message)
            } else {
                alert("Não foi possível enviar o e-mail")
            }
        }
    })

    async function onSubmit(data: SendEmailForm) {
        mutation.mutate(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full max-w-[864px] mx-auto px-4 sm:px-6">
            <h2 className="text-lg font-semibold text-gray-900">Enviar e-mail</h2>

            <div className="flex flex-col gap-8">
                <div>
                    <Input
                        type="email"
                        placeholder="Ct-mail destinatário"
                        variant="light"
                        leftIcon={<Envelope size={20} />}
                        className="pl-10"
                        {...register("email")}
                    />
                    {errors.email && <span className="text-sm text-red-400">{errors.email.message}</span>}
                </div>

                <div>
                    <Input
                        placeholder="Título"
                        variant="light"
                        leftIcon={<Pencil size={20} />}
                        className="pl-10"
                        {...register("title")}
                    />
                    {errors.title && <span className="text-sm text-red-400">{errors.title.message}</span>}
                </div>

                <div>
                    <textarea
                        placeholder="Conteúdo..."
                        className="w-full h-[363px] border border-orange-ct resize-none bg-gray-100"
                        {...register("content")}
                    />
                    {errors.content && <span className="text-sm text-red-400">{errors.content.message}</span>}
                </div>

                <div className="flex items-end gap-2">
                    <Button type="submit" disabled={isSubmitting} className="bg-orange-ct hover:bg-orange-700 h-12 w-full border rounded-2xl">
                        Enviar
                    </Button>
                </div>
            </div>
        </form>
    )
}
