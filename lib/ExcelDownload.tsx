import * as XLSX from 'xlsx';

export const ExcelDownload = (data: any, sheet_name?: string, file_name?: string) => {
	const worksheet = XLSX.utils.json_to_sheet(data);
	const workbook = XLSX.utils.book_new();

	sheet_name = sheet_name || 'work_sheet';
	file_name = file_name || 'excel';
	if (!file_name.endsWith('.xlsx')) {
		file_name = `${file_name}.xlsx`;
	}

	XLSX.utils.book_append_sheet(workbook, worksheet, sheet_name);
	XLSX.writeFile(workbook, file_name);
};
