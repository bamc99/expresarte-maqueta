import { masterApi } from "@/api";
import { Icons } from "@/components/icons";
import { StaticAlert } from "@/components/ui/StaticAlert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useFetchBranches } from "@/dashboard/hooks/useFetchBranches";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewClientPage = () => {

    const { branches } = useFetchBranches();

    const userString = localStorage.getItem('user');
    if (!userString) {
        // Manejar la situación en la que no hay usuario en localStorage
        return null; // o lanzar un error, dependiendo de tu lógica
    }
    const user = JSON.parse(userString);

    const [storeError, setStoreError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);


    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const form = e.target as HTMLFormElement;

        if (form.checkValidity()) {

            console.log('valid form');

            const formData = {
                email: form.email.value,
                password: form.password.value,
                first_name: form.first_name.value,
                middle_name: form.middle_name.value,
                last_name: form.last_name.value,
                second_last_name: form.second_last_name.value,
                street: form.street.value,
                house_number: form.house_number.value,
                neighborhood: form.neighborhood.value,
                city: form.city.value,
                state: form.state.value,
                postal_code: form.postal_code.value,
                country: form.country.value,
                phone: form.phone.value,
                date_of_birth: form.date_of_birth.value,
                date_of_first_visit: form.date_of_first_visit.value,
            }
            let response;
            try {
                const { data } = await masterApi.post('/client/create', formData, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });

                response = data;
            } catch (error) {
                setStoreError(true);
                setIsLoading(false);
                return;
            }
            if (response?.message == 'Cliente registrado exitosamente') {
                setStoreError(false);
                navigate('/clients');
            } else {
                setIsLoading(false);
                setStoreError(true);
            }

        } else {
            setIsLoading(false);
            setStoreError(true);
        }

    }

    const userProfileFields = [
        { id: 'first_name', label: 'Primer Nombre', type: 'text', placeholder: 'Primer Nombre' },
        { id: 'middle_name', label: 'Segundo Nombre', type: 'text', placeholder: 'Segundo Nombre' },
        { id: 'last_name', label: 'Primer Apellido', type: 'text', placeholder: 'Primer Apellido' },
        { id: 'second_last_name', label: 'Segundo Apellido', type: 'text', placeholder: 'Segundo Apellido' },
        { id: 'street', label: 'Calle', type: 'text', placeholder: 'Calle' },
        { id: 'house_number', label: 'Número de Casa', type: 'text', placeholder: 'Número de Casa' },
        { id: 'neighborhood', label: 'Colonia', type: 'text', placeholder: 'Colonia' },
        { id: 'city', label: 'Ciudad', type: 'text', placeholder: 'Ciudad' },
        { id: 'state', label: 'Estado', type: 'text', placeholder: 'Estado' },
        { id: 'postal_code', label: 'Código Postal', type: 'text', placeholder: 'Código Postal' },
        { id: 'country', label: 'País', type: 'text', placeholder: 'País' },
        { id: 'phone', label: 'Teléfono', type: 'text', placeholder: 'Teléfono' },
        { id: 'date_of_birth', label: 'Fecha de Nacimiento', type: 'date', placeholder: 'Fecha de Nacimiento' },
        { id: 'date_of_first_visit', label: 'Fecha de Primera visita', type: 'date', placeholder: 'Fecha de Primera visita' },
    ];

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Registrar un nuevo cliente
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <div className="grid grid-cols-2 gap-3">
                            <h3 className="col-span-2 font-medium">Datos para el usuario</h3>
                            <div
                                className="space-y-1">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input
                                    id="email"
                                    placeholder="Correo Electrónico"
                                    type="email"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Contraseña</Label>
                                <Input
                                    id="password"
                                    placeholder="Contraseña"
                                    type="password"
                                    required
                                />
                            </div>
                            <Separator className="col-span-2" />
                            <h3 className="col-span-2 font-medium">Datos para el perfil del cliente</h3>
                            {
                                userProfileFields.map((field) => (
                                    <div
                                        key={field.id}
                                        className="space-y-1">
                                        <Label htmlFor={field.id}>{field.label}</Label>
                                        <Input
                                            id={field.id}
                                            placeholder={field.placeholder}
                                            type={field.type}
                                            autoCapitalize="true"
                                            autoCorrect="on"
                                            required
                                        />
                                    </div>
                                ))
                            }
                            <div className="col-span-2 space-y-2">
                                <Button className="w-full" disabled={isLoading}>
                                    {isLoading && (
                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Crear usuario
                                </Button>
                                {
                                    storeError ? (
                                        <StaticAlert title="Mmh." message="Tuvimos un problema al intentar registrar el usuario" type="error" />
                                    ) : (
                                        ''
                                    )
                                }
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
