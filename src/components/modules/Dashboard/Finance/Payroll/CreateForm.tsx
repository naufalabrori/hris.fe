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
import { useCreateUpdatePayroll } from '@/hooks/Services/Finance/Payroll/useCreateUpdatePayroll';
import { toast } from 'react-toastify';
import InputField from '@/components/common/Input/InputField';
import { useListEmployee } from '@/hooks/Services/HumanResource/Employee/useGetEmployee';
import Autocomplete from '@/components/common/AutoComplete/Autocomplete';
import DatePicker from '@/components/common/DatePicker/DatePicker';

const PayrollSchema = z.object({
  employeeId: z
    .string({ required_error: 'Employee ID is required' })
    .min(1, 'Employee ID is required'),
  payPeriodStartDate: z.date({ required_error: 'Pay Period Start Date is required' }),
  payPeriodEndDate: z.date({ required_error: 'Pay Period End Date is required' }),
  grossSalary: z.number({ required_error: 'Gross Salary is required' }),
  deductions: z.number({ required_error: 'Deductions is required' }),
  netSalary: z.number({ required_error: 'Net Salary is required' }),
  paymentDate: z.date({ required_error: 'Payment Date is required' }),
});

type PayrollFormValues = z.infer<typeof PayrollSchema>;

export function CreatePayrollForm() {
  const [form, setForm] = useState<Partial<PayrollFormValues>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof PayrollFormValues, string>>>({});
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

  const { mutate, isPending } = useCreateUpdatePayroll();

  const handleSubmit = () => {
    form.grossSalary = Number(form.grossSalary);
    form.deductions = Number(form.deductions);
    form.netSalary = Number(form.netSalary);
    form.paymentDate = new Date();

    const result = PayrollSchema.safeParse(form);

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
            queryKey: ['get-list-payroll'],
          });
          toast('Payroll Created Successfully', { type: 'success' });
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
          <DialogTitle>Create Payroll</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-4">Employee</div>
          <div className="col-span-12 md:col-span-8">
            <Autocomplete
              label="Employee"
              placeholder="Select Employee..."
              data={
                listEmployee?.data.map((item) => ({
                  value: [item.id?.toString()],
                  label: item.firstName + ' ' + item.lastName + ' | ' + item.departmentName,
                })) || []
              }
              selectedValue={form?.employeeId}
              onSelect={(currentValue) => {
                setForm((prev) => ({
                  ...prev,
                  employeeId: currentValue,
                }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  employeeId: undefined,
                }));
              }}
              error={errors.employeeId}
            />
          </div>
          <div className="col-span-12 md:col-span-4">Period Start Date</div>
          <div className="col-span-12 md:col-span-8">
            <DatePicker
              placeholder="Select Period Start Date"
              value={form.payPeriodStartDate}
              onChange={(value) => {
                setForm((prev) => ({
                  ...prev,
                  payPeriodStartDate: value,
                }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  payPeriodStartDate: undefined,
                }));
              }}
              error={errors.payPeriodStartDate}
            />
          </div>
          <div className="col-span-12 md:col-span-4">Period End Date</div>
          <div className="col-span-12 md:col-span-8">
            <DatePicker
              placeholder="Select Period End Date"
              value={form.payPeriodEndDate}
              onChange={(value) => {
                setForm((prev) => ({
                  ...prev,
                  payPeriodEndDate: value,
                }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  payPeriodEndDate: undefined,
                }));
              }}
              error={errors.payPeriodEndDate}
            />
          </div>
          <div className="col-span-12 md:col-span-4">Gross Salary</div>
          <div className="col-span-12 md:col-span-8">
            <InputField
              placeholder="Insert Gross Salary"
              type="number"
              name="grossSalary"
              value={form.grossSalary || ''}
              onChange={onChange}
              error={errors.grossSalary}
            />
          </div>
          <div className="col-span-12 md:col-span-4">Deductions</div>
          <div className="col-span-12 md:col-span-8">
            <InputField
              placeholder="Insert Deductions"
              type="number"
              name="deductions"
              value={form.deductions || ''}
              onChange={onChange}
              error={errors.deductions}
            />
          </div>
          <div className="col-span-12 md:col-span-4">Net Salary</div>
          <div className="col-span-12 md:col-span-8">
            <InputField
              placeholder="Insert Net Salary"
              type="number"
              name="netSalary"
              value={form.netSalary || ''}
              onChange={onChange}
              error={errors.netSalary}
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
