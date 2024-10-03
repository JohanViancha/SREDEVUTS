import { Chip } from "@nextui-org/chip";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { onValue, ref as refDB } from "firebase/database";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { IoCloudDownload } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { TbProgress } from "react-icons/tb";
import { db, storage } from "../../firebase.config";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface Evaluation {
  id: string;
  period: string;
  uploadDate: string;
  responsibleUser: string;
  state: number;
}

const ManageEvaluation = () => {
  const [evalutions, setEvaluations] = useState<Evaluation[]>([]);

  const getEvaluations = () => {
    const starCountRef = refDB(db, "evaluations/");
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((data) => {
        console.log(data);
        const newEvaluation = data.val();
        const key = data.key;
        setEvaluations((evaluation) => [
          ...evaluation,
          { ...newEvaluation, id: key },
        ]);
      });
    });
  };

  const downloadFils = async (perid: string) => {
    const storageRef = ref(storage, perid);

    try {
      const result = await listAll(storageRef);
      const downloadURLs = [];

      for (const itemRef of result.items) {
        const url = await getDownloadURL(itemRef);
        downloadURLs.push({ url, name: itemRef.name });
      }

      const zip = new JSZip();

      for (const [index, file] of downloadURLs.entries()) {
        try {
          const response = await fetch(file.url);
          const blob = await response.blob();
          const fileName = `${file.name}`;
          zip.file(fileName, blob, { binary: true });
        } catch (error) {
          console.error(`Error al descargar el archivo ${index + 1}:`, error);
        }
      }

      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, perid );
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvaluations();
  }, []);

  return (
    <div className="h-100 container flex justify-center flex-col mx-auto items-center gap-6 my-6 px-44 text-center">
      <h2 className="text-xl font-bold mb-4">Administrar evaluaciones</h2>

      <Table aria-label="Example table with dynamic content">
        <TableHeader>
          <TableColumn className="bg-primary-300 text-white">
            Periodo
          </TableColumn>
          <TableColumn className="bg-primary-300 text-white">
            Fecha de cargue
          </TableColumn>
          <TableColumn className="bg-primary-300 text-white">
            Responsable del cargue
          </TableColumn>
          <TableColumn className="bg-primary-300 text-white">
            Estado
          </TableColumn>
          <TableColumn className="bg-primary-300 text-white">
            Acciones
          </TableColumn>
        </TableHeader>
        <TableBody>
          {evalutions.map((evaluation) => {
            return (
              <TableRow key={evaluation.id} className="text-left">
                <TableCell>{evaluation.period}</TableCell>
                <TableCell>{evaluation.uploadDate}</TableCell>
                <TableCell>{evaluation.responsibleUser}</TableCell>
                <TableCell>
                  {evaluation.state === 0 && (
                    <Chip
                      className="pl-3"
                      startContent={<TbProgress size={13} />}
                      variant="flat"
                      color="primary"
                    >
                      En progreso
                    </Chip>
                  )}
                </TableCell>

                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip color="danger" content="Cancelar evaluación">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <AiFillDelete />
                      </span>
                    </Tooltip>

                    <Tooltip color="warning" content="Editar evaluación">
                      <span className="text-lg text-orange-500 cursor-pointer active:opacity-50">
                        <MdEdit />
                      </span>
                    </Tooltip>

                    <Tooltip color="primary" content="Descargar evaluaciones">
                      <span
                        onClick={() => downloadFils(evaluation.period)}
                        className="text-lg text-primary-400 cursor-pointer active:opacity-50"
                      >
                        <IoCloudDownload />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageEvaluation;
