/*
 *
 *  * @author    Tigren Solutions <info@tigren.com>
 *  * @copyright Copyright (c) 2023 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 *  * @license   Open Software License ("OSL") v. 3.0
 *  *
 *
 */

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';



const CUSTOMER_LOGIN = gql`
    mutation CustomerLogin($username: String!, $password: String!) {
        generateCustomerToken(email: $username, password: $password) {
            token
        }
    }
`;

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [customerLogin] = useMutation(CUSTOMER_LOGIN, {
        onCompleted: (data) => {
            // Assuming the token is returned on successful login
            const token = data.generateCustomerToken.token;
            // Perform any necessary actions with the token, e.g., store it in a global state
            localStorage.setItem('authToken', token);
            // Redirect to the customer information page
            history.push('/customer-information');
        },
    });


    const handleLogin = () => {
        customerLogin({
            variables: { username, password },
        });
    };

    return (
        <div>
            {/* Your login form UI */}
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{
                borderColor: "red",
                borderWidth: 1,
            }}/>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} style={{
                borderColor: "red",
                borderWidth: 1,
            }}/>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
