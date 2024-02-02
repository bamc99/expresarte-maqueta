import { UsersTable } from "../../components/users/UsersTable"
import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"



export const UsersPage = () => {

  return (
    <div className="space-y-4">
      <div className="flex">
        <NavLink
          to={'/users/new'}
          className={cn(
            buttonVariants({ variant: 'default' }),
            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white ms-auto"
          )}
        >
          <span>
            Crear Usuario
          </span>
        </NavLink>
      </div>
      <UsersTable />
    </div>
  )
}