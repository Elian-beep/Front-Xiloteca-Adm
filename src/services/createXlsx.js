import * as XLSX from 'xlsx';

export default {
    createXlsx: (samples) => {
        const workbook = XLSX.utils.book_new();
        const sheet = XLSX.utils.json_to_sheet(samples);
        XLSX.utils.book_append_sheet(workbook, sheet);
        const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'xilotecavirtual.xlsx');
        link.click();
        window.URL.revokeObjectURL(url);
    }
}