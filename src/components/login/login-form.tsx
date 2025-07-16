import { cn } from '@/lib/utils';
import Button from '@/components/Atoms/Button';
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginForm() {
  return (
    <div>
      <Card className='overflow-hidden bg-white'>
        <CardContent>
          <form>
            <div className='flex flex-col gap-6 my-10 mx-5'>
              <div className='flex flex-col items-center text-center gap-2'>
                <h1 className='text-2xl font-bold'>Iniciar Sesión</h1>
                <p className='text-balance text-muted-foreground'>Ingresa tus credenciales para acceder a tu cuenta</p>
              </div>
              <div className='grid gap-6'>
                <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email' placeholder='test@example.com' required />
                </div>
                <div className='grid gap-2'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>Password</Label>
                    <a href='#' className='ml-auto text-sm underline-offset-2 hover:underline text-primary'>
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Input id='password' type='password' required />
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
