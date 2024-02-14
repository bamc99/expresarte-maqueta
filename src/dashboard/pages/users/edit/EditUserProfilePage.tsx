import { masterApi } from "@/api"
import { AuthContext } from "@/auth/context/AuthContext"
import { Icons } from "@/components/icons"
import { StaticAlert } from "@/components/ui/StaticAlert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useFetchUser } from "@/dashboard/hooks/useFetchUser"
import { EditUserLayout } from "@/dashboard/layouts/EditUserLayout"
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EditUserProfilePage = () => {
  const { user: authUser } = useContext(AuthContext);

  let { userId } = useParams();
  const id = userId ? parseInt(userId, 10) : 0;
  const { user, isLoading: loadingUser } = useFetchUser({ id: id });

  const [storeError, setStoreError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const initialProfileValues = {
    first_name: user?.profile?.first_name,
    middle_name: user?.profile?.middle_name,
    last_name: user?.profile?.last_name,
    second_last_name: user?.profile?.second_last_name,
    street: user?.profile?.street,
    house_number: user?.profile?.house_number,
    neighborhood: user?.profile?.neighborhood,
    city: user?.profile?.city,
    state: user?.profile?.state,
    postal_code: user?.profile?.postal_code,
    country: user?.profile?.country,
    phone: user?.profile?.phone,
    emergency_name: user?.profile?.emergency_name,
    emergency_phone: user?.profile?.emergency_phone,
    emergency_relationship: user?.profile?.emergency_relationship,
    date_of_birth: user?.profile?.date_of_birth,
    date_of_hire: user?.profile?.date_of_hire,
    nss: user?.profile?.nss
  };

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
        user_id: userId,
        branch_id: user?.profile?.branch_id ?? "1"
      }
      const filteredFormData = Object.fromEntries(
        Object.entries(formData).filter(([value]) => value !== undefined && value !== '' && value !== null)
      );
      let response;
      try {
        const { data } = await masterApi.put(`/user/update-profile/${userId}`, filteredFormData, {
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
      if (response?.message == 'Perfil actualizado exitosamente') {
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
  const userProfileFields = [
    { id: 'first_name', label: 'Primer Nombre', type: 'text', placeholder: 'Primer Nombre', value: initialProfileValues.first_name },
    { id: 'middle_name', label: 'Segundo Nombre', type: 'text', placeholder: 'Segundo Nombre', value: initialProfileValues.middle_name },
    { id: 'last_name', label: 'Primer Apellido', type: 'text', placeholder: 'Primer Apellido', value: initialProfileValues.last_name },
    { id: 'second_last_name', label: 'Segundo Apellido', type: 'text', placeholder: 'Segundo Apellido', value: initialProfileValues.second_last_name },
    { id: 'street', label: 'Calle', type: 'text', placeholder: 'Calle', value: initialProfileValues.street },
    { id: 'house_number', label: 'Número de Casa', type: 'text', placeholder: 'Número de Casa', value: initialProfileValues.house_number },
    { id: 'neighborhood', label: 'Colonia', type: 'text', placeholder: 'Colonia', value: initialProfileValues.neighborhood },
    { id: 'city', label: 'Ciudad', type: 'text', placeholder: 'Ciudad', value: initialProfileValues.city },
    { id: 'state', label: 'Estado', type: 'text', placeholder: 'Estado', value: initialProfileValues.state },
    { id: 'postal_code', label: 'Código Postal', type: 'text', placeholder: 'Código Postal', value: initialProfileValues.postal_code },
    { id: 'country', label: 'País', type: 'text', placeholder: 'País', value: initialProfileValues.country },
    { id: 'phone', label: 'Teléfono', type: 'text', placeholder: 'Teléfono', value: initialProfileValues.phone },
    { id: 'emergency_name', label: 'Nombre de contacto de Emergencia', type: 'text', placeholder: 'Nombre de Emergencia', value: initialProfileValues.emergency_name },
    { id: 'emergency_phone', label: 'Teléfono de Emergencia', type: 'text', placeholder: 'Teléfono de Emergencia', value: initialProfileValues.emergency_phone },
    { id: 'emergency_relationship', label: 'Parentezco de Emergencia', type: 'text', placeholder: 'Relación de Emergencia', value: initialProfileValues.emergency_relationship },
    { id: 'date_of_birth', label: 'Fecha de Nacimiento', type: 'date', placeholder: 'Fecha de Nacimiento', value: initialProfileValues.date_of_birth },
    { id: 'date_of_hire', label: 'Fecha de Contratación', type: 'date', placeholder: 'Fecha de Contratación', value: initialProfileValues.date_of_hire },
    { id: 'nss', label: 'Número de Seguro Social', type: 'text', placeholder: 'Número de Seguro Social', value: initialProfileValues.nss },
  ];

  return (
    <EditUserLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium flex justify-between items-center">
            Perfil
            {loadingUser && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
          </h3>
          <p className="text-sm text-muted-foreground">
            Datos de identificación
          </p>
        </div>
        <Separator />
        <div>
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-3">
              {
                userProfileFields.map((field) => (
                  <div
                    key={field.id}
                    className="space-y-1">
                    <Label htmlFor={field.id}>{field.label}</Label>
                    <Input
                      id={field.id}
                      value={field.value}
                      type={field.type}
                    />
                  </div>
                ))
              }
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
