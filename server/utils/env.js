import dotenv from 'dotenv'

dotenv.config()

export const env = {
    PORT : process.env.PORT,
    SERVER_NAME:process.env.SERVER_NAME,
    MONGO_URI:process.env.MONGO_URI,
    NODE_ENV:process.env.NODE_ENV,
    CLERK_SECRET_KEY:process.env.CLERK_SECRET_KEY,
    CLERK_PUBLISHABLE_KEY:process.env.CLERK_PUBLISHABLE_KEY,
    STREAM_API_KEY:process.env.STREAM_API_KEY,
    STREAM_API_SECRET:process.env.STREAM_API_SECRET,
    SENTRY_DSN:process.env.SENTRY_DSN,
    INNGEST_EVENTS_KEY:process.env.INNGEST_EVENTS_KEY,
    INNGEST_SIGNING_KEY:process.env.INNGEST_SIGNING_KEY,
}