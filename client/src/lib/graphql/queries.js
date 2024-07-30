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

export const apolloClient = new ApolloClient({
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

const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    date
    title
    company {
      id
      name
    }
    description
  }
`;

export const jobByIDQuery = gql`
    query jobByID ($id: ID!) {
        job(id: $id) {
            ...JobDetail
        }
    }
    ${jobDetailFragment}
 `;

export const companyByIdQuery = gql`
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
    }
 `;

export const jobsQuery = gql`
    query Jobs($limit: Int, $offset: Int) {
        jobs (limit: $limit, offset: $offset) {
            id
            title
            company {
                id
                name
            }
            date
        }
    }
`;

export const createJobMutation = gql`
    mutation createJob ($input: CreateJobInput!){
        job: createJob(input: $input) {
            ...JobDetail
        }
    }
    ${jobDetailFragment}
`;

/* export const getJobs = async() => {
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
} */

/* export const getJob = async(id) => {
    const { data } = await apolloClient.query({ 
        query: jobByIDQuery,
        variables: { id }
     })
    return data.job
}
 */