import { ref, uploadBytes } from "firebase/storage";
import { read, utils, WorkSheet } from "xlsx";
import { storage } from "../../firebase.config";

const uploadXLSX = async (file: File, filename: string, directory: string) => {
  try {
    const storageRef = ref(storage, `${directory}/${filename}`);
    await uploadBytes(storageRef, file).then();

    return "ok";
  } catch (error) {
    console.log(error);
    return "error";
  }
};

const readFileXlsx = async (file: File) => {
  const ab = await file.arrayBuffer();
  const workbook = read(ab);
  return workbook;
};

const readHeader = (worksheet: WorkSheet, countCell: {start: number, count: number}) => {
  const sheet = utils.sheet_to_json<any>(worksheet, { header: 1 });
  return sheet[0].toSpliced(countCell.start, countCell.count);
};

const deleteColumns = (sheet: WorkSheet, start: number, deletCount: number) => {
  const sheetData = utils.sheet_to_json<any>(sheet, { header: 1 });

  sheetData.forEach((row: any) => {
    row.splice(start, deletCount);
  });

  return utils.aoa_to_sheet(sheetData);
};

const getCountRows = (ref: string) => {
  const afterTwoPoints = ref.slice(ref?.indexOf(":") + 1, ref.length);
  return afterTwoPoints.match(/\d+/);
};

const getValueCell = (ref: string) => {
  if (ref.includes(":")) {
    return ref?.slice(ref?.indexOf(":") + 2, ref.length);
  }
  return ref;
};

const addHeaderQuestions = (
  sheeData: WorkSheet,
  currentLast: number,
  wordColunns: string[],
  headerColunns: string[]
) => {
  wordColunns.forEach((column: string, i: number) => {
    utils.sheet_add_aoa(sheeData, [[headerColunns[i]]], {
      origin: `${column}${currentLast}`,
    });
  });
};

const calculateValueForQuestion = (
  sheet: WorkSheet,
  indexCopy: number,
  currentLast: number,
  wordColunns: string[]
) => {
  let countValue = 0;

  wordColunns.forEach((cell) => {
    let firstValue = 0;
    let secondValue = 0;
    let threeValue = 0;

    wordColunns.forEach((cellinter) => {
      countValue +=
        sheet[`${cell}${indexCopy}`].v === sheet[`${cellinter}${indexCopy}`].v
          ? 1
          : 0;
    });

    const value = sheet[`${cell}${indexCopy}`].v;
    const valueNumber =
      typeof value == "string" ? value.replace(",", ".") : value;

    firstValue = valueNumber * countValue;

    if (!isNaN(firstValue) && firstValue !== 0) {
      secondValue = (5 * valueNumber) / firstValue;
    }

    threeValue = isNaN(secondValue) ? 0 : secondValue * countValue;

    utils.sheet_add_aoa(sheet, [[firstValue.toFixed(2).replace(".", ",")]], {
      origin: `${cell}${currentLast + 1}`,
    });

    utils.sheet_add_aoa(sheet, [[secondValue.toFixed(2).replace(".", ",")]], {
      origin: `${cell}${currentLast + 2}`,
    });
    utils.sheet_add_aoa(sheet, [[threeValue.toFixed(2).replace(".", ",")]], {
      origin: `${cell}${currentLast + 3}`,
    });

    countValue = 0;
  });
};

export {
  addHeaderQuestions,
  calculateValueForQuestion, deleteColumns,
  getCountRows,
  getValueCell, readFileXlsx, readHeader, uploadXLSX
};

