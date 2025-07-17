import Button from '@/components/Atoms/Button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/router';
import { useState } from 'react';

type LoginResult =
  | { error: string }
  | { role: 'Admin' | 'ProjectManager' | 'Collaborator'; redirectTo: string };

export default function LoginForm() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      const result = (await res.json()) as LoginResult;

      if ('error' in result) {
        setErrorMsg(result.error);
      } else {
        // Si el backend ya nos dio la ruta, la usamos:
        if (result.redirectTo) {
          router.push(result.redirectTo);
        } else {
          // Si no, mapeamos según rol (¡rellena o ajusta estas rutas cuando existan!)
          if (result.role === 'Admin') {
            router.push('/dashboard');
          } else if (result.role === 'ProjectManager') {
            router.push('/');
          } else {
            router.push('/');
          }
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error de red o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card className="overflow-hidden bg-white">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 my-10 mx-5">
              <div className="flex flex-col items-center text-center gap-2">
                <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
                <p className="text-balance text-muted-foreground">
                  Ingresa tus credenciales para acceder a tu cuenta
                </p>
              </div>

              {/* Mensaje de error */}
              {errorMsg && (
                <div className="px-4 py-2 bg-red-100 text-red-700 rounded-md text-center">
                  {errorMsg}
                </div>
              )}

              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="test@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Cargando...' : 'Iniciar Sesión'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
