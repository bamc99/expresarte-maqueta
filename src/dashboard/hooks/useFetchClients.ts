import { useEffect, useState } from "react";
import { getClients } from "../helpers/getClients";

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  email_verified_at: null;
  verification_token: null;
  passcode: null;
  is_active: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  profile: Profile | null;
}

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
  
  date_of_birth: string;
  date_of_first_visit: string;
  client_id: number;
  created_at: string;
  updated_at: string;
}

interface FetchClientsResult {
  clients: Client[];
  isLoading: boolean;
  error?: string; // Agrega un campo para el mensaje de error opcional
}

export const useFetchClients = (): FetchClientsResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState<string | undefined>();

  const getUsersData = async () => {
    try {
      const data = await getClients();
      setClients(data.clients);
    } catch (error) {
      console.error('Error al obtener los clientes', error);
      setError('Error al obtener los clientes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return {
    clients,
    isLoading,
    error
  };
};



