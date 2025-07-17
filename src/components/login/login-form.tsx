import { cn } from '@/lib/utils';
import Button from '@/components/Atoms/Button';
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
      name: formData.get('email'),
      email: formData.get('email'),
      password: formData.get('password'),
    };
    try {
      const res = await fetch('/api/auth0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      const result = await res.json();
      if (result.error) {
        setErrorMsg(result.error);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setErrorMsg('Error de red o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card className='overflow-hidden bg-white'>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-6 my-10 mx-5'>
              <div className='flex flex-col items-center text-center gap-2'>
                <h1 className='text-2xl font-bold'>Iniciar Sesión</h1>
                <p className='text-balance text-muted-foreground'>Ingresa tus credenciales para acceder a tu cuenta</p>
              </div>
              <div className='grid gap-6'>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input id='email' name='email' type='email' placeholder='test@example.com' required />
                </div>
                <div className='grid gap-2'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>Password</Label>
                    <a href='#' className='ml-auto text-sm underline-offset-2 hover:underline text-primary'>
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Input id='password' name='password' type='password' required />
                </div>
                </div>
              <Button type='submit' className='w-full'>
                Iniciar Sesión
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
