// Convert x to a signed 32-bit integer
function ToInt32(x) {
    return x | 0;
}

// Convert x to an unsigned 32-bit integer
function ToUint32(x) {
    return x >>> 0;
}

