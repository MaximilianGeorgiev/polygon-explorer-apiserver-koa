exports.getTransactionsByHashRoute = () => {
    return '/transactions/hash/:hash';
};

exports.getPendingTransactionsRoute = () => {
    return '/transactions/pending';
};

exports.getTransactionsCountByAddressRoute = () => {
    return '/transactions/address/:address';
};

exports.getLatestTransactionRoute = () => {
    return '/transactions/latest';
};