import { ApolloClient, ApolloLink, createHttpLink, gql, InMemoryCache, concat } from '@apollo/client'
import { getAccessToken } from '../auth';

const httpLink = createHttpLink({ uri: 'http://localhost:9000/graphql' });

const authLink = new ApolloLink((operation, forward) => {
    const accessToken = getAccessToken();
        if (accessToken) {
            //return { 'Authorization': `Bearer ${accessToken}`}
            operation.setContext({
                headers: { 'Authorization': `Bearer ${accessToken}`}
            })
        }
    return forward(operation)
})

const apolloClient = new ApolloClient({
    link: concat(authLink, httpLink),
    cache: new InMemoryCache(),
    /* defaultOptions: {
        query: {
            fetchPolicy: 'network-only'
        },
        watchQuery: {
            fetchPolicy: 'network-only'
        }
    } */
});

export async function createJob({ title, description}) {
    const mutation = gql`
        mutation createJob ($input: CreateJobInput!){
            job: createJob(input: $input) {
                id
            }
        }
    `

    const { data } = await apolloClient.mutate({
        mutation,
        variables: {
            input: { title, description}
        }
    })
    return data;
}

export const getJobs = async() => {
    const query = gql`
    query Jobs {
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
    const { data } = await apolloClient.query({ 
        query,
        fetchPolicy: 'network-only'
     })
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