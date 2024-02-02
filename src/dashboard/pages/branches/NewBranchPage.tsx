import { masterApi } from "@/api";
import { Icons } from "@/components/icons";
import { StaticAlert } from "@/components/ui/StaticAlert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewBranchPage = () => {

  const userString = localStorage.getItem('user');
  if (!userString) {
    // Manejar la situación en la que no hay usuario en localStorage
    return null; // o lanzar un error, dependiendo de tu lógica
  }
  const user = JSON.parse(userString);

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
        name: form.branchName.value,
        street: form.street.value,
        house_number: form.house_number.value,
        neighborhood: form.neighborhood.value,
        city: form.city.value,
        state: form.state.value,
        postal_code: form.postal_code.value,
        country: form.country.value
      }
      let response;
      try {
        const { data } = await masterApi.post('/branch/create', formData, {
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
      if (response?.message == 'Sucursal creada con éxito') {
        setStoreError(false);
        navigate('/branches');
      } else {
        setIsLoading(false);
        setStoreError(true);
      }

    } else {
      setIsLoading(false);

      setStoreError(true);
    }

  }

  const fields = [
    { id: 'branchName', label: 'Nombre', type: 'text', placeholder: 'Nombre de la Sucursal' },
    { id: 'street', label: 'Calle', type: 'text', placeholder: 'Nombre de la Calle' },
    { id: 'house_number', label: 'Número de Casa', type: 'text', placeholder: 'Número de la Casa' },
    { id: 'neighborhood', label: 'Colonia', type: 'text', placeholder: 'Nombre de la Colonia' },
    { id: 'city', label: 'Ciudad', type: 'text', placeholder: 'Nombre de la Ciudad' },
    { id: 'state', label: 'Estado', type: 'text', placeholder: 'Nombre del Estado' },
    { id: 'postal_code', label: 'Código Postal', type: 'text', placeholder: 'Código Postal' },
    { id: 'country', label: 'País', type: 'text', placeholder: 'Nombre del País' },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            Registrar una nueva sucursal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-3">
              {
                fields.map((field) => (
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
                  Crear sucursal
                </Button>
                {
                  storeError ? (
                    <StaticAlert title="Mmh." message="Tuvimos un problema al intentar registrar la sucursal" type="error" />
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
