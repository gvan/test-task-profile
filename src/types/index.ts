export interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    position: string;
    skype: string;
    avatar: string;
}

export interface UserResponse {
    data: User;
    error: string;
}

export interface UserSignUp {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}