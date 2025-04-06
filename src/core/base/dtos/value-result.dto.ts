export class ValueResult<T> {
  
  private value?: T;
  private error?: string;

  constructor(params: {
    value?: T,
    error?: string
  }) {
    this.value = params.value;
    this.error = params.error;
  }

  public getValue(): T | undefined {
    return this.value;
  }

  public getError(): string | undefined {
    return this.error;
  }

  public isSuccess(): boolean {
    return this.error === undefined;
  }

  public isError(): boolean {
    return this.error !== undefined;
  }

}