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
import { useState } from 'react';
import { z } from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateUpdateUserRole } from '@/hooks/Services/MasterData/UserRole/useCreateUpdateUserRole';
import { toast } from 'react-toastify';
import { useListRole } from '@/hooks/Services/MasterData/Role/useGetRoles';
import Autocomplete from '@/components/common/AutoComplete/Autocomplete';

const UserRoleSchema = z.object({
  roleId: z.string({ required_error: 'Role is required' }).min(1, 'Role is required'),
  userId: z.string({ required_error: 'User is required' }).min(1, 'User is required'),
});

type UserRoleFormValues = z.infer<typeof UserRoleSchema>;

export function CreateUserRoleForm({ userId }: { userId: string }) {
  const [form, setForm] = useState<Partial<UserRoleFormValues>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof UserRoleFormValues, string>>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useCreateUpdateUserRole();

  const handleSubmit = () => {
    form.userId = userId;
    const result = UserRoleSchema.safeParse(form);

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
      mutate(form, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['get-list-user-role'],
          });
          toast('User Role Created Successfully', { type: 'success' });
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
      setErrors({});
      setIsDialogOpen(false); // Close dialog after success
    }
  };

  const params: any = {
    limit: 1000,
    sortBy: 'roleName',
    isDesc: false,
  };

  const { data: listRole } = useListRole(params);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="mb-2"
          onClick={() => {
            setIsDialogOpen(true);
            setForm({});
            setErrors({});
          }}
        >
          <PlusIcon />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="mb-2">
          <DialogTitle>Create Role User Role</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-4">Role</div>
          <div className="col-span-12 md:col-span-8">
            <Autocomplete
              label="Role"
              isModal
              placeholder="Select Role..."
              data={
                listRole?.data.map((item) => ({
                  value: [item.id?.toString()],
                  label: item.roleName,
                })) || []
              }
              selectedValue={form?.roleId}
              onSelect={(currentValue) => {
                setForm((prev) => ({
                  ...prev,
                  roleId: currentValue,
                }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  roleId: undefined,
                }));
              }}
              error={errors.roleId}
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
