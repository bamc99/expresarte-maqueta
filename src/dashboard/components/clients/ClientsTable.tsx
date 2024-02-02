import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useFetchClients } from "@/dashboard/hooks/useFetchClients";

export const ClientsTable = () => {

    const { clients, isLoading } = useFetchClients();

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
                            <TableHead>Fecha de creación</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            clients.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell>{client.id}</TableCell>
                                    <TableCell>{client.name}</TableCell>
                                    <TableCell>{client.email}</TableCell>
                                    <TableCell>{client.profile?.phone ?? 'No disponible'}</TableCell>
                                    <TableCell>{new Date(client.created_at).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <NavLink
                                            to={`/clients/edit/account/${client.id}`}
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
