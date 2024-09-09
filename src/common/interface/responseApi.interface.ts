
export default interface IObjectResponse {
    status: number;
    message?: {
        errors?: string[];
        success?: any;
    };
    data?: any;
    hash?: any;
}