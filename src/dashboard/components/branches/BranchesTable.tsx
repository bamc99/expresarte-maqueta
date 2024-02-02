import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useFetchBranches } from "@/dashboard/hooks/useFetchBranches";

export const BranchesTable = () => {

    const { branches, isLoading } = useFetchBranches();

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
                            <TableHead>Dirección</TableHead>
                            <TableHead>Fecha de creación</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            branches.map((branch) => (
                                <TableRow key={branch.id}>
                                    <TableCell>{branch.id}</TableCell>
                                    <TableCell>{branch.name}</TableCell>
                                    <TableCell>{ `${branch.street} ${branch.house_number}, ${branch.neighborhood}, ${branch.city}, ${branch.state}` }</TableCell>
                                    <TableCell>{new Date(branch.created_at).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Button>Editar</Button>
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
