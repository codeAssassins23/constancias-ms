import { StepM } from "src/domain/entities/step";
import { ColumnsType } from "../types/columns.type";

export class StudentInformationDto {
  name: string;
  current: number;
  amount: string;
  columns: ColumnsType;
  steps: StepM[]
}