/*
 *
 *  * @author    Tigren Solutions <info@tigren.com>
 *  * @copyright Copyright (c) 2023 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 *  * @license   Open Software License ("OSL") v. 3.0
 *  *
 *
 */

import React from 'react';
import {useQuery} from '@apollo/client';
import gql from 'graphql-tag';
import {forEach} from "lodash";

const GET_PRODUCTS = gql`
    query getProducts($filter: ProductAttributeFilterInput) {
        products(filter: $filter) {
            items {
                id
                uid
                name
                sku
                show_on_pwa
                image {
                    url
                }
                price_range {
                    minimum_price {
                        final_price {
                            value
                            currency
                        }
                    }
                }
            }
        }
    }
`;

function ListProduct() {

    const {loading, error, data} = useQuery(GET_PRODUCTS, {
        variables: {
            filter: {
                show_on_pwa: {
                    eq: true
                }
            }
        },
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-and-network'
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const products = data.products.items;
    console.log(products);
    return (
        <div>
            <h1>List Product</h1>
            <ul>
                {products && products.map((item) => {
                    return (
                        <li key={item.id}>
                            <img src={item.image.url} alt=""/>
                            <p>{item.name} - {item.sku} - {item.price_range.minimum_price.final_price.value}$</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default ListProduct;
