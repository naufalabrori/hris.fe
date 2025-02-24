import { usePermissionStore } from '@/store/permissionStore';

interface ProtectedComponentProps {
  permission: string;
  children: React.ReactNode;
}

export const ProtectedComponent: React.FC<ProtectedComponentProps> = ({ permission, children }) => {
  const { hasPermission } = usePermissionStore();

  if (!hasPermission(permission)) {
    return null;
  }

  return <>{children}</>;
};
