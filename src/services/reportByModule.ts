import { WorkSheet, utils } from "xlsx";

const getCantResponse = (worksheet: WorkSheet) => {
  const cellQuestions = worksheet["A3"].v;
  return Number(
    cellQuestions
      .slice(cellQuestions.indexOf(":") + 1, cellQuestions.length)
      .trim()
  );
};

const calculateAverage = (worksheet: WorkSheet) => {
  
  utils.sheet_add_aoa(worksheet, [['PROMEDIO TOTAL']], {
    origin: "H5",
  })

  let cellForMedium = 7;

  for (let index = 1; index <= getCantResponse(worksheet); index++) {
    utils.sheet_add_aoa(worksheet, [[(worksheet[`C${cellForMedium}`].v * 1 +
      worksheet[`D${cellForMedium}`].v * 2 +
      worksheet[`E${cellForMedium}`].v * 3 +
      worksheet[`F${cellForMedium}`].v * 4 +
      worksheet[`G${cellForMedium}`].v * 5) /
    (worksheet[`C${cellForMedium}`].v +
      worksheet[`D${cellForMedium}`].v +
      worksheet[`E${cellForMedium}`].v +
      worksheet[`F${cellForMedium}`].v +
      worksheet[`G${cellForMedium}`].v)]], {
      origin:`H${cellForMedium}`,
    })
    cellForMedium += 3;
  }
};

export { calculateAverage };
