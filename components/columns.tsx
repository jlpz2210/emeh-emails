import { ColumnDef } from "@tanstack/react-table";
import {Checkbox} from '@/components/ui/checkbox'

export const columns: ColumnDef<any>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: '0',
        header: 'Nombre'
    },
    {
        accessorKey: '1',
        header: 'Correo'
    },
    {
        accessorKey: '2',
        header: 'Historial'
    }
]