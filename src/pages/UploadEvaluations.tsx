import { Divider } from "@nextui-org/divider";
import { Button, Chip } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { write } from "xlsx";
import { readFileXlsx, uploadXLSX } from "../services/manageFile";
import { calculateAverage } from "../services/reportByModule";
import {Select, SelectItem} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/react";


const UploadEvaluations = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const generateReport = async ({ file }: any) => {
    
    console.log('Test', file)
    // let workbook = await readFileXlsx(file[0]);
    // const sheetNames = workbook.SheetNames;

    // sheetNames.forEach((sheetName) => {
    //   const worksheet = workbook.Sheets[sheetName];
    //   calculateAverage(worksheet)
    // });

    // const fileContent = write(workbook, { bookType: "xlsx", type: "buffer" });
    // uploadXLSX(fileContent, file[0].name);
  };

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
        {...register("period", {required: true})}
      >
        
          <SelectItem key={1} value={1}>
            2024-01
          </SelectItem>

          <SelectItem key={2} value={2}>
            2024-02
          </SelectItem>

          <SelectItem key={3} value={3}>
            2024-03
          </SelectItem>

          <SelectItem key={4} value={4}>
            2024-04 
          </SelectItem>
    
    
    
      </Select>
      {/* <Chip size="sm" variant="light" color="danger">Este campo es requerido</Chip> */}

    <div className="w-100 flex flex-col gap-6">
      <h3 className="text-xl font-bold">Cargue de evaluación por módulos</h3>
            <p>El documento de evaluación docente por módulos es un informe estructurado que recoge la evaluación de los docentes en relación con los diferentes módulos o materias que imparten. </p>
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
              {...register("for-modules", {required: true})}
            />
            {/* <Chip className="m-auto" size="sm" variant="light" color="danger">El cargue del archivo es requerido</Chip> */}

        <Divider orientation="horizontal" />
    </div>
    
    <div className="w-100 flex flex-col gap-6">
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
        {...register("coevaluation", {required: true})}
      />
        {/* <Chip size="sm" className="m-auto" variant="light" color="danger">El cargue del archivo es requerido</Chip> */}


<Divider orientation="horizontal" />
    </div>


<div className="w-100 flex flex-col gap-6">

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
        {...register("hierarchical-superior", {required: true})}
      />
      {/* <Chip size="sm" className="m-auto" variant="light" color="danger">El cargue del archivo es requerido</Chip> */}
      <Divider orientation="horizontal" />

</div>

<div className="w-100 flex flex-col gap-6">

<h3 className="text-xl font-bold mb-4">Autoevaluación</h3>
      <p>
      La autoevaluación docente es un proceso reflexivo en el que los profesores evalúan su propio desempeño en el aula, identificando fortalezas y áreas de mejora.</p>
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
        {...register("autoevaluation", {required: true})}
      />
      {/* <Chip size="sm" className="m-auto" variant="light" color="danger">El cargue del archivo es requerido</Chip> */}

</div>
   
   
     <Button color="primary" type="submit">
      Generar Informe
    </Button>

    </form> 
    <Modal backdrop="opaque" isOpen={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Subida de archivos</ModalHeader>
              <ModalBody>
                <p> 
                  El archivo se ha subido correctamente al almacenamiento en la nube.
                </p>
               
              </ModalBody>
              <ModalFooter>
               
                <Button color="primary" onPress={onClose}>
                  Ok
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </>

  
  );
};

export default UploadEvaluations;
