import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useFetchProducts } from "@/dashboard/hooks/useFetchProducts";

export const ProductsTable = () => {

    const { products, isLoading } = useFetchProducts();

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
                            <TableHead>Contenido</TableHead>
                            <TableHead>Marca</TableHead>
                            <TableHead>Categoría</TableHead>
                            <TableHead>Fecha de creación</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>$ {product.price}</TableCell>
                                    <TableCell>{product.quantity} {product.unit}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>{product.category_name}</TableCell>
                                    <TableCell>{new Date(product.created_at).toLocaleString()}</TableCell>
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
