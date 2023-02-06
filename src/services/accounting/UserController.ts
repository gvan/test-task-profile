import { getUserByCredentials, getUserByEmail, getUserById, getUserDBConnection, saveUser, updateUserAvatarById, updateUserById } from "../../persistence/sqlite";
import { UserResponse, UserSignUp } from "../../types";

export const registerUser = async (user: UserSignUp): Promise<UserResponse> => {
    if (!user.name || user.name === '' ||
        !user.email || user.email === '' ||
        !user.password || user.password === '' ||
        !user.phoneNumber || user.phoneNumber === '') {
        return { error: 'Invalid request' } as UserResponse;
    }

    const db = await getUserDBConnection();

    const userExists = await getUserByEmail(db, user.email);
    if (userExists.data != null) {
        return { error: 'User already exists' } as UserResponse;
    }

    const userId = await saveUser(db, user);
    if (!userId) {
        return { error: 'Failed to register user' } as UserResponse;
    }

    return getUserById(db, userId.toString());
}

export const loginUser = async (email: string, password: string): Promise<UserResponse> => {
    if (!email || email === '' ||
        !password || password === '') {
        return { error: 'Invalid request' } as UserResponse;
    }

    const db = await getUserDBConnection();

    return getUserByCredentials(db, email, password);
}

export const getUser = async (id: string): Promise<UserResponse> => {
    if (!id || id === '') {
        return { error: 'Invalid request' } as UserResponse;
    }

    const db = await getUserDBConnection();

    return getUserById(db, id);
}

export const updateUser = async (user: User): Promise<UserResponse> => {
    if (!user.id || user.id === '' ||
        !user.name || user.name === '' ||
        !user.email || user.email === '' ||
        !user.phoneNumber || user.phoneNumber === '') {
        return { error: 'Invalid request' } as UserResponse;
    }

    const db = await getUserDBConnection();
    const updated = await updateUserById(db, user);
    if (updated) {
        return getUserById(db, user.id);
    } else {
        return { error: 'Cannot update user' } as UserResponse;
    }
}

export const updateUserAvatar = async (id: string, avatar: string): Promise<UserResponse> => {
    if (!id || id === '' ||
        !avatar || avatar === '') {
        return { error: 'Invalid request' } as UserResponse;
    }

    const db = await getUserDBConnection();
    const updated = await updateUserAvatarById(db, id, avatar);
    if(updated) {
        return getUserById(db, id);
    } else {
        return {error: 'Cannot update user'} as UserResponse;
    }
}