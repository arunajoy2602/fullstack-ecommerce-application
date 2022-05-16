import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';


const Filters = ({ limit }) => (
    <ApolloConsumer>
        {client => (
            <>
                <label for='limit'>Number of products: </label>
                <select id='limit' value={limit} onChange={e =>
                    client.writeQuery({ 
                        query: gql`
                        query Limit($limit: Int!) {
                            limit
                          }`,
                        data: { limit: e.target.value } 
                        })}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </>
        )}
    </ApolloConsumer>
);
export default Filters;