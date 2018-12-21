export type AuthorizeParam = {
    response_type: string
    client_id: string
    state: string
    redirect_uri: string
    scope: string
    [key: string]: any
}

export type TokenParam = {
    response_type: string
    client_id: string
    code: string
    redirect_uri: string
    [key: string]: any
}