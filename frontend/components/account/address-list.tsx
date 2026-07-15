import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { textVariants } from "@/lib/design-system/typography"
import type { UserAddress } from "@/lib/user-account"

export interface AddressListProps {
  addresses: UserAddress[];
  onEdit?: (address: UserAddress) => void;
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
  dictionary: any;
}

export function AddressList({
  addresses,
  onEdit,
  onDelete,
  onSetDefault,
  dictionary,
}: AddressListProps) {
  const { addresses: t } = dictionary.common;

  if (addresses.length === 0) {
    return (
      <div className="rounded-lg border border-border/40 bg-card p-8 text-center">
        <p className={cn(textVariants({ variant: "body" }), "text-muted-foreground")}>
          {t.noAddresses}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {addresses.map((address) => (
        <div
          key={address.id}
          className={cn(
            "relative rounded-lg border p-4 transition-all",
            address.isDefault
              ? "border-primary/50 bg-primary/5"
              : "border-border/60 bg-card"
          )}
        >
          {address.isDefault && (
            <div className="absolute top-2 right-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
              Default
            </div>
          )}

          <h4 className={cn(textVariants({ variant: "h5" }), "mb-2")}>
            {address.firstName} {address.lastName}
          </h4>

          <div className={cn(textVariants({ variant: "bodySm" }), "text-muted-foreground space-y-1 mb-4")}>
            <p>{address.street}</p>
            <p>
              {address.city}, {address.state} {address.zipCode}
            </p>
            <p>{address.country}</p>
            <p>{address.phone}</p>
          </div>

          <div className="flex gap-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onEdit(address)}
              >
                {t.edit}
              </Button>
            )}
            {!address.isDefault && onSetDefault && (
              <Button
                variant="ghost"
                size="sm"
                className="flex-1"
                onClick={() => onSetDefault(address.id)}
              >
                {t.setAsDefault}
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onDelete(address.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
