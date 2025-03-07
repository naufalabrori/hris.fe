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
import { useCreateUpdateLeave } from '@/hooks/Services/Activity/Leave/useCreateUpdateLeave';
import { toast } from 'react-toastify';
import { Leave } from '@/types/Activity/Leave/type';
import InputField from '@/components/common/Input/InputField';
import DatePicker from '@/components/common/DatePicker/DatePicker';

const LeaveSchema = z.object({
  leaveType: z
    .string({ required_error: 'Leave Type is required' })
    .min(1, 'Leave Type is required'),
  startDate: z.date({ required_error: 'Start Date is required' }),
  endDate: z.date({ required_error: 'End Date is required' }),
  status: z.string({ required_error: 'Status is required' }).min(1, 'Status is required'),
  employeeId: z
    .string({ required_error: 'Employee ID is required' })
    .min(1, 'Employee ID is required'),
});

type LeaveFormValues = z.infer<typeof LeaveSchema>;

export function UpdateLeaveForm({ data }: { data: Leave }) {
  const [form, setForm] = useState<Partial<LeaveFormValues>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof LeaveFormValues, string>>>({});
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

  const { mutate, isPending } = useCreateUpdateLeave(data?.id);

  const handleSubmit = () => {
    form.startDate = form.startDate && new Date(form.startDate);
    form.endDate = form.endDate && new Date(form.endDate);

    const result = LeaveSchema.safeParse(form);

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
            queryKey: ['get-list-leave'],
          });
          toast('Leave Updated Successfully', { type: 'success' });
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
          className="bg-yellow-500 hover:bg-yellow-600"
          onClick={() => {
            setIsDialogOpen(true);
          }}
        >
          <PenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-full overflow-scroll">
        <DialogHeader className="mb-2">
          <DialogTitle>Update Leave</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-4">Leave Type</div>
          <div className="col-span-12 md:col-span-8">
            <InputField
              placeholder="Insert Leave Type"
              type="text"
              name="leaveType"
              value={form.leaveType || ''}
              onChange={onChange}
              error={errors.leaveType}
            />
          </div>
          <div className="col-span-12 md:col-span-4">Start Date</div>
          <div className="col-span-12 md:col-span-8">
            <DatePicker
              placeholder="Insert Start Date"
              value={form.startDate}
              onChange={(date) => {
                setForm((prev) => ({ ...prev, startDate: date }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  startDate: undefined,
                }));
              }}
              error={errors.startDate}
            />
          </div>
          <div className="col-span-12 md:col-span-4">End Date</div>
          <div className="col-span-12 md:col-span-8">
            <DatePicker
              placeholder="Insert End Date"
              value={form.endDate}
              onChange={(date) => {
                setForm((prev) => ({ ...prev, endDate: date }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  endDate: undefined,
                }));
              }}
              error={errors.endDate}
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
