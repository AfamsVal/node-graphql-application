declare module "mysqli" {
  export class Connection {
    constructor(options: {
      host?: string;
      port?: number;
      user?: string;
      password?: string;
      database?: string;
    });
    connect(callback: (err?: Error) => void): void;
    query(
      sql: string,
      callback?: (err: Error, result: any) => void
    ): Promise<any>;
    close(): void;
  }
}
