import { Link } from "react-router-dom"
import masterApi from "../../api/master.api";
import { useState } from "react";
import { StaticAlert } from "../../components/ui/StaticAlert";

export const ForgotPasswordPage = () => {

    const [sendStatus, setSendStatus] = useState({
        type: 'idle',
        title: 'No hay mensaje',
        message: '',
    });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const form = e.target as HTMLFormElement;
        if (form.checkValidity()) {
            console.log('valid form');

            const formData = {
                email: form.email.value,
            }
            let response;
            try {
                const { data } = await masterApi.post('/auth/forgot-password', formData);
                response = data;
            } catch (error) {
                setSendStatus({
                    type: 'error',
                    title: 'Error',
                    message: 'Ocurrió un error al enviar el correo, intenta de nuevo más tarde.',
                });
                return;
            }
            if (response?.status == 'success') {
                setSendStatus({
                    type: 'success',
                    title: 'Correo enviado',
                    message: 'Se ha enviado un correo con un enlace para restablecer tu contraseña.',
                });
            } else if (response?.status == 'not-found') {
                setSendStatus({
                    type: 'error',
                    title: 'No encontrado.',
                    message: response.message,
                });
            } else {
                setSendStatus({
                    type: 'error',
                    title: 'Error',
                    message: 'Ocurrió un error al enviar el correo, intenta de nuevo más tarde.',
                });
            }
        }

    }
    return (
        <>
            <Link to="/login" className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-400 transition-all">
                &lt;- Volver, ya me acordé
            </Link>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white my-2">
                Restablece tu contraeña
            </h1>
            <p className="mb-5 dark:text-slate-300 text-gray-900 text-sm">
                Ingresa la dirección de correo electrónico asociada a tu cuenta y te enviaremos un vínculo para restablecer tu contraseña.
            </p>
            <form className="space-y-4 md:space-y-4" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu correo:</label>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="tunombre@expresarte.com" required />
                </div>
                {
                    sendStatus.type != 'idle' && <StaticAlert type={sendStatus.type} title={sendStatus.title} message={sendStatus.message} />
                }
                <button
                    className="w-full text-black bg-primary-yellow hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-yellow dark:hover:bg-yellow-300 dark:focus:ring-yellow-800">
                    Enviar correo
                </button>
            </form>

        </>
    )
}
