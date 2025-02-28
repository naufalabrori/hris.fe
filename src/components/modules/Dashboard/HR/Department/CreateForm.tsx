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
import { useCreateUpdateDepartment } from '@/hooks/Services/HumanResource/Department/useCreateUpdateDepartment';
import { toast } from 'react-toastify';
import InputField from '@/components/common/Input/InputField';
import { useListEmployee } from '@/hooks/Services/HumanResource/Employee/useGetEmployee';
import Autocomplete from '@/components/common/AutoComplete/Autocomplete';

const DepartmentSchema = z.object({
  departmentName: z
    .string({ required_error: 'Department Name is required' })
    .min(1, 'Department Name is required'),
  location: z.string({ required_error: 'Location is required' }).min(1, 'Location is required'),
  managerId: z.string().optional(),
});

type DepartmentFormValues = z.infer<typeof DepartmentSchema>;

export function CreateDepartmentForm() {
  const [form, setForm] = useState<Partial<DepartmentFormValues>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof DepartmentFormValues, string>>>({});
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

  const { mutate, isPending } = useCreateUpdateDepartment();

  const handleSubmit = () => {
    const result = DepartmentSchema.safeParse(form);

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
            queryKey: ['get-list-department'],
          });
          toast('Department Created Successfully', { type: 'success' });
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
    sortBy: 'firstName',
    isDesc: false,
  };

  const { data: listEmployee } = useListEmployee(params);

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
          <DialogTitle>Create Department</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Department Name</div>
          <div className="col-span-3">
            <InputField
              placeholder="Insert Department Name"
              type="text"
              name="departmentName"
              value={form.departmentName || ''}
              onChange={onChange}
              error={errors.departmentName}
            />
          </div>
          <div className="col-span-2">Location</div>
          <div className="col-span-3">
            <InputField
              placeholder="Insert Location"
              type="text"
              name="location"
              value={form.location || ''}
              onChange={onChange}
              error={errors.location}
            />
          </div>
          <div className="col-span-2">Manager</div>
          <div className="col-span-3">
            <Autocomplete
              label="Manager"
              placeholder="Select Manager..."
              data={
                listEmployee?.data.map((item) => ({
                  value: [item.id?.toString()],
                  label: item.firstName + ' ' + item.lastName + ' | ' + item.departmentName,
                })) || []
              }
              selectedValue={form?.managerId}
              onSelect={(currentValue) => {
                setForm((prev) => ({
                  ...prev,
                  managerId: currentValue,
                }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  managerId: undefined,
                }));
              }}
              error={errors.managerId}
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
