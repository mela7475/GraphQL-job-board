import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('http://localhost:9000/graphql');

export const getJobs = async() => {
    const query = gql`
    query {
        jobs {
            id
            title
            company {
                id
                name
            }
            date
        }
    }`
    const {jobs} = await client.request(query);
    return jobs
}

export const getJob = async(id) => {
    const query = gql`
   query jobByID ($id: ID!) {
        job(id: $id) {
            id
            date
            title
            description
            company {
                id
                name
            }
        }
    }`
    const {job} = await client.request(query, {id});
    return job
}