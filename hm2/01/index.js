function consoleRec(arr, n) {
    n = n || 0;
    if (arr) {
        if (n < arr.length) {
            console.log(arr[n]);
            consoleRec(arr, ++n);
        }
    }
}

consoleRec(['я', 'умею', 'писать', 'рекурсивные', 'функции']);