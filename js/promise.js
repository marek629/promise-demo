(function ()
{
    let p1 = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('Minęły 3 sekundy.')
        }, 3000);
    });
    p1.then(function(message)
    {
        document.querySelector('#new-promise').innerHTML = message;
    });

    let p2 = Promise.resolve('Natychmiast').then(function (message) {
        document.querySelector('#resolve').innerHTML = message;
    });
    p2.catch(function ()
    {
        console.log('Nigdy nie nastąpi');
    });

    let p3 = Promise.reject('Natychmiast').then(function () {
        console.log('Nigdy nie nastąpi');
    });
    p3.catch(function (message)
    {
        document.querySelector('#reject').innerHTML = `<span style="color: red;">${message}</span>`;
    });

    raceDemo().then(allDemo).catch(function(error)
    {
        console.warn(error);
    });
})();

function getEcho(message, seconds)
{
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.open('GET', `http://localhost/promise-demo/ajax.php?echo=${message}&sec=${seconds}`);
        request.onreadystatechange = function () {
            if (request.readyState == XMLHttpRequest.DONE) {
                resolve(request.responseText);
            }
        };
        request.onerror = reject;
        request.send();
    });
}

function raceDemo()
{
    return Promise.race([
        getEcho('Ala', 3),
        getEcho('ma', 4),
        getEcho('kota', 2)
    ]).then(function(message)
    {
        document.querySelector('#race').innerHTML = `<span style="color: blue;">${message}</span>`
    });
}

function allDemo()
{
    return Promise.all([
        getEcho('Ala', 1),
        getEcho('ma', 4),
        getEcho('kota', 1)
    ]).then(function(messageArray)
    {
        document.querySelector('#all').innerHTML = `<span style="color: green;">${messageArray.join(' ')}</span>`;
        throw 'All Demo Exception';
    });
}
