export type Authorize = {
    response_type: string
    client_id: string
    state: string
    redirect_uri: string
    scope: string
    [key: string]: any
}