window.addEventListener('load', function() {

    QrScanner.WORKER_PATH = "node_modules/qr-scanner/qr-scanner-worker.min.js";
    // on localise l'element video qui va servir à donner le feedback client
    const videoElem = document.getElementById('scanner');
    // on créé un element de scanner
    const qrScanner = new QrScanner(videoElem, result => decode(result));

    function decode(result) {
        var [borne, points] = result.split(';');
        window.alert('Votre score a bien été pris en compte');
        console.log('votre resultat sur la borne %s est %s', borne, points);
        qrScanner.stop();
    }


    // on démarre le scan
    qrScanner.start();
}, false);
