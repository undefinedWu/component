import { CSSProperties } from "react";

declare module "*.module.css" {
  const styles: Record<string, CSSProperties>;
  export default styles;
}
