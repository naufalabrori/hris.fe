/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader2, PenIcon } from 'lucide-react';

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
import { ChangeEvent, useEffect, useState } from 'react';
import { z } from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateUpdatePermission } from '@/hooks/Services/MasterData/Permission/useCreateUpdatePermission';
import { toast } from 'react-toastify';
import InputField from '@/components/common/Input/InputField';
import { useListMenu } from '@/hooks/Services/MasterData/Menu/useGetMenus';
import Autocomplete from '@/components/common/AutoComplete/Autocomplete';
import { Permission } from '@/types/MasterData/Permission/type';

const PermissionSchema = z.object({
  permissionName: z
    .string({ required_error: 'Permission Name is required' })
    .min(1, 'Permission Name is required'),
  resource: z.string({ required_error: 'Resource is required' }).min(1, 'Resource is required'),
  action: z.string({ required_error: 'Action is required' }).min(1, 'Action is required'),
});

type PermissionFormValues = z.infer<typeof PermissionSchema>;

export function UpdatePermissionForm({ data }: { data: Permission }) {
  const [form, setForm] = useState<Partial<PermissionFormValues>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof PermissionFormValues, string>>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setForm(data);
  }, [data]);

  const queryClient = useQueryClient();

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const { mutate, isPending } = useCreateUpdatePermission(data.id);

  const handleSubmit = () => {
    const result = PermissionSchema.safeParse(form);

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
            queryKey: ['get-list-permission'],
          });
          toast('Permission Created Successfully', { type: 'success' });
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
    sortBy: 'menuName',
    isDesc: false,
  };

  const { data: listMenu } = useListMenu(params);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="mb-2 bg-yellow-500 hover:bg-yellow-600 mr-1"
          onClick={() => {
            setIsDialogOpen(true);
          }}
        >
          <PenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="mb-2">
          <DialogTitle>Update Permission</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Permission Name</div>
          <div className="col-span-3">
            <InputField
              placeholder="Insert Permission Name"
              type="text"
              name="permissionName"
              value={form?.permissionName || ''}
              onChange={onChange}
              error={errors.permissionName}
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Resource</div>
          <div className="col-span-3">
            <Autocomplete
              label="Menu"
              placeholder="Select Menu..."
              data={
                listMenu?.data.map((item) => ({
                  value: [item.menuName],
                  label: item.menuName,
                })) || []
              }
              selectedValue={form?.resource}
              onSelect={(currentValue) => {
                setForm((prev) => ({
                  ...prev,
                  resource: currentValue,
                }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  resource: undefined,
                }));
              }}
              error={errors.resource}
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Action</div>
          <div className="col-span-3">
            <InputField
              placeholder="Insert Action"
              type="text"
              name="action"
              value={form.action || ''}
              onChange={onChange}
              error={errors.action}
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
