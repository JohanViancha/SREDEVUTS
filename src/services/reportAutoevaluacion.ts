import { WorkSheet, utils } from "xlsx";
import { addHeaderQuestions, calculateValueForQuestion, deleteColumns, getCountRows, getValueCell, readHeader } from "./manageFile";

const wordColunns = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P" , "Q" , "R" , "S", "T", "U" , "V", "W"];
let headerColunns: string[] = [];


const calculateAutoevaluation = (worksheet: WorkSheet) => {
  const ref = worksheet["!ref"] || "";
  const countRows = Number(getCountRows(ref));
  const sheeData = deleteColumns(worksheet,2, 5);
  headerColunns = readHeader(sheeData,{ start: 0, count: 3});
  let step = 0;

  for (let index = countRows + 2; index <= countRows * 2 - 1 ; index++) {
    const indexCurrent = index - countRows;
    const currentLast = index + step;
    const name = getValueCell(sheeData[`A${indexCurrent}`].v);
    const lastName = getValueCell(sheeData[`B${indexCurrent}`].v);
    calculateValueForQuestion(sheeData, indexCurrent, currentLast, wordColunns);
    addHeaderQuestions(sheeData, currentLast,wordColunns, headerColunns);
    utils.sheet_add_aoa(sheeData, [[(name + ' ' +lastName).toUpperCase()]], {
      origin: `A${currentLast}`,
    });

    step += 4;
  }

  return sheeData;
};



export { calculateAutoevaluation };

