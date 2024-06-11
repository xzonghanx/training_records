import { useState } from "react";
import { addExcel } from "../../utilities/excel-service";
import * as XLSX from "xlsx";
import Papa from "papaparse";

import debug from "debug";
const log = debug("pern:components:ExcelReader");

const ExcelReader = () => {
	const [fileData, setFileData] = useState(null);
	const [error, setError] = useState("");

	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		const fileExtension = file.name.split(".").pop();

		if (fileExtension === "xlsx" || fileExtension === "xls") {
			parseExcel(file);
		} else if (fileExtension === "csv") {
			parseCSV(file);
		} else {
			alert("Please upload a valid .xlsx or .csv file");
		}
	};

	const parseExcel = (file) => {
		const reader = new FileReader();
		reader.onload = (event) => {
			const data = new Uint8Array(event.target.result);
			const workbook = XLSX.read(data, { type: "array" });
			const sheetName = workbook.SheetNames[0];
			const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
			setFileData(worksheet);
		};
		reader.readAsArrayBuffer(file);
	};

	const parseCSV = (file) => {
		Papa.parse(file, {
			header: true,
			complete: (results) => {
				setFileData(results.data);
			},
		});
	};

	const handleSubmit = async () => {
		if (!fileData) return;

		try {
			const response = await addExcel(fileData);
			log("response, %o", response);
			setError("");
		} catch (error) {
			log("error", error);
			setError("Error uploading file");
		}
	};

	return (
		<div className='flex flex-col items-center space-y-1'>
			<input
				type='file'
				accept='.xlsx,.xls,.csv'
				onChange={handleFileUpload}
				className='border-opacity-60 border-slate-500 border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-full w-full rounded-md border  text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
			/>
			<button
				className='ring-offset-background focus-visible:ring-ring flex h-15 items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
				type='submit'
				onClick={handleSubmit}
				disabled={!fileData}>
				Upload Excel File
			</button>
			<div className='flex justify-start w-full text-red-600'>{error ? error : ""}</div>
		</div>
	);
};

export default ExcelReader;
