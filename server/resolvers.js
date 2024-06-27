export const resolvers = {
    Query: {
        jobs: () => {
            return [
                {
                    id: 'test-id1',
                    title: 'The Title',
                    description: 'The description'
                },
                {
                    id: 'test-id2',
                    title: 'The Title',
                    description: 'The description'
                }
            ]
        }
    }
}