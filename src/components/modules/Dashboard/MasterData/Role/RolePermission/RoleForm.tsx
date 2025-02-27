import InputField from '@/components/common/Input/InputField';
import { useGetRoleById } from '@/hooks/Services/MasterData/Role/useGetRoleById';
import { formatDateTime } from '@/lib/functions';
import { Role } from '@/types/MasterData/Role/type';
import { useEffect, useState } from 'react';

export const RoleForm = ({ id }: { id: string }) => {
  const [form, setForm] = useState<Role | null>(null);
  const { data } = useGetRoleById(id);

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-12 md:col-span-3 text-sm">Role Name</div>
      <div className="col-span-12 md:col-span-9">
        <InputField type="text" value={form?.roleName || ''} disable readOnly />
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
        <InputField type="text" value={form?.modifiedDate || '-'} disable readOnly />
      </div>
    </div>
  );
};
