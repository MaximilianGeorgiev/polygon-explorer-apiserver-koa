exports.getLatestBlockRoute = () => {
    return "/blocks/latest";
};

exports.getPendingBlocksRoute = () => {
    return "/blocks/pending";
};

exports.getByHashOrNumberRoute = () => {
    return "/blocks/identifier/:arg";
};

exports.getMultipleBlocksAfterThresholdRoute = () => {
    return "/blocks/:from/:count";
};