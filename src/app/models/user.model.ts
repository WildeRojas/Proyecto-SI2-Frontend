export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    password?: string;
    active: boolean;
    items: [];
}