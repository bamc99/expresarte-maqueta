import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import masterApi from "../../api/master.api";
import { StaticAlert } from "../../components/ui/StaticAlert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export const LoginPage = () => {

  const { login } = useContext(AuthContext);

  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    // const form = e.currentTarget;
    if (form.checkValidity()) {
      console.log('valid form');

      const formData = {
        email: form.email.value,
        password: form.password.value
      }
      let response;
      try {
        const { data } = await masterApi.post('/auth/login', formData);
        response = data;
      } catch (error) {
        setLoginError(true);
        setIsLoading(false);
        return;
      }
      if (response?.token) {
        setLoginError(false);
        const userResponse = {
          id: response.user.id,
          name: response.user.name,
          fullname: response.user.full_name,
          email: response.user.email,
          profileImage: response.user.profile_image_url,
          token: response.token.accessToken,
          expires: response.token.expiresAt,
          role_names: response.user.role_names
        };
        login(userResponse);
        navigate('/');
      } else {
        setLoginError(true);
      }

    }

  }

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Iniciar sesión
        </h1>
        <p className="text-sm text-muted-foreground">
          Ingresa tu email y contraseña para iniciar sesión
        </p>
      </div>
      <div className="grid gap-6">
        <form onSubmit={onLogin}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@expresarte.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                required
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="email">
                Pasword
              </Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                autoCorrect="off"
                required
              />
            </div>

            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Iniciar sesión
            </Button>
            {
              loginError ? (
                <StaticAlert title="Mmh." message="El usuario o la contraseña son incorrectos" type="error" />
              ) : (
                ''
              )
            }
          </div>

          <div className="text-end">
            <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">¿Olvidaste tu contraseña?</Link>
          </div>

        </form>
      </div>
    </>
  )
}
