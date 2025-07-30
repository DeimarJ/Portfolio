const holdButton = document.getElementById('holderButton');
const oneContainer = document.getElementById('one');
const twoContainer = document.getElementById('two');
const projects = document.getElementById('mainMyProjects');
const threeContainer = document.getElementById('three');
const mainVideogames = document.getElementById('mainVideogames');
const videogamesVideo = document.getElementById('videogamesVideo');
const mainDigitalDesign = document.getElementById('mainDigitalDesign');
const digitalDesignVideo = document.getElementById('digitalDesignVideo');
const main3DModels = document.getElementById('main3DModels');
const modelsVideo = document.getElementById('modelsVideo');
const mainVrAndAr = document.getElementById('mainVrAndAr');
const VrandArVideo = document.getElementById('VrandArVideo');

let holdTimeout;
let startTime;
let elapsedTime = 0;


function startHold() {
    holdButton.classList.add('holding');
    startTime = new Date().getTime() - elapsedTime;

    holdTimeout = setTimeout(() => {
        twoContainer.classList.add('visible');
        oneContainer.style.opacity = 0;

        setTimeout(() => {
            holdButton.style.display = 'none';
        }, 1000);
    }, 3000 - elapsedTime);
}


function cancelHold() {
    holdButton.classList.remove('holding');
    clearTimeout(holdTimeout);
    elapsedTime = new Date().getTime() - startTime;

}

// Eventos para mouse
holdButton.addEventListener('mousedown', startHold);
holdButton.addEventListener('mouseup', cancelHold);
holdButton.addEventListener('mouseleave', cancelHold);

// Eventos para pantalla táctil
holdButton.addEventListener('touchstart', startHold);
holdButton.addEventListener('touchend', cancelHold);
holdButton.addEventListener('touchcancel', cancelHold);

projects.addEventListener('click', () => {
    twoContainer.classList.remove('visible');
    setTimeout(() => {
        twoContainer.style.display = 'none';
        threeContainer.classList.add('visible');
    }, 500);
});

mainVideogames.addEventListener('mouseover', () => {
    videogamesVideo.style.display = 'block';
    digitalDesignVideo.style.display = 'none';
    modelsVideo.style.display = 'none';
    VrandArVideo.style.display = 'none';
});

mainDigitalDesign.addEventListener('mouseover', () => {
    digitalDesignVideo.style.display = 'block';
    videogamesVideo.style.display = 'none';
    modelsVideo.style.display = 'none';
    VrandArVideo.style.display = 'none';
});

main3DModels.addEventListener('mouseover', () => {
    modelsVideo.style.display = 'block';
    videogamesVideo.style.display = 'none';
    digitalDesignVideo.style.display = 'none';
    VrandArVideo.style.display = 'none';
});

mainVrAndAr.addEventListener('mouseover', () => {
    VrandArVideo.style.display = 'block';
    videogamesVideo.style.display = 'none';
    digitalDesignVideo.style.display = 'none';
    modelsVideo.style.display = 'none';
});

