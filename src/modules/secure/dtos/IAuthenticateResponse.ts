interface IAuthenticateResponse {
    user: {
        email: string;
        name: string;
    };
    token: string;
}

export { IAuthenticateResponse };
