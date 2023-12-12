import React, {useState, useEffect} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import gql from 'graphql-tag';

const GET_CUSTOMER_INFO = gql`
    {
        customer {
            id
            firstname
            lastname
            department
            # Add other customer attributes you want to display
        }
    }
`;
const UPDATE_CUSTOMER_MUTATION = gql`
    mutation UpdateCustomer($input: UpdateCustomerInput!) {
        updateCustomer(input: $input) {
            id
            firstname
            lastname
            department
        }
    }
`;

const EditCustomerInformation = () => {

    const [id, setId] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [department, setDepartment] = useState('');

    const {data} = useQuery(GET_CUSTOMER_INFO, {
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-and-network'
    });
    const [updateCustomer, {loading, error}] = useMutation(UPDATE_CUSTOMER_MUTATION);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    useEffect(() => {
        if (data && data.customer) {
            const {id, firstname, lastname, department} = data.customer;
            setId(id);
            setFirstName(firstname);
            setLastName(lastname);
            setDepartment(department);
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const {data} = await updateCustomer({
                variables: {
                    input: {
                        department: department
                    },
                }
            });

            window.location.href="/customer-information";
        } catch (error) {
            // Handle error, if needed
            console.error('Error updating customer:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Input fields for updating customer information */}

            <p>First Name: {firstname}</p>
            <p>Last Name: {lastname}</p>

            <input
                type="text"
                name="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Department"
            />
            {/* Add other input fields as needed */}
            <button type="submit" disabled={loading}>
                Update Customer
            </button>

            {error && <p>Error: {error.message}</p>}
        </form>
    );
};

export default EditCustomerInformation;
