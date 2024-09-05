import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip} from "@nextui-org/react";
import {Chip} from "@nextui-org/chip";
import { FaCheck } from "react-icons/fa";
import { TbProgress } from "react-icons/tb";
import { TiDelete } from "react-icons/ti";
import { AiFillDelete } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import {  MdEdit  } from "react-icons/md";


function ManageEvaluation() {
  return (
    <div className="h-100 container flex justify-center flex-col mx-auto items-center gap-6 my-6 px-44 text-center">

    <h2 className="text-2xl font-bold mb-4">Administrar evaluaciones</h2>

    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        <TableColumn className="bg-primary-300 text-white">Periodo</TableColumn>
        <TableColumn className="bg-primary-300 text-white">Fecha de cargue</TableColumn>
        <TableColumn className="bg-primary-300 text-white">Responsable del cargue</TableColumn>
        <TableColumn className="bg-primary-300 text-white">Estado</TableColumn>
        <TableColumn className="bg-primary-300 text-white">Acciones</TableColumn>

      </TableHeader>
      <TableBody>
        <TableRow key="1"  className="text-left">
          <TableCell>2024-2</TableCell>
          <TableCell>07/06/2024 12:45</TableCell>
          <TableCell>Jorge Garcia Torres</TableCell>
          <TableCell>    <Chip className="pl-3"
        startContent={<FaCheck size={13} />}
        variant="flat"
        color="success"
      >
        Cerrado
      </Chip>
          </TableCell>
          <TableCell>
          <div className="relative flex items-center gap-2">


      <Tooltip color="primary" content="Ver evalución">
              <span className="text-lg text-primary-400 cursor-pointer active:opacity-50">
                <FaEye />
              </span>
            </Tooltip>
            </div>
      </TableCell>
        </TableRow>
        <TableRow key="2" className="text-left">
          <TableCell>2024-1</TableCell>
          <TableCell>07/01/2024 08:45</TableCell>
          <TableCell>Daniel Ricaute Perez</TableCell>
          <TableCell><Chip className="pl-3"
        startContent={<TbProgress size={13} />}
        variant="flat"
        color="primary"
      >
        En progreso
      </Chip></TableCell>

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
        
      <Tooltip color="primary" content="Ver evalución">
              <span className="text-lg text-primary-400 cursor-pointer active:opacity-50">
                <FaEye />
              </span>
            </Tooltip>
      </div>
   
      </TableCell>

        </TableRow>
        <TableRow key="3" className="text-left">
          <TableCell>2023-2</TableCell>
          <TableCell>12/06/2023 15:45</TableCell>
          <TableCell>Luis Zambrano Gutierrez</TableCell>
          <TableCell><Chip className="pl-3"
        startContent={<TbProgress size={13} />}
        variant="flat"
        color="primary"
      >
        En progreso
      </Chip></TableCell>

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
        
      <Tooltip color="primary" content="Ver evalución">
              <span className="text-lg text-primary-400 cursor-pointer active:opacity-50">
                <FaEye />
              </span>
            </Tooltip>
      </div>
      </TableCell>

        </TableRow>
        <TableRow key="4" className="text-left">
          <TableCell>2023-1</TableCell>
          <TableCell>10/01/2023 08:45</TableCell>
          <TableCell>Wilmar Quitian Suarez</TableCell>
          <TableCell><Chip className="pl-3"
        startContent={<TiDelete size={13} />}
        variant="flat"
        color="danger"
      >
        Cancelado
      </Chip></TableCell>
      <TableCell>
      <Tooltip color="danger" content="Delete user">
        <span className="text-lg text-danger cursor-pointer active:opacity-50">
          <AiFillDelete />
        </span>
      </Tooltip>
      </TableCell>

        </TableRow>
        
      </TableBody>
    </Table>
    </div>
  )
}

export default ManageEvaluation
