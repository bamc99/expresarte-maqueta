import { masterApi } from "@/api"
import { AuthContext } from "@/auth/context/AuthContext"
import { Icons } from "@/components/icons"
import { StaticAlert } from "@/components/ui/StaticAlert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useFetchBranches } from "@/dashboard/hooks/useFetchBranches"
import { useFetchUser } from "@/dashboard/hooks/useFetchUser"
import { EditUserLayout } from "@/dashboard/layouts/EditUserLayout"
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EditUserAccountPage = () => {
  const { user: authUser } = useContext(AuthContext);

  let { userId } = useParams();
  const id = userId ? parseInt(userId, 10) : 0;
  const { user, isLoading: loadingUser } = useFetchUser({ id: id });

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
        name: form.nameUser.value,
        email: form.email.value,
        password: form.password.value,
        password_confirmation: form.password_confirmation.value,
        branch_id: selectedBranch,
        roles: selectedRole
      }
      const filteredFormData = Object.fromEntries(
        Object.entries(formData).filter(([value]) => value !== undefined && value !== '' && value !== null)
      );
      let response;
      try {
        const { data } = await masterApi.put(`/user/update-account/${userId}`, filteredFormData, {
          headers: {
            Authorization: `Bearer ${authUser?.token}`
          }
        });

        response = data;
      } catch (error) {
        setStoreError(true);
        setIsLoading(false);
        return;
      }
      if (response?.message == 'Usuario actualizado exitosamente') {
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
          <h3 className="text-lg font-medium flex justify-between items-center">
            Cuenta
            {loadingUser && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
          </h3>
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
                  defaultValue={user?.name}
                  type="string"
                />
              </div>
              <div
                className="space-y-1">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.email}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  placeholder="••••••"
                  type="password"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                <Input
                  id="password_confirmation"
                  placeholder="••••••"
                  type="password"
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
