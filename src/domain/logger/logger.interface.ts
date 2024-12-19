export interface ILooger {
  logRequest(
    message: string,
    additionalFields?: Partial<Record<string, any>>,
  ): void;
  Error(
    message: string,
    trace?: string,
    additionalFields?: Partial<Record<string, any>>,
  ): void;
}
