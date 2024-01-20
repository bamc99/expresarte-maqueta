export interface CustomErrorInterface extends Error {
    response?: {
      status: number;
      data: {
        message: string;
      };
    };
}