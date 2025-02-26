import InputField from '@/components/common/Input/InputField';
import { useGetUserById } from '@/hooks/Services/User/useGetUserById';
import { formatDateTime } from '@/lib/functions';
import { User } from '@/types/User/type';
import { useEffect, useState } from 'react';

export const UserForm = ({ id }: { id: string }) => {
  const [form, setForm] = useState<User | null>(null);
  const { data } = useGetUserById(id);

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-12 md:col-span-3 text-sm">User Name</div>
      <div className="col-span-12 md:col-span-9">
        <InputField type="text" value={form?.username || ''} disable readOnly />
      </div>
      <div className="col-span-12 md:col-span-3 text-sm">Email</div>
      <div className="col-span-12 md:col-span-9">
        <InputField type="text" value={form?.email || ''} disable readOnly />
      </div>
      <div className="col-span-12 md:col-span-3 text-sm">Last Login</div>
      <div className="col-span-12 md:col-span-9">
        <InputField
          type="text"
          value={form?.lastLogin != null ? formatDateTime(form?.lastLogin) : '-'}
          disable
          readOnly
        />
      </div>
      <div className="col-span-12 md:col-span-3 text-sm">Created By</div>
      <div className="col-span-12 md:col-span-9">
        <InputField type="text" value={form?.createdByName || ''} disable readOnly />
      </div>
      <div className="col-span-12 md:col-span-3 text-sm">Created Date</div>
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
      <div className="col-span-12 md:col-span-3 text-sm">Updated Date</div>
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
