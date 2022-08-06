import {WorkloadRecordDto} from "./workload-record.dto";

export interface StudioDto {
  id: number,
  name: string,
  workloadRecords: WorkloadRecordDto[]
}
