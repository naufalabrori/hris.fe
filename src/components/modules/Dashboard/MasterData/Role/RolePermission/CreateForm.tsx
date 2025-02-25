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
import { useCreateUpdateRolePermission } from '@/hooks/Services/RolePermission/useCreateUpdateRolePermission';
import { toast } from 'react-toastify';
import { useListPermission } from '@/hooks/Services/Permission/useGetPermissions';
import Autocomplete from '@/components/common/AutoComplete/Autocomplete';

const RolePermissionSchema = z.object({
  roleId: z.string({ required_error: 'Role is required' }).min(1, 'Role is required'),
  permissionId: z
    .string({ required_error: 'Permission is required' })
    .min(1, 'Permission is required'),
});

type RolePermissionFormValues = z.infer<typeof RolePermissionSchema>;

export function CreateRolePermissionForm({ roleId }: { roleId: string }) {
  const [form, setForm] = useState<Partial<RolePermissionFormValues>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof RolePermissionFormValues, string>>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Control dialog visibility
  const queryClient = useQueryClient();

  const { mutate, isPending } = useCreateUpdateRolePermission();

  const handleSubmit = () => {
    form.roleId = roleId;
    const result = RolePermissionSchema.safeParse(form);

    if (!result.success) {
      // Collect and display validation errors
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
            queryKey: ['get-list-role-permission'],
          });
          toast('Role Permission Created Successfully', { type: 'success' });
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
    sortBy: 'permissionName',
    isDesc: false,
  };

  const { data: listPermission } = useListPermission(params);

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
          <DialogTitle>Create Role Permission</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Permission</div>
          <div className="col-span-3">
            <Autocomplete
              label="Permission"
              placeholder="Select Permission..."
              data={
                listPermission?.data.map((item) => ({
                  value: [item.id?.toString()],
                  label: item.permissionName,
                })) || []
              }
              selectedValue={form?.permissionId}
              onSelect={(currentValue) => {
                setForm((prev) => ({
                  ...prev,
                  permissionId: currentValue,
                }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  permissionId: undefined,
                }));
              }}
              error={errors.permissionId}
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
