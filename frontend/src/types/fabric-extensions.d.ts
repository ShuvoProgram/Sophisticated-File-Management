// types/fabric-extensions.d.ts

import { fabric } from "fabric";

declare module "fabric" {
  namespace fabric {
    const document: Document;
  }
}
