/*
*
* @author    Tigren Solutions <info@tigren.com>
* @copyright Copyright (c) 2023 Tigren Solutions <https://www.tigren.com>. All rights reserved.
* @license   Open Software License ("OSL") v. 3.0
*
*/

module.exports = targets => {
    targets.of("@magento/venia-ui").routes.tap(routes => {
        routes.push({
            name: "Login Page",
            pattern: "/login",
            path: require.resolve("../components/Login.js")
        });
        routes.push({
            name: "Customer Information",
            pattern: "/customer-information",
            path: require.resolve("../components/CustomerInformation.js")
        });
        routes.push({
            name: "Customer Information",
            pattern: "/customer-information/edit",
            path: require.resolve("../components/EditCustomerInformation.js")
        });
        routes.push({
            name: "List Product with Show on PWA Attribute",
            pattern: "/product/pwa",
            path: require.resolve("../components/ListProduct.js")
        });
        return routes;
    });
};
