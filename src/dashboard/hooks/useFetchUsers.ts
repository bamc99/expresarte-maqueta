import { useEffect, useState } from "react";
import { getUsers } from "../helpers/getUsers";

interface User {
  id:                 number;
  name:               string;
  email:              string;
  email_verified_at:  null;
  verification_token: null;
  passcode:           null;
  is_active:          number;
  deleted_at:         null;
  created_at:         string;
  updated_at:         string;
  role_names:         string[];
  profile:            Profile | null;
}

export interface Profile {
  id:                     number;
  first_name:             string;
  middle_name:            string;
  last_name:              string;
  second_last_name:       string;
  street:                 string;
  house_number:           string;
  neighborhood:           string;
  city:                   string;
  state:                  string;
  postal_code:            string;
  country:                string;
  phone:                  string;
  emergency_name:         string;
  emergency_phone:        string;
  emergency_relationship: string;
  date_of_birth:          string;
  date_of_hire:           string;
  last_work_date:         null;
  nss:                    string;
  user_id:                number;
  branch_id:              number;
  created_at:             string;
  updated_at:             string;
  branch:                 Branch;
}

export interface Branch {
  id:           number;
  name:         string;
  street:       string;
  house_number: string;
  neighborhood: string;
  city:         string;
  state:        string;
  postal_code:  string;
  country:      string;
  created_at:   string;
  updated_at:   string;
}

interface FetchUsersResult {
  users: User[];
  isLoading: boolean;
  error?: string; // Agrega un campo para el mensaje de error opcional
}

export const useFetchUsers = (): FetchUsersResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | undefined>();

  const getUsersData = async () => {
    try {
      const data = await getUsers();
      setUsers(data.users);
    } catch (error) {
      console.error('Error al obtener los usuarios', error);
      setError('Error al obtener los usuarios');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return {
    users,
    isLoading,
    error
  };
};



