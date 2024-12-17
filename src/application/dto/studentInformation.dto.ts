import { StepM } from "src/domain/entities/step";

export class StudentInformationDto {
  name: string;
  current: number;
  amount: string;
  columns: object;
  steps: StepM[]
}