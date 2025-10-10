import type { CustomCellRendererProps } from "ag-grid-react";
import { type FunctionComponent } from "react";

import styles from "./ProductCellRenderer.module.css";
import { apiUrl } from "../lib/apiClient";

export const ProductCellRenderer: FunctionComponent<
  CustomCellRendererProps
> = ({ value, data }) => {
  if (!data) return null;

  return (
    <div className={styles.productCell}>
      <div className={styles.image}>
        {data.mainImageUrl && (
          <img src={`${apiUrl}images/${data.mainImageUrl}`} alt={data.name} />
        )}
      </div>
      <div>
        <div>{value}</div>
      </div>
    </div>
  );
};
