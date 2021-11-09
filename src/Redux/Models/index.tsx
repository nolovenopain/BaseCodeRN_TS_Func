export interface UserModel {
    firstName: string
    lastName: string
    email: string
    phone: string
    token: string
    verified: boolean
}

export interface UserState {
    user: UserModel
    location: Object
    error: string | undefined
}