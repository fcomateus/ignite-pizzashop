import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { toast } from "sonner"

import { Helmet } from "react-helmet-async"

import { useForm } from 'react-hook-form'
import { z as zod} from 'zod'
import { Link, useNavigate } from "react-router-dom"

const signUpForm = zod.object({
    restaurantName: zod.string(),
    managerName: zod.string(),
    phone: zod.string(),
    email: zod.string().email()
})

type SignUpForm = zod.infer<typeof signUpForm>

export function SignUp() {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>()

    async function handleSignUp(data: SignUpForm) {
        try {

            await new Promise(resolve => setTimeout(resolve, 2000))
            toast.success('Restaurante cadastrado com sucesso.', {
                action: {
                    label: 'Login',
                    onClick: () => navigate('/sign-in')
                }
            })
            
        } catch (error) {
            toast.error('Erro ao cadastrar restaurante.')
        }
    }

    return (
        <>
            <Helmet title="Cadastro" />
            <div className="p-8">

                <Button variant="ghost" asChild className="absolute right-8 top-8">
                    <Link to='/sign-in'>
                        Fazer login
                    </Link>
                </Button>

                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Criar conta grátis</h1>
                        <p className="text-sm text-muted-foreground">Seja um parceiro e comece suas vendas!</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
                        
                        <div className="space-y-2">
                            <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
                            <Input id="restaurantName" type="text" {...register('restaurantName')}/>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="managerName">Seu nome</Label>
                            <Input id="managerName" type="text" {...register('managerName')}/>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input id="email" type="email" {...register('email')}/>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Seu celular</Label>
                            <Input id="phone" type="tel" {...register('phone')}/>
                        </div>

                        <Button className="w-full" type="submit" disabled={isSubmitting}>
                            Finalizar cadastro
                        </Button>

                        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                            Ao continuar, você concorda com nossos {' '}
                            <a className="underline underline-offset-4" href="">termos de serviço</a> e {' '}
                            <a className="underline underline-offset-4" href="A">políticas de privacidade</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
    
}