if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('sw.js')
        .then((registration) => {
            console.log('SW Registration!');
            console.log(registration);
        })
        .catch((error) => console.log('SW error'));
}
