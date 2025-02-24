'use client';
import { CreateMenuForm } from '@/components/modules/Dashboard/MasterData/Menu/CreateForm';
import { MenuDataTable } from '@/components/modules/Dashboard/MasterData/Menu/DataTable';

export default function MenuPage() {
  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <CreateMenuForm />
      <MenuDataTable />
    </div>
  );
}
