const holdButton = document.getElementById('holderButton');
const oneContainer = document.getElementById('one');
const twoContainer = document.getElementById('two');
const projects = document.getElementById('mainMyProjects')
const threeContainer = document.getElementById('three')
const mainVideogames = document.getElementById('mainVideogames')
const videogamesVideo = document.getElementById('videogamesVideo')
const mainDigitalDesign = document.getElementById('mainDigitalDesign')
const digitalDesignVideo = document.getElementById('digitalDesignVideo')
const main3DModels = document.getElementById('main3DModels')
const modelsVideo = document.getElementById('modelsVideo')


let holdTimeout;
let startTime;
let elapsedTime = 0;

holdButton.addEventListener('mousedown', () => {
    holdButton.classList.add('holding');
    startTime = new Date().getTime() - elapsedTime;
    holdTimeout = setTimeout(() => {
        twoContainer.classList.add('visible');
        oneContainer.style.opacity = 0;
        setTimeout(() => {
            holdButton.style.display = 'none';
        }, 1000); // Espera a que la transición de opacidad termine
    }, 3000 - elapsedTime); // Ajusta el tiempo restante
});

holdButton.addEventListener('mouseup', () => {
    holdButton.classList.remove('holding');
    clearTimeout(holdTimeout);
    elapsedTime = new Date().getTime() - startTime;
    const progress = elapsedTime / 3000;
    holdButton.querySelector('::before').style.transform = `'translate(-50%, -50%) scale(${progress})`;
    holdButton.querySelector('::before').style.transition = `transform ${progress * 3}s linear`;
});

holdButton.addEventListener('mouseleave', () => {
    holdButton.classList.remove('holding');
    clearTimeout(holdTimeout);
    elapsedTime = new Date().getTime() - startTime;
    const progress = elapsedTime / 3000;
    holdButton.querySelector('::before').style.transform = `translate(-50%, -50%) scale(${progress})`;
    holdButton.querySelector('::before').style.transition = `transform ${progress * 3}s linear`;
});

projects.addEventListener('click', () => {
    twoContainer.classList.remove('visible');
            setTimeout(() => {
                twoContainer.style.display = 'none';
                threeContainer.classList.add('visible');
            }, 500);
});

mainVideogames.addEventListener('mouseover', () =>{
    videogamesVideo.style.display = 'block'
    digitalDesignVideo.style.display = 'none'
    modelsVideo.style.display = 'none'
})

mainDigitalDesign.addEventListener('mouseover', () =>{
    digitalDesignVideo.style.display = 'block'
    videogamesVideo.style.display = 'none'
    modelsVideo.style.display = 'none'
})
mainDigitalDesign.addEventListener('click', () =>{
    
})

main3DModels.addEventListener('mouseover', () =>{
    modelsVideo.style.display = 'block'
    videogamesVideo.style.display = 'none'
    digitalDesignVideo.style.display = 'none'
})