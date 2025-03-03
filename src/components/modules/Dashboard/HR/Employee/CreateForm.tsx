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
import { useCreateUpdateEmployee } from '@/hooks/Services/HumanResource/Employee/useCreateUpdateEmployee';
import { toast } from 'react-toastify';
import InputField from '@/components/common/Input/InputField';
import Autocomplete from '@/components/common/AutoComplete/Autocomplete';
import { useListDepartment } from '@/hooks/Services/HumanResource/Department/useGetDepartments';
import { useListJobTitle } from '@/hooks/Services/HumanResource/JobTitle/useGetJobTitles';
import SelectField from '@/components/common/Select/SelectField';
import DatePicker from '@/components/common/DatePicker/DatePicker';
import { useListEmployee } from '@/hooks/Services/HumanResource/Employee/useGetEmployee';

const EmployeeSchema = z.object({
  firstName: z
    .string({ required_error: 'First Name is required' })
    .min(1, 'First Name is required'),
  lastName: z.string().optional(),
  gender: z.string({ required_error: 'Gender is required' }).min(1, 'Gender is required'),
  dateOfBirth: z.date({ required_error: 'Date of Birth is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Email must be valid'),
  phoneNumber: z
    .string({ required_error: 'Phone Number is required' })
    .min(1, 'Phone Number is required'),
  address: z.string().optional(),
  hireDate: z.date({ required_error: 'Hire Date is required' }),
  jobTitleId: z.string({ required_error: 'Job Title is required' }).min(1, 'Job Title is required'),
  departmentId: z
    .string({ required_error: 'Department is required' })
    .min(1, 'Department is required'),
  managerId: z.string().optional(),
  employmentStatus: z.string().optional(),
  salary: z.number({ required_error: 'Salary is required' }).min(1, 'Salary is required'),
});

type EmployeeFormValues = z.infer<typeof EmployeeSchema>;

export function CreateEmployeeForm() {
  const [form, setForm] = useState<Partial<EmployeeFormValues>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof EmployeeFormValues, string>>>({});
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

  const { mutate, isPending } = useCreateUpdateEmployee();

  const handleSubmit = () => {
    form.employmentStatus = 'Active';
    form.salary = Number(form.salary);
    const result = EmployeeSchema.safeParse(form);

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
            queryKey: ['get-list-employee'],
          });
          toast('Employee Created Successfully', { type: 'success' });
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

  const paramsDepartment: any = {
    limit: 1000,
    sortBy: 'departmentName',
    isDesc: false,
  };
  const { data: listDepartment } = useListDepartment(paramsDepartment);

  const paramsJobTitle: any = {
    limit: 1000,
    sortBy: 'title',
    isDesc: false,
  };
  const { data: listJobTitle } = useListJobTitle(paramsJobTitle);

  const paramsManager: any = {
    limit: 1000,
    sortBy: 'firstName',
    isDesc: false,
  };
  const { data: listManager } = useListEmployee(paramsManager);

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
          <DialogTitle>Create Employee</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">First Name</div>
          <div className="col-span-3">
            <InputField
              placeholder="Insert First Name"
              type="text"
              name="firstName"
              value={form.firstName || ''}
              onChange={onChange}
              error={errors.firstName}
            />
          </div>
          <div className="col-span-2">Last Name</div>
          <div className="col-span-3">
            <InputField
              placeholder="Insert Last Name"
              type="text"
              name="lastName"
              value={form.lastName || ''}
              onChange={onChange}
              error={errors.lastName}
            />
          </div>
          <div className="col-span-2">Gender</div>
          <div className="col-span-3">
            <SelectField
              placeholder="Select Gender..."
              options={[
                { value: 'L', label: 'Male' },
                { value: 'P', label: 'Female' },
              ]}
              value={form.gender}
              onChange={(value) => {
                setForm((prev) => ({
                  ...prev,
                  gender: value,
                }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  gender: undefined,
                }));
              }}
              error={errors.gender}
            />
          </div>
          <div className="col-span-2">Date of Birth</div>
          <div className="col-span-3">
            <DatePicker
              placeholder="Select Date of Birth"
              value={form.dateOfBirth}
              onChange={(date) => {
                setForm((prev) => ({
                  ...prev,
                  dateOfBirth: date,
                }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  dateOfBirth: undefined,
                }));
              }}
              error={errors.dateOfBirth}
            />
          </div>
          <div className="col-span-2">Email</div>
          <div className="col-span-3">
            <InputField
              placeholder="Insert Email"
              type="email"
              name="email"
              value={form.email || ''}
              onChange={onChange}
              error={errors.email}
            />
          </div>
          <div className="col-span-2">Phone Number</div>
          <div className="col-span-3">
            <InputField
              placeholder="Insert Phone Number"
              type="text"
              name="phoneNumber"
              value={form.phoneNumber || ''}
              onChange={onChange}
              error={errors.phoneNumber}
            />
          </div>
          <div className="col-span-2">Address</div>
          <div className="col-span-3">
            <InputField
              placeholder="Insert Address"
              type="text"
              name="address"
              value={form.address || ''}
              onChange={onChange}
              error={errors.address}
            />
          </div>
          <div className="col-span-2">Hire Date</div>
          <div className="col-span-3">
            <DatePicker
              placeholder="Select Hire Date"
              value={form.hireDate}
              onChange={(date) => {
                setForm((prev) => ({
                  ...prev,
                  hireDate: date,
                }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  hireDate: undefined,
                }));
              }}
              error={errors.hireDate}
            />
          </div>
          <div className="col-span-2">Job Title</div>
          <div className="col-span-3">
            <Autocomplete
              label="Job Title"
              placeholder="Select Job Title..."
              data={
                listJobTitle?.data.map((item) => ({
                  value: [item.id?.toString()],
                  label: item.title,
                })) || []
              }
              selectedValue={form?.jobTitleId}
              onSelect={(currentValue) => {
                setForm((prev) => ({
                  ...prev,
                  jobTitleId: currentValue,
                }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  jobTitleId: undefined,
                }));
              }}
              error={errors.jobTitleId}
            />
          </div>
          <div className="col-span-2">Department</div>
          <div className="col-span-3">
            <Autocomplete
              label="Department"
              placeholder="Select Department..."
              data={
                listDepartment?.data.map((item) => ({
                  value: [item.id?.toString()],
                  label: item.departmentName,
                })) || []
              }
              selectedValue={form?.departmentId}
              onSelect={(currentValue) => {
                setForm((prev) => ({
                  ...prev,
                  departmentId: currentValue,
                }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  departmentId: undefined,
                }));
              }}
              error={errors.departmentId}
            />
          </div>
          <div className="col-span-2">Manager</div>
          <div className="col-span-3">
            <Autocomplete
              label="Manager"
              placeholder="Select Manager..."
              data={
                listManager?.data.map((item) => ({
                  value: [item.id?.toString()],
                  label: item.firstName + ' ' + item.lastName,
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
          <div className="col-span-2">Salary</div>
          <div className="col-span-3">
            <InputField
              placeholder="Insert Salary"
              type="number"
              name="salary"
              value={form.salary || ''}
              onChange={onChange}
              error={errors.salary}
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
