import { getJobs } from './db/jobs.js'
export const resolvers = {
    Query: {
        jobs: () => getJobs()
    },

    Job: {
        date: (job) =>  toISODate(job.createdAt)
    }
}

const toISODate  = (value) => {
    return value.slice(0, 'yyyy-mm-dd'.length)
}