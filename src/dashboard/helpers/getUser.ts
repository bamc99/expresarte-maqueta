import { masterApi } from "@/api"

export const getUser = async ({ id }: { id: number }) => {

    const userString = localStorage.getItem('user');
    if (!userString) {
        // Manejar la situación en la que no hay usuario en localStorage
        return null; // o lanzar un error, dependiendo de tu lógica
    }
    const user = JSON.parse(userString);

    const { data = {} } = await masterApi.get(`/user/${id}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });
    return data;
}

