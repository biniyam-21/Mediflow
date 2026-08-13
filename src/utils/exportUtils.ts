/**
 * Export generic array data to a downloadable CSV file
 */
export function exportToCSV<T extends Record<string, unknown>>(
  filename: string,
  rows: T[],
  headers?: { key: keyof T; label: string }[]
): void {
  if (!rows || rows.length === 0) return;

  const keys = headers ? headers.map((h) => h.key) : (Object.keys(rows[0]) as (keyof T)[]);
  const headerLabels = headers ? headers.map((h) => h.label) : (keys as string[]);

  const csvRows: string[] = [];

  // 1. Add header row
  csvRows.push(headerLabels.map((l) => `"${String(l).replace(/"/g, '""')}"`).join(','));

  // 2. Add data rows
  for (const row of rows) {
    const values = keys.map((key) => {
      const val = row[key];
      if (val === null || val === undefined) return '""';
      if (typeof val === 'object') return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  }

  // 3. Trigger download
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
