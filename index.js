import Handlebars from 'handlebars';
import QrScanner from 'qr-scanner';
// Initialisation de variables et d'objets par default
const max = parseInt(25000);
const defaultScore = [{
        id: "g1",
        name: "Les Langues Européenes",
        points: 0
    },
    {
        id: "g2",
        name: "La géographie",
        points: 0
    },
    {
        id: "g3",
        name: "Les Monnaies",
        points: 0
    },
    {
        id: "g4",
        name: "La géographie",
        points: 0
    }
];
Handlebars.registerHelper("total", function(value) {
    let count = 0;
    value.forEach((item, i) => {
        count += parseInt(item.points);
    });
    console.log("score totalisé : %s pts", count);
    return count + "pts";
});

// On init le localStorage
if (localStorage.getItem('score') == null) {
    console.info('Le localStorage a été initialisé');
    localStorage.setItem('score', JSON.stringify(defaultScore));
}
// On charge le tableau des scores dans la mémoire
var scores = JSON.parse(localStorage.getItem('score'));


/**
 * renderScore - rends le table de score
 *
 */
function renderScore() {
    var source = document.getElementById('score-tpl').innerHTML;
    var template = Handlebars.compile(source);
    var rendered = template({
        'score': scores
    });
    document.getElementById('score').innerHTML = rendered;
}

/**
 * updateScore - update the progress bar depending on a score
 *
 * @param  {Number} scores integer, the new score
 */
function updateScore(scores) {
    let total = 0;
    scores.forEach((item, i) => {
        total += parseInt(item.points);
    });
    let percent = total * 100 / max;
    let progress = document.getElementById('scoring').getElementsByClassName('bar')[0];
    progress.style.width = percent + "%";
    var label = document.getElementById('scoring').getElementsByClassName('progress')[1];
    label.innerHTML = percent + "%";
    if (percent >= 50) {
        document.getElementById('scoring').getElementsByClassName('progress')[0].classList.remove('blue');
        document.getElementById('scoring').getElementsByClassName('trophy icon')[0].classList.remove('blue');
        document.getElementById('scoring').getElementsByClassName('progress')[0].classList.add('yellow');
        document.getElementById('scoring').getElementsByClassName('trophy icon')[0].classList.add('yellow');
    }
}

// On attends que la page soit chargée
window.addEventListener('load', function() {
    let button = document.getElementsByTagName('button')[0];
    // On affiche les scores
    renderScore();
    updateScore(scores);

    QrScanner.WORKER_PATH = "~/qr-scanner-worker.min.js";
    // on localise l'element video qui va servir à donner le feedback client
    const videoElem = document.getElementById('scanner');
    // on créé un element de scanner
    const qrScanner = new QrScanner(videoElem, result => decode(result));

    function decode(result) {
        qrScanner.stop();
        button.classList.remove('disabled');
        button.addEventListener('click', function() {
            qrScanner.start();
            button.classList.add('disabled');
        }, {
            once: true
        })
        let [borne, points] = result.split(';');
        window.alert('Votre score a bien été pris en compte');
        console.log('votre resultat sur la borne %s est %s', borne, points);
        let index = scores.findIndex(quizz => quizz.id === borne);
        scores[index].points = points;
        localStorage.setItem('score', JSON.stringify(scores));
        renderScore();
        updateScore(scores);
    }


    // on démarre le scan
    qrScanner.start();

}, false);
