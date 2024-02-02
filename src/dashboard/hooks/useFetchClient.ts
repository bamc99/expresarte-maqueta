import { useEffect, useState } from "react";
import { getClient } from "../helpers/getClient";


interface FetchClientResult {
  client?: Client;
  isLoading: boolean;
  error?: string; // Agrega un campo para el mensaje de error opcional
}
interface Client {
  id: number;
  name: string;
  email: string;
  email_verified_at: null;
  verification_token: null;
  is_active: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  profile?: Profile | null;
}

export const useFetchClient = ({ id }: { id: number }): FetchClientResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [client, setClient] = useState<Client>({
    id: 0,
    name: "",
    email: '',
    email_verified_at: null,
    verification_token: null,
    is_active: 1,
    deleted_at: null,
    created_at: '',
    updated_at: '',
    profile: undefined,
  });
  const [error, setError] = useState<string | undefined>();

  const getUserData = async () => {
    try {
      const data = await getClient({ id });
      setClient(data.client);
    } catch (error) {
      console.error('Error al obtener el cliente', error);
      setError('Error al obtener el cliente');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return {
    client,
    isLoading,
    error
  };
};

export interface Profile {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  second_last_name: string;
  street: string;
  house_number: string;
  neighborhood: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
  date_of_birth: string;
  date_of_first_visit: string;
  client_id: number;
  created_at: string;
  updated_at: string;
}
