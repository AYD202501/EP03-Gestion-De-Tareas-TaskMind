import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';

export interface Column {
  key: string;
  label: string;
  type: 'text' | 'avatar' | 'badge' | 'actions';
  badgeColors?: {
    [key: string]: string;
  };
}

export interface TableProps {
  columns: Column[];
  data: any[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const Table: React.FC<TableProps> = ({ columns, data, onEdit, onDelete }) => {
  const renderCell = (item: any, column: Column) => {
    switch (column.type) {
      case 'avatar':
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={item[column.key]?.image} />
              <AvatarFallback className="bg-gray-200">
                {item[column.key]?.name?.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{item[column.key]?.name}</span>
          </div>
        );
      
      case 'badge':
        const value = item[column.key];
        const color = column.badgeColors?.[value] || 'bg-gray-100 text-gray-800';
        return (
          <Badge className={color}>
            {value}
          </Badge>
        );
      
      case 'actions':
        return (
          <div className="flex items-center gap-2">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(item)}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(item)}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        );
      
      default:
        return <span>{item[column.key]}</span>;
    }
  };

  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead className="border-b bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-sm font-medium text-gray-900"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4 text-sm text-gray-900"
                >
                  {renderCell(item, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table; 