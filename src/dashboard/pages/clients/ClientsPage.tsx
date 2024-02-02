import { buttonVariants } from "@/components/ui/button"
import { ClientsTable } from "@/dashboard/components/clients/ClientsTable"
import { cn } from "@/lib/utils"
import { NavLink } from "react-router-dom"

export const ClientsPage = () => {
  return (
    <div className="space-y-4">
      <div className="flex">
        <NavLink
          to={'/clients/new'}
          className={cn(
            buttonVariants({ variant: 'default' }),
            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white ms-auto"
          )}
        >
          <span>
            Registrar cliente
          </span>
        </NavLink>
      </div>
      <ClientsTable />
    </div>
  )
}
