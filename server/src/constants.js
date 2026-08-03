export const DB_NAME = "complete_authentication"
export const cookiesOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
    // maxAge: 10 * 24 * 60 * 60 * 1000
}