import { NavLink } from "react-router-dom"
import { BranchesTable } from "../../components/branches/BranchesTable"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export const BranchesPage = () => {
  return (
    <div className="space-y-4">
      <div className="flex">
        <NavLink
          to={'/branches/new'}
          className={cn(
            buttonVariants({ variant: 'default' }),
            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white ms-auto"
          )}
        >
          <span>
            Crear sucursal
          </span>
        </NavLink>
      </div>

      <BranchesTable />
    </div>
  )
}
