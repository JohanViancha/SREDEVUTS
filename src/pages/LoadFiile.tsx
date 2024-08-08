import { Button, Select, SelectItem } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { write, writeFile, utils, WorkBook, WorkSheet } from "xlsx";
import { readFileXlsx, uploadXLSX } from "../services/manageFile";
import { calculateAverage } from "../services/reportByModule";


const LoadFile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const generateReport = async ({ file }: any) => {
    let workbook = await readFileXlsx(file[0]);
    const sheetNames = workbook.SheetNames;

    sheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      calculateAverage(worksheet)
    });

    const fileContent = write(workbook, { bookType: "xlsx", type: "buffer" });
    uploadXLSX(fileContent, file[0].name);
  };

  return (

  
    <form
      className="h-screen container flex justify-center flex-col mx-auto items-center gap-6 mt-6 text-center"
      onSubmit={handleSubmit(generateReport)}
    >
      <h2 className="text-2xl font-bold mb-4">Cargue de Archivo</h2>

      <h3 className="text-xl font-bold mb-4">Cargue de evaluación por módulos</h3>
      <p>El documento de evaluación docente por módulos es un informe estructurado que recoge la evaluación de los docentes en relación con los diferentes módulos o materias que imparten. Este documento contiene información detallada sobre el rendimiento, metodologías de enseñanza, competencias desarrolladas, y feedback tanto de estudiantes como de evaluadores internos.</p>
      <input
        accept="*.xlxs"
        type="file"
        className="mb-3 mx-auto rounded-lg block text-sm bg-slate-100 rad
      file:cursor-pointer
      file:mr-4 file:py-2 file:px-4
      file:rounded-lg file:border-2
      file:text-sm file:font-semibold
      file:border-primary
      hover:file:opacity-75"
        {...register("for-modules")}
      />

    <h3 className="text-xl font-bold mb-4">Cargue de coevaluación</h3>
      <p>El documento de coevaluación es un informe en el que los docentes evalúan el desempeño de sus colegas, proporcionando una visión integral y colaborativa sobre las prácticas educativas.</p>
      <input
        accept="*.xlxs"
        type="file"
        className="mb-3 mx-auto rounded-lg block text-sm bg-slate-100 rad
      file:cursor-pointer
      file:mr-4 file:py-2 file:px-4
      file:rounded-lg file:border-2
      file:text-sm file:font-semibold
      file:border-primary
      hover:file:opacity-75"
        {...register("coevaluation")}
      />

      
    <h3 className="text-xl font-bold mb-4">Superior Jerárquico</h3>
      <p>
      El documento de evaluación del superior jerárquico es un informe en el que un superior, como un director o coordinador académico, evalúa el desempeño de un docente o subordinado en sus funciones educativas.</p>
      <input
        accept="*.xlxs"
        type="file"
        className="mb-3 mx-auto rounded-lg block text-sm bg-slate-100 rad
      file:cursor-pointer
      file:mr-4 file:py-2 file:px-4
      file:rounded-lg file:border-2
      file:text-sm file:font-semibold
      file:border-primary
      hover:file:opacity-75"
        {...register("coevaluation")}
      />
      <Button type="submit" className="text-white" color="primary">
        Generar informe
      </Button>
    </form>
  
  );
};

export default LoadFile;
