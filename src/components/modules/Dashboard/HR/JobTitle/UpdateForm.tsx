/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useCreateUpdateJobTitle } from '@/hooks/Services/HumanResource/JobTitle/useCreateUpdateJobTitle';
import { toast } from 'react-toastify';
import { JobTitle } from '@/types/HumanResource/JobTitle/type';
import InputField from '@/components/common/Input/InputField';
import { Switch } from '@/components/ui/switch';

const JobTitleSchema = z.object({
  title: z.string({ required_error: 'Job Name is required' }).min(1, 'JobTitle Name is required'),
  description: z.string().optional(),
  minSalary: z
    .number({ required_error: 'Minimum Salary is required' })
    .min(1, 'Minimum Salary is required'),
  maxSalary: z
    .number({ required_error: 'Maximum Salary is required' })
    .min(1, 'Maximum Salary is required'),
  isActive: z.boolean().optional(),
});

type JobTitleFormValues = z.infer<typeof JobTitleSchema>;

export function UpdateJobTitleForm({ data }: { data: JobTitle }) {
  const [form, setForm] = useState<Partial<JobTitleFormValues>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof JobTitleFormValues, string>>>({});
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

  const { mutate, isPending } = useCreateUpdateJobTitle(data?.id);

  const handleSubmit = () => {
    form.minSalary = Number(form.minSalary);
    form.maxSalary = Number(form.maxSalary);

    const result = JobTitleSchema.safeParse(form);

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
            queryKey: ['get-list-job-title'],
          });
          toast('JobTitle Updated Successfully', { type: 'success' });
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
          <DialogTitle>Update Job Title</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Job Name</div>
          <div className="col-span-3">
            <InputField
              placeholder="Insert Job Name"
              type="text"
              name="title"
              value={form.title || ''}
              onChange={onChange}
              error={errors.title}
            />
          </div>
          <div className="col-span-2">Description</div>
          <div className="col-span-3">
            <InputField
              placeholder="Insert Description"
              type="text"
              name="description"
              value={form.description || ''}
              onChange={onChange}
              error={errors.description}
            />
          </div>
          <div className="col-span-2">Min Salary</div>
          <div className="col-span-3">
            <InputField
              placeholder="Insert Min Salary"
              type="number"
              name="minSalary"
              value={form.minSalary || ''}
              onChange={onChange}
              error={errors.minSalary}
            />
          </div>
          <div className="col-span-2">Max Salary</div>
          <div className="col-span-3">
            <InputField
              placeholder="Insert Max Salary"
              type="number"
              name="maxSalary"
              value={form.maxSalary || ''}
              onChange={onChange}
              error={errors.maxSalary}
            />
          </div>
          <div className="col-span-2">Is Active</div>
          <div className="col-span-3">
            <Switch
              checked={form?.isActive}
              name="isActive"
              onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isActive: checked }))}
              negativeText="No"
              positiveText="Yes"
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
