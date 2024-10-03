import { Chip } from "@nextui-org/chip";
import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip
} from "@nextui-org/react";
import { saveAs } from "file-saver";
import { onValue, ref as refDB, update } from "firebase/database";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import JSZip from "jszip";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaCloud } from "react-icons/fa";
import { IoCloudDownload } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { db, storage } from "../../firebase.config";

interface Evaluation {
  id: string;
  period: string;
  uploadDate: string;
  responsibleUser: string;
  state: number;
}

const ManageEvaluation = () => {
  const [evalutions, setEvaluations] = useState<Evaluation[]>([]);
  const [isSpinner, setisSpinner] = useState(false);

  const getEvaluations = () => {
    const starCountRef = refDB(db, "evaluations/");
    onValue(starCountRef, (snapshot) => {
      setEvaluations(snapshot.val());
    });
  };

  const downloadFils = async (perid: string) => {
    setisSpinner(true)
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
        saveAs(content, perid);
      });
    } catch (error) {
      console.log(error);
      setisSpinner(false)
    }

    setisSpinner(false)
  };

  const cancelEvaluation = (id: string) => {
    update(refDB(db, "evaluations/" + `${id}`), {
      state: 0,
    }).then();
  };

  useEffect(() => {
    getEvaluations();
  }, []);

  return (
    <div className="h-100 container flex justify-center flex-col mx-auto items-center gap-6 my-6 px-44 text-center">
      <h2 className="text-xl font-bold mb-4">Administrar evaluaciones</h2>

      <Table
        aria-label="Example table with dynamic content"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={1}
              total={1}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn className="bg-primary text-white text-sm">
            Periodo
          </TableColumn>
          <TableColumn className="bg-primary text-white text-sm">
            Fecha de cargue
          </TableColumn>
          <TableColumn className="bg-primary text-white text-sm">
            Responsable del cargue
          </TableColumn>
          <TableColumn className="bg-primary text-white text-sm">
            Estado
          </TableColumn>
          <TableColumn className="bg-primary text-white text-sm">
            Acciones
          </TableColumn>
        </TableHeader>
        <TableBody>
          {evalutions && Object.keys(evalutions).map((key: any) => {
            return (
              <TableRow key={key} className="text-left">
                <TableCell>{evalutions[key].period}</TableCell>
                <TableCell>{evalutions[key].uploadDate}</TableCell>
                <TableCell>{evalutions[key].responsibleUser}</TableCell>
                <TableCell>
                  {evalutions[key].state === 1 ? (
                    <Chip
                      className="pl-3"
                      startContent={<FaCloud size={13} />}
                      variant="flat"
                      color="success"
                    >
                      Cargadas
                    </Chip>
                  ) : (
                    <Chip
                      className="pl-3"
                      startContent={<MdCancel size={13} />}
                      variant="flat"
                      color="danger"
                    >
                      Cancelada
                    </Chip>
                  )}
                </TableCell>

                <TableCell>
                  <div className="relative flex items-center gap-2">
                    {evalutions[key].state === 1 && (
                      <Tooltip color="danger" content="Cancelar evaluación">
                        <span
                          onClick={() => cancelEvaluation(key)}
                          className="text-lg text-danger cursor-pointer active:opacity-50"
                        >
                          <AiFillDelete />
                        </span>
                      </Tooltip>
                    )}

                    <Tooltip color="primary" content="Descargar evaluaciones">
                      <span
                        onClick={() => downloadFils(evalutions[key].period)}
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

      {isSpinner && (
        <div className="flex justify-center items-center h-screen w-screen fixed z-40 bg-neutral-800 top-0 opacity-90">
          <Spinner label="Cargando..." color="primary" labelColor="primary" />
        </div>
      )}
    </div>
  );
};

export default ManageEvaluation;
