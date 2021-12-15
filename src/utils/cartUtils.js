const cartUtils = {
    setShippingAddress: (data) => {
        return localStorage.setItem('shippingAddress', JSON.stringify(data));
    },
    getShippingAddress: () => {
        return JSON.parse(localStorage.getItem('shippingAddress'));
    },

    setPaymentMethod: (data) => {
        return localStorage.setItem('paymentMethod', JSON.stringify(data));
    },
    getPaymentMethod: () => {
        return JSON.parse(localStorage.getItem('paymentMethod'));
    },
    setCustomer: (data) => {
        return localStorage.setItem('customer', JSON.stringify(data));
    },
    getCustomer: () => {
        return JSON.parse(localStorage.getItem('customer'));
    },
}
export default cartUtils;