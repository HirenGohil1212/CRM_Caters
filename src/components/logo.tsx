import { Gem } from 'lucide-react'

export function Logo() {
  return (
    <div className="flex items-center gap-2 p-2 text-sidebar-foreground">
      <Gem className="h-8 w-8 text-accent" />
      <h1 className="truncate text-lg font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
        Gilded Events
      </h1>
    </div>
  )
}
