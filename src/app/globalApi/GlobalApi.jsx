'use client'
import { useQuery } from '@tanstack/react-query';
import AxiosPublic from '../useAxiosHook/AxiosPublic';

const GlobalApi = () => {
    const useAxios = AxiosPublic()
    const { data: allData = [], error, isLoading, refetch } = useQuery({
        queryKey: ['globalApi'],
        queryFn: async () => {
            const res = await useAxios.get('/api/allBlog')
            console.log('globalApi', res);
            return res.data
        }
    })
    console.log('globalApi', allData);
    return [allData, isLoading, error]

};

export default GlobalApi;