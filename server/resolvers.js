import { getJobs, getJob } from './db/jobs.js'
import { getCompany } from './db/companies.js'

export const resolvers = {
    Query: {
        job: (_root, {id}) => getJob(id),
        jobs: () => getJobs()
    },

    Job: {
        company: (job) => getCompany(job.companyId),
        date: (job) =>  toISODate(job.createdAt)
    }
}

const toISODate  = (value) => {
    return value.slice(0, 'yyyy-mm-dd'.length)
}