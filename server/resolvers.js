import { GraphQLError } from 'graphql';
import { getJobs, getJob, getJobsByCompany, createJob } from './db/jobs.js'
import { getCompany } from './db/companies.js'

export const resolvers = {
    Query: {
        job: async (_root, {id}) => {
            const job = await getJob(id);
            if (!job) {
                throw notFoundError('No Job found with id ' + id)
            }
            return job;
        },
        jobs: () => getJobs(),
        company: async (_root, {id}) => {
            const company = await getCompany(id);
            if (!company) {
                throw notFoundError('No Company found with id ' + id)
            }
            return company;
        },
    },

    Mutation: {
        createJob: (_root, { input: { title, description}}) => {
            const companyId = 'FjcJCHJALA4i' // TODO set based on user
            return createJob({ companyId, title, description})
        }
    },

    Company: {
        jobs: (company) => getJobsByCompany(company.id),
    },

    Job: {
        company: (job) => getCompany(job.companyId),
        date: (job) =>  toISODate(job.createdAt)
    }
}

const toISODate  = (value) => {
    return value.slice(0, 'yyyy-mm-dd'.length)
}

const notFoundError = (message) => {
    return new GraphQLError(message, {
        extensions: {code: 'NOT_FOUND'}
    })
}