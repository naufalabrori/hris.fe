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
import { useCreateUpdateTraining } from '@/hooks/Services/HumanResource/Training/useCreateUpdateTraining';
import { toast } from 'react-toastify';
import { Training } from '@/types/HumanResource/Training/type';
import InputField from '@/components/common/Input/InputField';
import { Switch } from '@/components/ui/switch';
import DatePicker from '@/components/common/DatePicker/DatePicker';

const TrainingSchema = z.object({
  trainingName: z
    .string({ required_error: 'Training Name is required' })
    .min(1, 'Training Name is required'),
  description: z
    .string({ required_error: 'Description is required' })
    .min(1, 'Description is required'),
  startDate: z.date({ required_error: 'Start Date is required' }),
  endDate: z.date({ required_error: 'End Date is required' }),
  trainer: z.string({ required_error: 'Trainer is required' }).min(1, 'Trainer is required'),
  isActive: z.boolean().optional(),
});

type TrainingFormValues = z.infer<typeof TrainingSchema>;

export function UpdateTrainingForm({ data }: { data: Training }) {
  const [form, setForm] = useState<Partial<TrainingFormValues>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof TrainingFormValues, string>>>({});
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

  const { mutate, isPending } = useCreateUpdateTraining(data?.id);

  const handleSubmit = () => {
    form.startDate = form.startDate && new Date(form.startDate?.toString());
    form.endDate = form.endDate && new Date(form.endDate?.toString());
    const result = TrainingSchema.safeParse(form);

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
            queryKey: ['get-list-training'],
          });
          toast('Training Updated Successfully', { type: 'success' });
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
            setErrors({});
          }}
        >
          <PenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-full overflow-scroll">
        <DialogHeader className="mb-2">
          <DialogTitle>Update Job Title</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-4">Training Name</div>
          <div className="col-span-12 md:col-span-8">
            <InputField
              placeholder="Insert Training Name"
              type="text"
              name="trainingName"
              value={form.trainingName || ''}
              onChange={onChange}
              error={errors.trainingName}
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
          <div className="col-span-12 md:col-span-4">Trainer</div>
          <div className="col-span-12 md:col-span-8">
            <InputField
              placeholder="Insert Trainer"
              type="text"
              name="trainer"
              value={form.trainer || ''}
              onChange={onChange}
              error={errors.trainer}
            />
          </div>
          <div className="col-span-12 md:col-span-4">Is Active</div>
          <div className="col-span-12 md:col-span-8">
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
