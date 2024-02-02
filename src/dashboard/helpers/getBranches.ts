import { masterApi } from "@/api"

export const getBranches = async () => {

    const userString = localStorage.getItem('user');
    if (!userString) {
      // Manejar la situación en la que no hay usuario en localStorage
      return null; // o lanzar un error, dependiendo de tu lógica
    }
    const user = JSON.parse(userString);

    const { data = {} } = await masterApi.get('/branch',{
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });
    console.log(data);
    return data;
}

