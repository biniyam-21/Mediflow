import React, { useState, useMemo } from 'react';
import {
  IconSearch,
  IconChevronLeft,
  IconChevronRight,
  IconFilter,
  IconInbox,
  IconSelector,
  IconDownload,
} from '@tabler/icons-react';
import { exportToCSV } from '../utils/exportUtils';

export interface Column<T> {
  header: string;
  accessor?: keyof T | ((row: T, index?: number) => React.ReactNode);
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
}

export interface DropdownFilter<T> {
  key: string;
  label: string;
  options: { label: string; value: string }[];
  filterFn: (item: T, value: string) => boolean;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  searchPlaceholder?: string;
  searchFields?: (keyof T)[];
  filters?: DropdownFilter<T>[];
  pageSize?: number;
  pageSizeOptions?: number[];
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  headerAction?: React.ReactNode;
  showRowNumbers?: boolean;
  exportable?: boolean;
  exportFilename?: string;
}

export function DataTable<T extends { _id?: string; id?: string | number }>({
  columns,
  data,
  searchable = true,
  searchPlaceholder = 'Search records…',
  searchFields,
  filters = [],
  pageSize: initialPageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  onRowClick,
  emptyMessage = 'No matching records found',
  headerAction,
  showRowNumbers = true,
  exportable = true,
  exportFilename = 'mediflow_data',
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterValues, setActiveFilterValues] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const handleFilterChange = (filterKey: string, value: string) => {
    setActiveFilterValues((prev) => ({ ...prev, [filterKey]: value }));
    setCurrentPage(1);
  };

  // Filter and search computation
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Apply dropdown filters
      for (const filter of filters) {
        const selectedValue = activeFilterValues[filter.key];
        if (selectedValue && selectedValue !== 'all') {
          if (!filter.filterFn(item, selectedValue)) {
            return false;
          }
        }
      }

      // Apply search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (searchFields && searchFields.length > 0) {
          const match = searchFields.some((field) => {
            const val = item[field];
            return val ? String(val).toLowerCase().includes(q) : false;
          });
          if (!match) return false;
        } else {
          const match = Object.values(item as Record<string, unknown>).some((val) => {
            if (typeof val === 'string' || typeof val === 'number') {
              return String(val).toLowerCase().includes(q);
            }
            return false;
          });
          if (!match) return false;
        }
      }

      return true;
    });
  }, [data, filters, activeFilterValues, searchQuery, searchFields]);

  // Pagination calculation
  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const page = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page, pageSize]);

  const startIndex = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endIndex = Math.min(page * pageSize, totalItems);

  // Generate page numbers for numeric button pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const totalCols = columns.length + (showRowNumbers ? 1 : 0);

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
      {/* Table Header Control Bar */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(255, 255, 255, 0.8)',
      }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flex: 1, flexWrap: 'wrap' }}>
          {/* Search Bar */}
          {searchable && (
            <div style={{ position: 'relative', minWidth: 220, flex: 1, maxWidth: 360 }}>
              <IconSearch
                size={15}
                color="#94a3b8"
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                className="form-input"
                style={{ paddingLeft: 36, paddingTop: 7, paddingBottom: 7, fontSize: '0.83rem' }}
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          )}

          {/* Dropdown Filters */}
          {filters.map((filter) => (
            <div key={filter.key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                <IconFilter
                  size={14}
                  color="#64748b"
                  style={{ position: 'absolute', left: 10, pointerEvents: 'none' }}
                />
                <select
                  className="form-input"
                  style={{
                    paddingLeft: 30,
                    paddingRight: 28,
                    paddingTop: 7,
                    paddingBottom: 7,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    background: 'white',
                    borderColor: activeFilterValues[filter.key] && activeFilterValues[filter.key] !== 'all' ? 'var(--primary)' : 'var(--border)',
                    cursor: 'pointer',
                    appearance: 'none',
                    borderRadius: 'var(--radius-sm)',
                  }}
                  value={activeFilterValues[filter.key] || 'all'}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                >
                  <option value="all">
                    {filter.label.toLowerCase().endsWith('status')
                      ? `All ${filter.label.replace(/status$/i, 'Statuses')}`
                      : filter.label.toLowerCase().endsWith('s')
                      ? `All ${filter.label}`
                      : `All ${filter.label}s`}
                  </option>
                  {filter.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <IconSelector
                  size={14}
                  color="#94a3b8"
                  style={{ position: 'absolute', right: 8, pointerEvents: 'none' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Custom Header Action Slot & Export CSV */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {exportable && data.length > 0 && (
            <button
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 5 }}
              onClick={() => exportToCSV(exportFilename, filteredData as unknown as Record<string, unknown>[])}
              title="Export filtered records to CSV"
            >
              <IconDownload size={14} color="var(--primary)" /> Export CSV
            </button>
          )}
          {headerAction}
        </div>
      </div>

      {/* Main Data Table */}
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              {/* Row index column # */}
              {showRowNumbers && (
                <th style={{ width: 44, textAlign: 'center', color: 'var(--text-muted)' }}>#</th>
              )}
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  style={{
                    textAlign: col.align || 'left',
                    width: col.width,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={totalCols} style={{ textAlign: 'center', padding: '50px 24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                    <IconInbox size={38} color="#cbd5e1" strokeWidth={1.5} />
                    <div style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      {emptyMessage}
                    </div>
                    {(searchQuery || Object.values(activeFilterValues).some((v) => v && v !== 'all')) && (
                      <button
                        className="btn-secondary"
                        style={{ fontSize: '0.78rem', padding: '5px 12px', marginTop: 4 }}
                        onClick={() => {
                          setSearchQuery('');
                          setActiveFilterValues({});
                        }}
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rIdx) => {
                const rowKey = (row._id || row.id || rIdx).toString();
                const globalIndex = (page - 1) * pageSize + rIdx + 1;

                return (
                  <tr
                    key={rowKey}
                    style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                    onClick={() => onRowClick && onRowClick(row)}
                  >
                    {/* Row index number */}
                    {showRowNumbers && (
                      <td style={{ textAlign: 'center', fontWeight: 700, fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                        {globalIndex}
                      </td>
                    )}
                    {columns.map((col, cIdx) => {
                      let cellContent: React.ReactNode = null;
                      if (typeof col.accessor === 'function') {
                        cellContent = col.accessor(row, globalIndex);
                      } else if (col.accessor) {
                        cellContent = (row[col.accessor] as unknown) as React.ReactNode;
                      }

                      return (
                        <td
                          key={cIdx}
                          style={{
                            textAlign: col.align || 'left',
                            verticalAlign: 'middle',
                          }}
                        >
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div style={{
        padding: '12px 20px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        background: 'var(--surface-2)',
        fontSize: '0.78rem',
        color: 'var(--text-secondary)',
      }}>
        {/* Info */}
        <div>
          Showing <strong style={{ color: 'var(--text-primary)' }}>{startIndex}</strong> to{' '}
          <strong style={{ color: 'var(--text-primary)' }}>{endIndex}</strong> of{' '}
          <strong style={{ color: 'var(--text-primary)' }}>{totalItems}</strong> entries
        </div>

        {/* Page Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Items per page selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>Per page:</span>
            <select
              className="form-input"
              style={{
                padding: '3px 8px',
                fontSize: '0.75rem',
                fontWeight: 600,
                width: 'auto',
                cursor: 'pointer',
              }}
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Numeric Page Buttons Pagination */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                width: 30,
                height: 30,
                borderRadius: 6,
                border: '1px solid var(--border)',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                opacity: page === 1 ? 0.4 : 1,
              }}
            >
              <IconChevronLeft size={14} />
            </button>

            {getPageNumbers().map((pNum, idx) => {
              if (pNum === '...') {
                return (
                  <span key={`ellipsis-${idx}`} style={{ padding: '0 4px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    …
                  </span>
                );
              }
              const isCurrent = pNum === page;
              return (
                <button
                  key={`page-${pNum}`}
                  onClick={() => setCurrentPage(Number(pNum))}
                  style={{
                    minWidth: 30,
                    height: 30,
                    padding: '0 6px',
                    borderRadius: 6,
                    border: `1px solid ${isCurrent ? 'var(--primary)' : 'var(--border)'}`,
                    background: isCurrent ? 'var(--primary)' : 'white',
                    color: isCurrent ? 'white' : 'var(--text-primary)',
                    fontWeight: isCurrent ? 700 : 500,
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {pNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalItems === 0}
              style={{
                width: 30,
                height: 30,
                borderRadius: 6,
                border: '1px solid var(--border)',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: page === totalPages || totalItems === 0 ? 'not-allowed' : 'pointer',
                opacity: page === totalPages || totalItems === 0 ? 0.4 : 1,
              }}
            >
              <IconChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
