
export type CustomerType = {
    _id?: number,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string | undefined,
    queue?: string | Date,
    status?: "pending" | "approved"
}