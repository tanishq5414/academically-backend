const ErrorType = {
    INTERNAL_SERVER_ERROR: {
        message: 'Internal server error',
        type: 'internal_server_error',
        status: 500,
    },
    UNAUTHORIZED: {
        message: 'Unauthorized',
        type: 'unauthorized',
        status: 401,
    },
    FORBIDDEN: {
        message: 'Forbidden',
        type: 'forbidden',
        status: 403,
    },
    INVALID_REQUEST: {
        message: 'Invalid request',
        type: 'invalid_request',
        status: 400,
    },

}

export { ErrorType };