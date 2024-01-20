import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import masterApi from "../../api/master.api";
import { StaticAlert } from "../../components/ui/StaticAlert";

export const ResetPassword = () => {
    const { token } = useParams();
    const [isValidToken, setIsValidToken] = useState(false);
    const [changed, setChanged] = useState({
        type: 'idle',
        title: 'No hay mensaje',
        message: '',
    });

    useEffect(() => {
        const verifyToken = async () => {

            try {
                const { data: response } = await masterApi.get(`/auth/reset-password/validate-token/${token}`);
                if (response.valid) {
                    // Token válido
                    setIsValidToken(true);
                } else {
                    // Token inválido
                    setIsValidToken(false);
                }
            } catch (error) {
                setIsValidToken(false);
                console.error(error);
                return;
            }
        };
        verifyToken();
    }, [token]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const form = e.target as HTMLFormElement;
        if (form.checkValidity()) {
            console.log('valid form');

            const formData = {
                token,
                password: form.password.value,
                password_confirmation: form.confirmPassword.value,
            }
            let response;
            try {
                const { data } = await masterApi.post('/auth/reset-password', formData);
                response = data;
            } catch (error) {
                setChanged({
                    type: 'error',
                    title: 'Error',
                    message: 'Ocurrió un error, intenta de nuevo más tarde.',
                });
                return;
            }
            if (response?.status == 'success') {
                setChanged({
                    type: 'success',
                    title: '¡Listo!',
                    message: 'La contraseña se ha restablecido correctamente, vuelve a iniciar sesión.',
                });
            } else {
                setChanged({
                    type: 'error',
                    title: 'Error',
                    message: response?.message ? response.message : 'Ocurrió un error, intenta de nuevo más tarde.',
                });
            }
        }

    }

    return (
        <div>
            {isValidToken ? (
                <>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white my-2">
                        Restablece tu contraeña
                    </h1>
                    <p className="mb-5 dark:text-slate-300 text-gray-900 text-sm">
                        Ingresa tu nueva contraseña. Mínimo 6 carácteres.
                    </p>
                    <form className="space-y-4 md:space-y-4" onSubmit={onSubmit}>
                        {
                            changed.type != 'success' && (
                                <>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña:</label>
                                        <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••" minLength={6} required />
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar contraseña:</label>
                                        <input type="password" name="confirmPassword" id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" minLength={6} placeholder="••••••" required />
                                    </div>
                                </>
                            )
                        }

                        {
                            changed.type != 'idle' && <StaticAlert type={changed.type} title={changed.title} message={changed.message} />
                        }
                        {
                            changed.type == 'success' && <div>
                                <Link to="/login" className="w-full block text-white bg-black hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-yellow dark:hover:bg-yellow-300 dark:focus:ring-yellow-800">Volver al login</Link>
                            </div>
                        }
                        {
                            changed.type != 'success' && (
                                <button
                                    className="w-full text-black bg-primary-yellow hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-yellow dark:hover:bg-yellow-300 dark:focus:ring-yellow-800">
                                    Restablecer mi contraseña
                                </button>
                            )
                        }
                    </form>
                </>
            ) : (
                <>
                    <StaticAlert type="error" title="Error" message="El token es inválido o ha expirado." />
                    <div>
                        <Link to="/forgot-password" className="w-full block text-white bg-black hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-yellow dark:hover:bg-yellow-300 dark:focus:ring-yellow-800">Volver a intentar</Link>
                    </div>
                </>

            )}
        </div>
    );
};
