import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { GraphQLClient } from 'graphql-request';
import { getAccessToken } from '../auth';

const client = new GraphQLClient('http://localhost:9000/graphql', {
    headers: () => {
        const accessToken = getAccessToken();
        if (accessToken) {
            return { 'Authorization': `Bearer ${accessToken}`}
        }
        return {}
    }
});

const apolloClient = new ApolloClient({
    uri: 'http://localhost:9000/graphql',
    cache: new InMemoryCache()
});

export async function createJob({ title, description}) {
    const mutation = gql`
        mutation createJob ($input: CreateJobInput!){
            job: createJob(input: $input) {
                id
            }
        }
    `
    const { job } = await client.request(mutation, {
        input: { title, description}
    })
    return job;
}

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
    const { data } = await apolloClient.query({ query })
    return data.jobs
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
    const { data } = await apolloClient.query({ 
        query,
        variables: { id }
     })
    return data.job
}

export const getCompany = async(id) => {
    const query = gql`
   query comapnyById ($id: ID!) {
        company(id: $id) {
            id
            name
            description
            jobs {
              id
              title
              date
            }
        }
    }`
    //const {company} = await client.request(query, {id});
    const { data } = await apolloClient.query({
        query,
        variables: { id }
    })
    return data.company
}