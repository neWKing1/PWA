/*
 *
 *  * @author    Tigren Solutions <info@tigren.com>
 *  * @copyright Copyright (c) 2023 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 *  * @license   Open Software License ("OSL") v. 3.0
 *  *
 *
 */
import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const GET_CUSTOMER_INFO = gql`
    {
        customer {
            id
            firstname
            lastname
            email
            department
            # Add other customer attributes you want to display
        }
    }
`;

function CustomerInformation() {``
    const { loading, error, data } = useQuery(GET_CUSTOMER_INFO, {
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-and-network'
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const customer = data.customer;
    return (
        <div>
            <h1>Customer Information</h1>
            <p>
                <strong>Name:</strong> {customer.firstname} {customer.lastname}
            </p>
            <p>
                <strong>Email:</strong> {customer.email}
            </p>
            {/* Add other customer information as needed */}
            <p>
                <strong>Department:</strong> {customer.department}
            </p>
            <a href={'/customer-information/edit'}>Edit</a>
        </div>
    );
}

export default CustomerInformation;
