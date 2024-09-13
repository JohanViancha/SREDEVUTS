import { TbFileUnknown } from "react-icons/tb";
import { WorkSheet, utils } from "xlsx";

const getText = (ref: string) => {
  return ref?.slice(ref?.indexOf(":") + 2, ref.length);
};

const calculateCoevaluation = (worksheet: WorkSheet) => {
  const ref = worksheet["!ref"] || "";
  const countRows = Number(getText(ref));
  const sheeData = deleteColumns(worksheet);
  let step = 0;

  const wordColunns = ["B", "C", "D", "E", "F", "G", "H"];
  const headerColunns = [
    "P. 1 /1,25",
    "P. 2 /0,42",
    "P. 3 /0,42",
    "P. 4 /0,42",
    "P. 5 /0,62",
    "P. 6 /0,62",
    "P. 7 /1,25",
  ];

  for (let index = countRows + 1; index <= countRows * 2 - 4; index++) {
    const indexCurrent = index - countRows + 1;
    const currentLast = index + step;
    const name = getText(sheeData[`A${indexCurrent}`].v);
    calculateValueForQuestion(sheeData, wordColunns, indexCurrent, currentLast);
    addHeader(sheeData, wordColunns, headerColunns, currentLast);
    utils.sheet_add_aoa(sheeData, [[name]], {
      origin: `A${currentLast}`,
    });

    step += 4;
  }

  return sheeData;
};

const addHeader = (
  sheeData: WorkSheet,
  columns: string[],
  question: string[],
  currentLast: number
) => {
  columns.forEach((column: string, i: number) => {
    utils.sheet_add_aoa(sheeData, [[question[i]]], {
      origin: `${column}${currentLast}`,
    });
  });
};

const calculateRuleOfThree = (sheet: WorkSheet) => {};

const calculateValueForQuestion = (
  sheet: WorkSheet,
  wordColunns: string[],
  indexCopy: number,
  currentLast: number
) => {
  let countValue = 0;
  wordColunns.forEach((cell) => {
    wordColunns.forEach((cellinter) => {
      countValue +=
        sheet[`${cell}${indexCopy}`].v === sheet[`${cellinter}${indexCopy}`].v
          ? 1
          : 0;
    });

    const value = sheet[`${cell}${indexCopy}`].v;
    const valueNumber =
      typeof value == "string" ? value.replace(",", ".") : value;

    const firstValue = parseFloat(valueNumber) * countValue;
    const secondValue = parseFloat(((5 * valueNumber) / firstValue).toFixed(2));
    const threeValue = (secondValue * countValue).toFixed(2)

    utils.sheet_add_aoa(sheet, [[firstValue]], {
      origin: `${cell}${currentLast + 1}`,
    });

    utils.sheet_add_aoa(sheet, [[secondValue]], {
      origin: `${cell}${currentLast + 2}`,
    });
    utils.sheet_add_aoa(sheet, [[threeValue]], {
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

export { calculateCoevaluation };
