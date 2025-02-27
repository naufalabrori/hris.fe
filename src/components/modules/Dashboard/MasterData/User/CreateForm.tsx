/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader2, PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ChangeEvent, useState } from 'react';
import { z } from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateUpdateUser } from '@/hooks/Services/MasterData/User/useCreateUpdateUser';
import { toast } from 'react-toastify';
import { EmployeeUserDataTable } from './CreateUser/DataTable';
import { Employee } from '@/types/HumanResource/Employee/type';
import InputField from '@/components/common/Input/InputField';

const UserEmployeeSchema = z.object({
  employeeId: z.string({ required_error: 'Employee is required' }).min(1, 'Employee is required'),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email format' }),
  username: z.string({ required_error: 'Username is required' }).min(1, 'Username is required'),
  password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
});

type UserEmployeeFormValues = z.infer<typeof UserEmployeeSchema>;

export function CreateUserForm() {
  const [form, setForm] = useState<Partial<UserEmployeeFormValues>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof UserEmployeeFormValues, string>>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const { mutate, isPending } = useCreateUpdateUser();

  const handleSubmit = () => {
    const payload = {
      employeeId: master?.id,
      email: master?.email,
      username: form.username,
      password: 'default',
    };

    const result = UserEmployeeSchema.safeParse(payload);

    if (!result.success) {
      const validationErrors = result.error.errors.reduce(
        (acc, error) => ({
          ...acc,
          [error.path[0]]: error.message,
        }),
        {}
      );
      setErrors(validationErrors);
    } else {
      mutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['get-list-user'],
          });
          toast('User Created Successfully', { type: 'success' });
        },
        onError: (error: any) => {
          toast(
            error?.response?.data?.message || 'Terjadi kesalahan, silakan coba beberapa saat lagi.',
            {
              type: 'error',
            }
          );
        },
      });
      // Clear form and errors
      setForm({});
      setMaster(null);
      setErrors({});
      setIsDialogOpen(false); // Close dialog after success
    }
  };

  const [master, setMaster] = useState<Employee | null>();

  const handleData = (data: Employee) => {
    setMaster(data);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="mb-2"
          onClick={() => {
            setIsDialogOpen(true);
            setMaster(null);
            setForm({});
            setErrors({});
          }}
        >
          <PlusIcon />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl lg:max-w-[1000px]">
        <DialogHeader className="mb-2">
          <DialogTitle>Create User</DialogTitle>
        </DialogHeader>
        <EmployeeUserDataTable dataMaster={handleData} />
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Email</div>
          <div className="col-span-3">
            <InputField placeholder="Insert email" value={master?.email || ''} readOnly disable />
          </div>
          <div className="col-span-2">Username</div>
          <div className="col-span-3">
            <InputField
              placeholder="Insert username"
              name="username"
              value={form.username || ''}
              onChange={onChange}
              error={errors.username}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="destructive" disabled={isPending}>
              Close
            </Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="mb-2 sm:mb-0"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="animate-spin" /> : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
