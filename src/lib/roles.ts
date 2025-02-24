export interface RolePermission {
  id: number;
  name: string;
  allowedMenus: string[];
}

export const ROLE_PERMISSIONS: RolePermission[] = [
  {
    id: 1,
    name: 'Super Admin',
    allowedMenus: ['*'], // Access to everything
  },
  {
    id: 2,
    name: 'Finance',
    allowedMenus: ['/dashboard/log', '/dashboard/notification', '/dashboard/contract'],
  },
  {
    id: 3,
    name: 'Project Manager',
    allowedMenus: ['*'], // Access to everything
  },
  {
    id: 4,
    name: 'PIC',
    allowedMenus: ['*'], // Access to everything
  },
];

// Utility function to check menu access
export function canAccessMenu(roleName: string, menuPath: string): boolean {
  const rolePermission = ROLE_PERMISSIONS.find((role) => role.name === roleName);

  if (!rolePermission) return false;

  // Always allow dashboard base route
  if (menuPath === '/dashboard') return true;

  // If allowedMenus contains '*', allow everything
  if (rolePermission.allowedMenus.includes('*')) return true;

  // For Finance role, check routes with more flexibility
  if (roleName === 'Finance') {
    return rolePermission.allowedMenus.some((allowedMenu) => {
      // Exact match
      if (menuPath === allowedMenu) return true;

      // Check if the menu path starts with the allowed menu
      // This allows dynamic routes and nested routes
      if (menuPath.startsWith(allowedMenu + '/')) return true;

      return false;
    });
  }

  // For other roles, check if the menu path starts with any allowed menu
  return rolePermission.allowedMenus.some((allowedMenu) => menuPath.startsWith(allowedMenu));
}
