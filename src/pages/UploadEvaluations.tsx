import { Divider } from "@nextui-org/divider";
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { write } from "xlsx";
import { db } from "../../firebase.config";
import { readFileXlsx, uploadXLSX } from "../services/manageFile";
import { calculateAutoevaluation } from "../services/reportAutoevaluacion";
import { calculateAverage } from "../services/reportByModule";
import { calculateCoevaluation } from "../services/reportCoevaluation";

const UploadEvaluations = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [stateDialog, setStateDialog] = useState(0);
  const [dataCurrent, setDateCurrent] = useState(new Date());

  const generateReportForModules = async (file: File, directory: string) => {
    let workbook = await readFileXlsx(file);

    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      calculateAverage(worksheet);
    });

    const fileContent = await write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });
    await uploadXLSX(fileContent, file.name, directory);
  };

  const generateReportAutoevalution = async (file: File, directory: string) => {
    let workbook = await readFileXlsx(file);
    const sheetNames = workbook.SheetNames;
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const newWork = calculateAutoevaluation(worksheet);
    workbook.Sheets[sheetNames[0]] = newWork;

    const fileContent = write(workbook, { bookType: "xlsx", type: "buffer" });
    await uploadXLSX(fileContent, file.name, directory);
  };

  const generateReportCoevaluation = async (file: File, directory: string) => {
    let workbook = await readFileXlsx(file);
    const sheetNames = workbook.SheetNames;
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const newWork = calculateCoevaluation(worksheet);
    workbook.Sheets[sheetNames[0]] = newWork;

    const fileContent = write(workbook, { bookType: "xlsx", type: "buffer" });
    await uploadXLSX(fileContent, file.name, directory);
  };

  const generateReportHierarchicalSuperior = async (
    file: File,
    directory: string
  ) => {
    let workbook = await readFileXlsx(file);
    const sheetNames = workbook.SheetNames;
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const newWork = calculateCoevaluation(worksheet);
    workbook.Sheets[sheetNames[0]] = newWork;

    const fileContent = write(workbook, { bookType: "xlsx", type: "buffer" });
    await uploadXLSX(fileContent, file.name, directory);
  };

  const generateReport = async (data: any) => {
    try {
      setStateDialog(1);
      await generateReportForModules(data["for-modules"][0], data.period);
      await generateReportAutoevalution(data["autoevaluation"][0], data.period);
      await generateReportCoevaluation(data["coevaluation"][0], data.period);
      await generateReportHierarchicalSuperior(
        data["hierarchical-superior"][0],
        data.period
      );
      setTitle("Subir archivos");
      setBody("Los archivos han sido guardados correctamente");
      setStateDialog(2);

      set(ref(db, "evaluations/" + `${uuidv4()}`), {
        period: data.period,
        uploadDate: dataCurrent.toLocaleString(),
        state: 0,
        responsibleUser: "Johan Ferney Viancha",
      })
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    } catch (error) {
      setTitle("Subir archivos");
      setBody("Error al tratar de subir los archivos a la nube");
      setStateDialog(2);
    }
  };

  const onClose = () => {
    setStateDialog(0);
  };

  useEffect(() => {
    setDateCurrent(new Date());
  }, []);

  return (
    <>
      <form
        className="h-100 container flex justify-center flex-col mx-auto items-center gap-6 my-6 px-44 text-center"
        onSubmit={handleSubmit(generateReport)}
      >
        <h2 className="text-2xl font-bold mb-4">Cargue de Archivos</h2>
        <Select
          label="Periodo de evaluación"
          className="max-w-xs"
          {...register("period", { required: true })}
        >
          <SelectItem
            key={`${dataCurrent.getFullYear()}-01`}
            value={`${dataCurrent.getFullYear()}-01`}
          >
            {`${dataCurrent.getFullYear()}-01`}
          </SelectItem>
          <SelectItem
            key={`${dataCurrent.getFullYear()}-02`}
            value={`${dataCurrent.getFullYear()}-02`}
          >
            {`${dataCurrent.getFullYear()}-02`}
          </SelectItem>

          <SelectItem
            key={`${dataCurrent.getFullYear()}-03`}
            value={`${dataCurrent.getFullYear()}-03`}
          >
            {`${dataCurrent.getFullYear()}-03`}
          </SelectItem>

          <SelectItem
            key={`${dataCurrent.getFullYear()}-04`}
            value={`${dataCurrent.getFullYear()}-04`}
          >
            {`${dataCurrent.getFullYear()}-04`}
          </SelectItem>
        </Select>
        {errors["period"] && (
          <Chip size="sm" variant="light" color="danger">
            Este campo es requerido
          </Chip>
        )}
        
        <div className="w-unit-9xl flex flex-col gap-6">
          <h3 className="text-xl font-bold">Evaluación por módulos</h3>
          <p className="">
            El documento de evaluación docente por módulos es un informe
            estructurado que recoge la evaluación de los docentes en relación
            con los diferentes módulos o materias que imparten.{" "}
          </p>
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
            {...register("for-modules", { required: true })}
          />
          {errors["for-modules"] && (
            <Chip className="m-auto" size="sm" variant="light" color="danger">
              El cargue del archivo es requerido
            </Chip>
          )}

          <Divider orientation="horizontal" />
        </div>
        <div className="w-unit-9xl flex flex-col gap-6">
          <h3 className="text-xl font-bold mb-4">Coevaluación</h3>
          <p>
            El documento de coevaluación es un informe en el que los docentes
            evalúan el desempeño de sus colegas, proporcionando una visión
            integral y colaborativa sobre las prácticas educativas.
          </p>
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
            {...register("coevaluation", { required: true })}
          />
          {errors.coevaluation && (
            <Chip size="sm" className="m-auto" variant="light" color="danger">
              El cargue del archivo es requerido
            </Chip>
          )}

          <Divider orientation="horizontal" />
        </div>
        <div className="w-unit-9xl flex flex-col gap-6">
          <h3 className="text-xl font-bold mb-4">Superior Jerárquico</h3>
          <p>
            El documento de evaluación del superior jerárquico es un informe en
            el que un superior, como un director o coordinador académico, evalúa
            el desempeño de un docente o subordinado en sus funciones
            educativas.
          </p>
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
            {...register("hierarchical-superior", { required: true })}
          />
          {errors["hierarchical-superior"] && (
            <Chip size="sm" className="m-auto" variant="light" color="danger">
              El cargue del archivo es requerido
            </Chip>
          )}
          <Divider orientation="horizontal" />
        </div>
        <div className="w-unit-9xl flex flex-col gap-6">
          <h3 className="text-xl font-bold mb-4">Autoevaluación</h3>
          <p>
            La autoevaluación docente es un proceso reflexivo en el que los
            profesores evalúan su propio desempeño en el aula, identificando
            fortalezas y áreas de mejora.
          </p>
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
            {...register("autoevaluation", { required: true })}
          />
          {errors.autoevaluation && (
            <Chip size="sm" className="m-auto" variant="light" color="danger">
              El cargue del archivo es requerido
            </Chip>
          )}
        </div>
        <Button color="primary" type="submit">
          Subir archivos
        </Button>
      </form>

      <Modal backdrop="opaque" isOpen={stateDialog !== 0}>
        {stateDialog === 1 ? (
          <div className="flex justify-center items-center h-screen w-screen fixed z-40 bg-neutral-800 top-0 opacity-90">
            <Spinner label="Cargando..." color="primary" labelColor="primary" />
          </div>
        ) : (
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <Divider orientation="horizontal" />

            <ModalBody>
              <p>{body}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={onClose}>
                Ok
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  );
};

export default UploadEvaluations;
