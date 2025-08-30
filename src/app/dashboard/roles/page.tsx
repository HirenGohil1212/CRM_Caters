"use client"

import { useUser } from "@/contexts/user-context"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { initialPermissions, permissionLabels } from "@/lib/data"
import type { UserRole, Permissions } from "@/lib/types"

export default function RolesPage() {
  const { permissions, setPermissions, role } = useUser()

  if (role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">You do not have permission to view this page.</p>
      </div>
    )
  }

  const handlePermissionChange = (
    role: keyof Permissions,
    permission: keyof Permissions[keyof Permissions],
    value: boolean
  ) => {
    setPermissions({
      ...permissions,
      [role]: {
        ...permissions[role],
        [permission]: value,
      },
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Role Management"
        description="Control which pages each role can see in the sidebar."
      />
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {(Object.keys(initialPermissions) as Array<keyof Permissions>).map((roleKey) => (
          <Card key={roleKey}>
            <CardHeader>
              <CardTitle className="capitalize">{roleKey}</CardTitle>
              <CardDescription>
                Toggle visibility for pages for the {roleKey} role.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {(Object.keys(permissionLabels) as Array<keyof typeof permissionLabels>).map((permissionKey, index) => {
                const canRoleAccess = initialPermissions[roleKey]?.[permissionKey as keyof Permissions[typeof roleKey]] !== undefined;
                if (permissionKey === 'roles' || !canRoleAccess) return null;

                return (
                  <div key={permissionKey}>
                    {index > 0 && <Separator className="mb-4" />}
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${roleKey}-${permissionKey}`}>
                        {permissionLabels[permissionKey]}
                      </Label>
                      <Switch
                        id={`${roleKey}-${permissionKey}`}
                        checked={permissions[roleKey]?.[permissionKey]}
                        onCheckedChange={(value) =>
                          handlePermissionChange(roleKey, permissionKey, value)
                        }
                      />
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
