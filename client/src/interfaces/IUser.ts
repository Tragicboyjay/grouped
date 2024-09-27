export interface IUser {
    id: number;
    username: string;
    email: string;
    created_at: Date;
    token: string;
    password?: string;
    hobbies?: string;
    interests?: string;
}