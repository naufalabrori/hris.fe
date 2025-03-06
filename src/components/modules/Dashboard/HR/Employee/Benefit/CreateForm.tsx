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
import { useCreateUpdateBenefit } from '@/hooks/Services/HumanResource/Benefit/useCreateUpdateBenefit';
import { toast } from 'react-toastify';
import InputField from '@/components/common/Input/InputField';
import DatePicker from '@/components/common/DatePicker/DatePicker';

const BenefitSchema = z.object({
  employeeId: z.string({ required_error: 'Employee is required' }),
  benefitType: z
    .string({ required_error: 'Benefit Type is required' })
    .min(1, 'Benefit Type is required'),
  startDate: z.date({ required_error: 'Start Date is required' }),
  endDate: z.date({ required_error: 'End Date is required' }),
  details: z.string().optional(),
});

type BenefitFormValues = z.infer<typeof BenefitSchema>;

export function CreateBenefitForm({ employeeId }: { employeeId: string }) {
  const [form, setForm] = useState<Partial<BenefitFormValues>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof BenefitFormValues, string>>>({});
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

  const { mutate, isPending } = useCreateUpdateBenefit();

  const handleSubmit = () => {
    form.employeeId = employeeId;
    const result = BenefitSchema.safeParse(form);

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
            queryKey: ['get-list-benefit'],
          });
          toast('Benefit Created Successfully', { type: 'success' });
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
      <DialogContent className="sm:max-w-xl max-h-full overflow-scroll">
        <DialogHeader className="mb-2">
          <DialogTitle>Create Benefit</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-4">Benefit Type</div>
          <div className="col-span-12 md:col-span-8">
            <InputField
              placeholder="Insert Benefit Type"
              type="text"
              name="benefitType"
              value={form.benefitType || ''}
              onChange={onChange}
              error={errors.benefitType}
            />
          </div>
          <div className="col-span-12 md:col-span-4">Start Date</div>
          <div className="col-span-12 md:col-span-8">
            <DatePicker
              placeholder="Select Start Date"
              value={form.startDate}
              onChange={(date) => {
                setForm((prev) => ({
                  ...prev,
                  startDate: date,
                }));
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
              placeholder="Select End Date"
              value={form.endDate}
              onChange={(date) => {
                setForm((prev) => ({
                  ...prev,
                  endDate: date,
                }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  endDate: undefined,
                }));
              }}
              error={errors.endDate}
            />
          </div>
          <div className="col-span-12 md:col-span-4">Details</div>
          <div className="col-span-12 md:col-span-8">
            <InputField
              placeholder="Insert Details"
              type="text"
              name="details"
              value={form.details || ''}
              onChange={onChange}
              error={errors.details}
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
