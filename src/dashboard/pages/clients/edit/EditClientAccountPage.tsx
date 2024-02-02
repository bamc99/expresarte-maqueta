import { masterApi } from "@/api"
import { AuthContext } from "@/auth/context/AuthContext"
import { Icons } from "@/components/icons"
import { StaticAlert } from "@/components/ui/StaticAlert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useFetchClient } from "@/dashboard/hooks/useFetchClient"
import { EditClientLayout } from "@/dashboard/layouts/EditClientLayout"
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EditClientAccountPage = () => {
  const { user: authUser } = useContext(AuthContext);

  let { clientId } = useParams();
  const id = clientId ? parseInt(clientId, 10) : 0;
  const { client, isLoading: loadingUser } = useFetchClient({ id: id });

  const [storeError, setStoreError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;

    if (form.checkValidity()) {

      console.log('valid form');

      const formData = {
        name: form.nameClient.value,
        email: form.email.value,
        password: form.password.value,
        password_confirmation: form.password_confirmation.value,
      }
      const filteredFormData = Object.fromEntries(
        Object.entries(formData).filter(([value]) => value !== undefined && value !== '' && value !== null)
      );
      let response;
      try {
        const { data } = await masterApi.put(`/client/update-account/${clientId}`, filteredFormData, {
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
      if (response?.message == 'Cliente actualizado exitosamente') {
        setStoreError(false);
        navigate('/clientes');
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
    <EditClientLayout>
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
                <Label htmlFor="nameClient">Nombre</Label>
                <Input
                  id="nameClient"
                  defaultValue={client?.name}
                  type="string"
                />
              </div>
              <div
                className="space-y-1">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={client?.email}
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
              <div className="col-span-2 space-y-2">
                <Button className="w-full" disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Actualizar cliente
                </Button>
                {
                  storeError ? (
                    <StaticAlert title="Mmh." message="Tuvimos un problema al actualizar el cliente" type="error" />
                  ) : (
                    ''
                  )
                }
              </div>
            </div>
          </form>
        </div>

      </div>
    </EditClientLayout>
  )
}
