import { useMemo } from 'react'; 
interface usePaginationProps {
  rows: object[];
  page: number;
  pageSize: number;
}
 
const usePaginated = ({ rows, page, pageSize } : usePaginationProps) => {
  const totalPages = Math.ceil(rows.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, rows.length);
  const paginatedRows = useMemo(() => rows.slice(startIndex, endIndex), [rows, startIndex, endIndex]);

  return { paginatedRows, totalPages };
};