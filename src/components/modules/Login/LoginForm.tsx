/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import InputPassword from '@/components/common/Input/InputPassword';
import InputField from '@/components/common/Input/InputField';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useLoginUser } from '@/hooks/Services/User/useLoginUser';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useTokenStore } from '@/store/tokenStore';

const userLoginScheme = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email format' })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'),
  password: z.string({ required_error: 'Password is required' }),
});

type UserLoginFormValues = z.infer<typeof userLoginScheme>;

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [form, setForm] = useState<Partial<UserLoginFormValues>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof UserLoginFormValues, string>>>({});

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const router = useRouter();

  const { mutate: loginUser, isPending } = useLoginUser();
  const { login } = useAuthStore();
  const { setToken } = useTokenStore();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    const result = userLoginScheme.safeParse(form);

    if (!result.success) {
      const validationErrors = result.error.errors.reduce(
        (acc, error) => ({
          ...acc,
          [error.path[0]]: error.message,
        }),
        {}
      );
      setErrors(validationErrors);
      return;
    }

    loginUser(result.data, {
      onSuccess: (res) => {
        login(res.user);
        setToken(res.token);

        toast.success('Login successful');
        router.push('/dashboard');
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || 'Terjadi kesalahan, silakan coba beberapa saat lagi.'
        );
      },
    });
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="max-w-[450px] min-w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold">Get Started Now</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <div className="font-bold">Email Address</div>
                <InputField
                  name="email"
                  placeholder="Enter your email"
                  onChange={onChange}
                  error={errors.email}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <div className="font-bold">Password</div>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-medium underline-offset-4 font-bold hover:underline text-[#D84D26]"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <InputPassword
                  name="password"
                  placeholder="Enter your password"
                  onChange={onChange}
                  error={errors.password}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full font-bold text-lg"
                onClick={(e) => handleLogin(e)}
                disabled={isPending}
              >
                {isPending ? <Loader2 className="animate-spin" /> : 'Login'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
