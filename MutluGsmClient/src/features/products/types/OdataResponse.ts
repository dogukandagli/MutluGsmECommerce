export type ODataResponse<T> = {
  value: T[];
  "@odata.count"?: number;
};
