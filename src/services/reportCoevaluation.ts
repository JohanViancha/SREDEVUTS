import { WorkSheet, utils } from "xlsx";
import { addHeaderQuestions, calculateValueForQuestion, deleteColumns, getValueCell, readHeader } from "./manageFile";

const wordColunns = ["B", "C", "D", "E", "F", "G", "H"];
let headerColunns: string[] = [];


const calculateCoevaluation = (worksheet: WorkSheet) => {
  const ref = worksheet["!ref"] || "";
  const countRows = Number(getValueCell(ref));
  const sheeData = deleteColumns(worksheet,1, 5);
  headerColunns = readHeader(sheeData,{start: 0, count: 1});
  let step = 0;

  for (let index = countRows + 2; index <= countRows * 2 - 1 ; index++) {
    const indexCurrent = index - countRows;
    const currentLast = index + step;
    const name = getValueCell(sheeData[`A${indexCurrent}`].v);
    calculateValueForQuestion(sheeData, indexCurrent, currentLast, wordColunns);
    addHeaderQuestions(sheeData, currentLast,wordColunns, headerColunns);
    utils.sheet_add_aoa(sheeData, [[name]], {
      origin: `A${currentLast}`,
    });

    step += 4;
  }

  return sheeData;
};



export { calculateCoevaluation };

