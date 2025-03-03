import InputField from '@/components/common/Input/InputField';
import { useGetEmployeeById } from '@/hooks/Services/HumanResource/Employee/useGetEmployeeById';
import { formatDate, formatDateTime, formatRupiah } from '@/lib/functions';
import { EmployeeExt } from '@/types/HumanResource/Employee/type';
import { useEffect, useState } from 'react';

export const EmployeeForm = ({ id }: { id: string }) => {
  const [form, setForm] = useState<EmployeeExt | null>(null);
  const { data } = useGetEmployeeById(id);

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-12 md:col-span-3 text-sm">Employee Name</div>
      <div className="col-span-12 md:col-span-9">
        <InputField
          type="text"
          value={form?.firstName + ' ' + form?.lastName || ''}
          disable
          readOnly
        />
      </div>
      <div className="col-span-12 md:col-span-3 text-sm">Gender</div>
      <div className="col-span-12 md:col-span-9">
        <InputField type="text" value={form?.gender || ''} disable readOnly />
      </div>
      <div className="col-span-12 md:col-span-3 text-sm">Date of Birth</div>
      <div className="col-span-12 md:col-span-9">
        <InputField
          type="text"
          value={form?.dateOfBirth != null ? formatDate(form?.dateOfBirth.toString()) : '-'}
          disable
          readOnly
        />
      </div>
      <div className="col-span-12 md:col-span-3 text-sm">Email</div>
      <div className="col-span-12 md:col-span-9">
        <InputField type="text" value={form?.email || ''} disable readOnly />
      </div>
      <div className="col-span-12 md:col-span-3 text-sm">Phone Number</div>
      <div className="col-span-12 md:col-span-9">
        <InputField type="text" value={form?.phoneNumber || ''} disable readOnly />
      </div>
      <div className="col-span-12 md:col-span-3 text-sm">Address</div>
      <div className="col-span-12 md:col-span-9">
        <InputField type="text" value={form?.address || ''} disable readOnly />
      </div>
      <div className="col-span-12 md:col-span-3 text-sm">Hire Date</div>
      <div className="col-span-12 md:col-span-9">
        <InputField
          type="text"
          value={form?.hireDate != null ? formatDate(form?.hireDate.toString()) : '-'}
          disable
          readOnly
        />
      </div>
      <div className="col-span-12 md:col-span-3 text-sm">Job Name</div>
      <div className="col-span-12 md:col-span-9">
        <InputField type="text" value={form?.jobName || ''} disable readOnly />
      </div>
      <div className="col-span-12 md:col-span-3 text-sm">Department</div>
      <div className="col-span-12 md:col-span-9">
        <InputField type="text" value={form?.departmentName || ''} disable readOnly />
      </div>
      <div className="col-span-12 md:col-span-3 text-sm">Manager Name</div>
      <div className="col-span-12 md:col-span-9">
        <InputField type="text" value={form?.managerName || ''} disable readOnly />
      </div>
      <div className="col-span-12 md:col-span-3 text-sm">Salary</div>
      <div className="col-span-12 md:col-span-9">
        <InputField
          type="text"
          value={form?.salary != null ? formatRupiah(form?.salary) : '-'}
          disable
          readOnly
        />
      </div>
      <div className="col-span-12 md:col-span-3 text-sm">Created By</div>
      <div className="col-span-12 md:col-span-9">
        <InputField type="text" value={form?.createdByName || ''} disable readOnly />
      </div>
      <div className="col-span-12 md:col-span-3 text-sm">Created On</div>
      <div className="col-span-12 md:col-span-9">
        <InputField
          type="text"
          value={form?.createdDate != null ? formatDateTime(form?.createdDate) : '-'}
          disable
          readOnly
        />
      </div>
      <div className="col-span-12 md:col-span-3 text-sm">Updated By</div>
      <div className="col-span-12 md:col-span-9">
        <InputField type="text" value={form?.modifiedByName || '-'} disable readOnly />
      </div>
      <div className="col-span-12 md:col-span-3 text-sm">Updated On</div>
      <div className="col-span-12 md:col-span-9">
        <InputField
          type="text"
          value={form?.modifiedDate != null ? formatDateTime(form?.modifiedDate) : '-'}
          disable
          readOnly
        />
      </div>
    </div>
  );
};
