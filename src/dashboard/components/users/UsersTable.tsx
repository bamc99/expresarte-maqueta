import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFetchUsers } from "../../hooks/useFetchUsers"
import { buttonVariants } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export const UsersTable = () => {

    const { users, isLoading } = useFetchUsers();

    return (
        <>
            {
                isLoading && (<h2>Cargando...</h2>)
            }

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Correo</TableHead>
                            <TableHead>Teléfono</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead>Sucursal</TableHead>
                            <TableHead>Fecha de creación</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.profile?.phone ?? 'No disponible'}</TableCell>
                                    <TableCell>{user.role_names[0]}</TableCell>
                                    <TableCell>{user.profile?.branch.name ?? 'No disponible'}</TableCell>
                                    <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <NavLink
                                            to={`/users/edit/account/${user.id}`}
                                            className={cn(
                                                buttonVariants({ variant: 'default' }),
                                                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white ms-auto"
                                            )}
                                        >
                                            <span>
                                                Editar
                                            </span>
                                        </NavLink>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
