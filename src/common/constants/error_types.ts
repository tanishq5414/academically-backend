const ErrorType = {
    INTERNAL_SERVER_ERROR: {
        type: 'internal_server_error',
        status: 500,
    },
    UNAUTHORIZED: {
        type: 'unauthorized',
        status: 401,
    },
    FORBIDDEN: {
        type: 'forbidden',
        status: 403,
    }
}