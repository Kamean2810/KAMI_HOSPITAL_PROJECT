declare module "express-fileupload" {
  import { RequestHandler } from "express";

  export interface UploadedFile {
    name: string;
    mv: (path: string) => Promise<void>;
    mimetype: string;
    tempFilePath: string;
    size: number;
    encoding: string;
    md5: string;
    truncated: boolean;
    data: Buffer;
  }

  interface FileArray {
    [fieldname: string]: UploadedFile | UploadedFile[];
  }

  function fileUpload(options?: any): RequestHandler;

  namespace fileUpload {
    export { UploadedFile, FileArray };
  }

  export default fileUpload;
}
