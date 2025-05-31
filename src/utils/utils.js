function getZodError(errors = []) {
    if (!Array.isArray(errors) || errors.length === 0) {
        return "An unknown error occurred";
    }

    return errors.map(err => err.message)[0]
}

export { getZodError };