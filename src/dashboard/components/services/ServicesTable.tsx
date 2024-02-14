import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useFetchServices } from "@/dashboard/hooks/useFetchServices";

export const ServicesTable = () => {

    const { services, isLoading } = useFetchServices();

    return (
        <>
            {
                isLoading && (<h2>Cargando...</h2>)
            }

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">ID</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Categoría</TableHead>
                            <TableHead>Fecha de creación</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            services.map((service) => (
                                <TableRow key={service.id}>
                                    <TableCell>{service.id}</TableCell>
                                    <TableCell>{service.name}</TableCell>
                                    <TableCell>{service.description}</TableCell>
                                    <TableCell>$ {service.price}</TableCell>
                                    <TableCell>{service.duration} min</TableCell>
                                    <TableCell>{service.category_name}</TableCell>
                                    <TableCell>{new Date(service.created_at).toLocaleString()}</TableCell>
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
