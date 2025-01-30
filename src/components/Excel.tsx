import React, { useState } from "react";
import * as XLSX from "xlsx";

interface TableProps {
  initialData: Array<Record<string, any>>;
}

const TableWithExcelImport: React.FC<TableProps> = ({ initialData }) => {
  const [tableData, setTableData] = useState<Array<Record<string, any>>>(initialData);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });

      // Suponemos que los datos están en la primera hoja del archivo
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convertimos los datos a JSON
      const importedData = XLSX.utils.sheet_to_json(worksheet);

      // Agregamos los datos importados a la tabla
      setTableData((prevData) => [...prevData, ...importedData]);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Tabla con Importación de Excel</h1>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="mb-4"
      />

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {tableData.length > 0 &&
              Object.keys(tableData[0]).map((key) => (
                <th key={key} className="border border-gray-300 px-4 py-2">
                  {key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((value, colIndex) => (
                <td key={colIndex} className="border border-gray-300 px-4 py-2">
                  {value as string}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithExcelImport;
