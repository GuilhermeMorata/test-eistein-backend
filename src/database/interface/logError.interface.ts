export interface ILogErrorTable {
    error_id?: number;
    error_route: string;
    error_method: string;
    error_message: string;
    error_name: string;
    error_params?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}