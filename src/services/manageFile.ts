import { getStorage, ref, uploadBytes } from "firebase/storage";
import { read } from "xlsx";

const uploadXLSX = async (file: File, filename: string) => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, `2024-1/${filename}`);
    await uploadBytes(storageRef, file).then((snapshot: any) => {
      return console.log("Uploaded a blob or file!", snapshot);
    });

    return "ok";
  } catch (error) {
    console.log(error);
    return "error";
  }
};

const readFileXlsx = async (file: File) => {
  const ab = await file.arrayBuffer();
  const workbook = read(ab);
  return workbook;
};

export { readFileXlsx, uploadXLSX };
