function getAPIRequestURL(requestPath) {
    const API_URL = process.env.PUBLIC_API_URL || process.env.DEVELOPMENT_API_URL;
    return API_URL + requestPath;
}

export default getAPIRequestURL;
