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
import { useCreateUpdateJobTitle } from '@/hooks/Services/HumanResource/JobTitle/useCreateUpdateJobTitle';
import { toast } from 'react-toastify';
import InputField from '@/components/common/Input/InputField';

const JobTitleSchema = z.object({
  title: z.string({ required_error: 'Job Name is required' }).min(1, 'JobTitle Name is required'),
  description: z.string().optional(),
  minSalary: z
    .number({ required_error: 'Minimum Salary is required' })
    .min(1, 'Minimum Salary is required'),
  maxSalary: z
    .number({ required_error: 'Maximum Salary is required' })
    .min(1, 'Maximum Salary is required'),
});

type JobTitleFormValues = z.infer<typeof JobTitleSchema>;

export function CreateJobTitleForm() {
  const [form, setForm] = useState<Partial<JobTitleFormValues>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof JobTitleFormValues, string>>>({});
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

  const { mutate, isPending } = useCreateUpdateJobTitle();

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
          toast('JobTitle Created Successfully', { type: 'success' });
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
          <DialogTitle>Create Job Title</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-4">Job Name</div>
          <div className="col-span-12 md:col-span-8">
            <InputField
              placeholder="Insert Job Name"
              type="text"
              name="title"
              value={form.title || ''}
              onChange={onChange}
              error={errors.title}
            />
          </div>
          <div className="col-span-12 md:col-span-4">Description</div>
          <div className="col-span-12 md:col-span-8">
            <InputField
              placeholder="Insert Description"
              type="text"
              name="description"
              value={form.description || ''}
              onChange={onChange}
              error={errors.description}
            />
          </div>
          <div className="col-span-12 md:col-span-4">Min Salary</div>
          <div className="col-span-12 md:col-span-8">
            <InputField
              placeholder="Insert Min Salary"
              type="number"
              name="minSalary"
              value={form.minSalary || ''}
              onChange={onChange}
              error={errors.minSalary}
            />
          </div>
          <div className="col-span-12 md:col-span-4">Max Salary</div>
          <div className="col-span-12 md:col-span-8">
            <InputField
              placeholder="Insert Max Salary"
              type="number"
              name="maxSalary"
              value={form.maxSalary || ''}
              onChange={onChange}
              error={errors.maxSalary}
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
