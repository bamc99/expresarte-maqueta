import { Separator } from "@/components/ui/separator"
import { EditUserSidebarNav } from "../components/users/EditUserSidebarNav"
import { useParams } from "react-router-dom"

interface SettingsLayoutProps {
    children: React.ReactNode
}

export const EditUserLayout = ({ children }: SettingsLayoutProps) => {
    let { userId } = useParams();

    const sidebarNavItems = [
        {
            title: "Perfil",
            href: "/users/edit/profile/"+userId,
        },
        {
            title: "Cuenta",
            href: "/users/edit/account/"+userId,
        },
    ]
    return (
        <div>
            <div className="hidden space-y-6 p-10 pb-16 md:block">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Configuración de usuario</h2>
                    <p className="text-muted-foreground">
                        Aquí puedes editar tu perfil y tu cuenta.
                    </p>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        <EditUserSidebarNav items={sidebarNavItems} />
                    </aside>
                    <div className="flex-1 lg:max-w-2xl">{children}</div>
                </div>
            </div>
        </div>
    )
}
