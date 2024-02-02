import { masterApi } from "@/api"
import { Icons } from "@/components/icons"
import { StaticAlert } from "@/components/ui/StaticAlert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useFetchBranches } from "@/dashboard/hooks/useFetchBranches"
import { EditUserLayout } from "@/dashboard/layouts/EditUserLayout"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const EditUserAccountPage = () => {


  const userString = localStorage.getItem('user');
  if (!userString) {
    // Manejar la situación en la que no hay usuario en localStorage
    return null; // o lanzar un error, dependiendo de tu lógica
  }
  const user = JSON.parse(userString);

  const { branches } = useFetchBranches();
  const roles = [
    { value: "Admin", label: "Administrador" },
    { value: "Director", label: "Director" },
    { value: "Gerente", label: "Gerente" },
    { value: "Recepcionista", label: "Recepcionista" },
    { value: "CYT", label: "CYT" },
    { value: "Marketing", label: "Marketing" },
    { value: "Estilista", label: "Estilista" },
    { value: "Auxiliar", label: "Auxiliar" },
  ]

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
        first_name: form.first_name.value,
        middle_name: form.middle_name.value,
        last_name: form.last_name.value,
        second_last_name: form.second_last_name.value,
        email: form.email.value,
        password: form.password.value,
        street: form.street.value,
        house_number: form.house_number.value,
        neighborhood: form.neighborhood.value,
        city: form.city.value,
        state: form.state.value,
        postal_code: form.postal_code.value,
        country: form.country.value,
        phone: form.phone.value,
        emergency_name: form.emergency_name.value,
        emergency_phone: form.emergency_phone.value,
        emergency_relationship: form.emergency_relationship.value,
        date_of_birth: form.date_of_birth.value,
        date_of_hire: form.date_of_hire.value,
        nss: form.nss.value,
        branch_id: selectedBranch,
        roles: selectedRole
      }
      let response;
      try {
        const { data } = await masterApi.post('/user/create', formData, {
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
      if (response?.message == 'Usuario registrado exitosamente') {
        setStoreError(false);
        navigate('/users');
      } else {
        setIsLoading(false);
        setStoreError(true);
      }

    } else {
      setIsLoading(false);
      setStoreError(true);
    }

  }

  return (
    <EditUserLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Cuenta</h3>
          <p className="text-sm text-muted-foreground">
            Datos para inicio de sesión
          </p>
        </div>
        <Separator />
        <div>
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-3">

              <div
                className="space-y-1">
                <Label htmlFor="nameUser">Nombre</Label>
                <Input
                  id="nameUser"
                  defaultValue={user.name}
                  type="string"
                  required
                />
              </div>
              <div
                className="space-y-1">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user.email}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  placeholder="••••••"
                  type="password"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                <Input
                  id="password_confirmation"
                  placeholder="••••••"
                  type="password"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="branch_id">Sucursal</Label>
                <Select name="branch_id" onValueChange={setSelectedBranch}>
                  <SelectTrigger className="w-full" id="branch_id">
                    <SelectValue placeholder="Seleccione una sucursal" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectGroup>
                      <SelectLabel>Sucursales disponibles</SelectLabel>
                      {
                        branches.map((branch) => (
                          <SelectItem key={branch.id} value={`${branch.id}`}>{branch.name}</SelectItem>
                        ))
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="roles">Rol</Label>
                <Select name="roles" onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-full" id="roles">
                    <SelectValue placeholder="Seleccione un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles disponibles</SelectLabel>
                      {
                        roles.map((rol) => (
                          <SelectItem key={rol.value} value={`${rol.value}`}>{rol.label}</SelectItem>
                        ))
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Button className="w-full" disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Actualizar usuario
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
        </div>

      </div>
    </EditUserLayout>
  )
}
