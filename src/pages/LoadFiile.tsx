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
      <h3 className="text-xl font-bold mb-4">Cargue de Archivo</h3>
      <Select
        isRequired
        variant="bordered"
        label="Tipo de informe"
        className="max-w-xs"
        defaultSelectedKeys={["1"]}
        {...register("typeReport")}
      >
        <SelectItem key={"1"} value={"modulos"}>
          Evaluación por módulos
        </SelectItem>
        <SelectItem key={"2"} value={"coevaluacion"}>
          Coevaluaciónn
        </SelectItem>
        <SelectItem key={"3"} value={"jerarquico"}>
          Evaluación Superior Jerárquico
        </SelectItem>
      </Select>
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
        {...register("file")}
      />
      <Button type="submit" className="text-white" color="primary">
        Generar informe
      </Button>
    </form>
  );
};

export default LoadFile;
