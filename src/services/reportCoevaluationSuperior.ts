import { TbFileUnknown } from "react-icons/tb";
import { WorkSheet, utils } from "xlsx";

const wordColunns = ["B", "C", "D", "E", "F", "G", "H"];
let headerColunns: string[] = [];

const getText = (ref: string) => {
  return ref?.slice(ref?.indexOf(":") + 2, ref.length);
};

const readHeader = (worksheet: WorkSheet) => {
  const sheet = utils.sheet_to_json(worksheet, { header: 1 });
  headerColunns = sheet[0].toSpliced(0, 1);
};

const calculateCoevaluationSuperior = (worksheet: WorkSheet) => {
  const ref = worksheet["!ref"] || "";
  const countRows = Number(getText(ref));
  const sheeData = deleteColumns(worksheet);
  readHeader(sheeData);
  let step = 0;

  for (let index = countRows + 1; index <= countRows * 2 - 4; index++) {
    const indexCurrent = index - countRows + 1;
    const currentLast = index + step;
    const name = getText(sheeData[`A${indexCurrent}`].v);
    calculateValueForQuestion(sheeData, indexCurrent, currentLast);
    addHeader(sheeData, currentLast);
    utils.sheet_add_aoa(sheeData, [[name]], {
      origin: `A${currentLast}`,
    });

    step += 4;
  }

  return sheeData;
};

const addHeader = (sheeData: WorkSheet, currentLast: number) => {
  wordColunns.forEach((column: string, i: number) => {
    utils.sheet_add_aoa(sheeData, [[headerColunns[i]]], {
      origin: `${column}${currentLast}`,
    });
  });
};

const calculateValueForQuestion = (
  sheet: WorkSheet,
  indexCopy: number,
  currentLast: number
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

    utils.sheet_add_aoa(sheet, [[firstValue.toFixed(2).replace('.',',')]], {
      origin: `${cell}${currentLast + 1}`,
    });

    utils.sheet_add_aoa(sheet, [[secondValue.toFixed(2).replace('.',',')]], {
      origin: `${cell}${currentLast + 2}`,
    });
    utils.sheet_add_aoa(sheet, [[threeValue.toFixed(2).replace('.',',')]], {
      origin: `${cell}${currentLast + 3}`,
    });

    countValue = 0;
  });
};

const deleteColumns = (sheet: WorkSheet) => {
  const sheetData = utils.sheet_to_json(sheet, { header: 1 });

  sheetData.forEach((row: unknown) => {
    row.splice(1, 5);
  });

  return utils.aoa_to_sheet(sheetData);
};

export { calculateCoevaluationSuperior };
