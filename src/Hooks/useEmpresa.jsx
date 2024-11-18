import { useQuery } from 'react-query';
import axios from 'axios';
import apiClient from '../api/apiClient';

const traerEmpresas = async () => {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };

  const { data } = await apiClient.get('empresas', config);
  return data;
};

const useEmpresas = () => {
  return useQuery('empresas', traerEmpresas);
};

export default useEmpresas;
