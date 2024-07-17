import { GraphQLError } from 'graphql';
import { getJobs, getJob, getJobsByCompany, createJob, deleteJob, updateJob } from './db/jobs.js'
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
        createJob: (_root, { input: { title, description}}, { auth }) => {
            if (!auth) {
                throw unauthorizedError('Missing authentication')
            }

            return createJob({ companyId: user.companyId, title, description})
        },
        deleteJob: async (_root, { id }, { user }) => {
            if (!user) {
                throw unauthorizedError('Missing authentication')
            }

            const job = await deleteJob(id, user.companyId)
            if(!job) {
                throw notFoundError('No Job found with id ' + id);
            }
            return job
        },
        updateJob: async (_root, {input: {id, title, description}}, { user }) => {
            if (!user) {
                throw unauthorizedError('Missing authentication')
            }
            const job = await updateJob({id, companyId: user.companyId, title, description})
            if(!job) {
                throw notFoundError('No Job found with id ' + id)
            }
            return job
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

const unauthorizedError = (message) => {
    return new GraphQLError(message, {
        extensions: {code: 'UNAUTHORIZED'}
    })
}