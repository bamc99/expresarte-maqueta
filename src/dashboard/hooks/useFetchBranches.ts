import { useEffect, useState } from "react";
import { getBranches } from "../helpers/getBranches";

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

interface FetchBranchesResult {
  branches: Branch[];
  isLoading: boolean;
  error?: string; // Agrega un campo para el mensaje de error opcional
}

export const useFetchBranches = (): FetchBranchesResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [error, setError] = useState<string | undefined>();

  const getBranchesData = async () => {
    try {
      const data = await getBranches();
      setBranches(data.branches);
    } catch (error) {
      console.error('Error al obtener las sucursales', error);
      setError('Error al obtener los sucursales');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBranchesData();
  }, []);

  return {
    branches,
    isLoading,
    error
  };
};