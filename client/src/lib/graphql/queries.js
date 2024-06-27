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