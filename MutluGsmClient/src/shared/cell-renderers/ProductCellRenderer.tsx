import type { CustomCellRendererProps } from "ag-grid-react";
import { type FunctionComponent } from "react";

import styles from "./ProductCellRenderer.module.css";

export const ProductCellRenderer: FunctionComponent<
  CustomCellRendererProps
> = ({ value, data }) => {
  if (!data) return null;

  return (
    <div className={styles.productCell}>
      <div className={styles.image}>
        {data.mainImageUrl && (
          <img
            src={`https://localhost:7261/images/${data.mainImageUrl}`}
            alt={data.name}
          />
        )}
      </div>
      <div>
        <div>{value}</div>
      </div>
    </div>
  );
};
