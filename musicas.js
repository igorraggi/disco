let musicas = [
    {titulo:'When a Man Loves a Woman', artista:'Percy Sledge', src:'When a Man Loves a Woman (1966) - Percy Sledge (Lp Stereo 1983) Vinyl.mp3', img:'whenaman.jpg'},
    {titulo:'My Girl', artista:'The Temptations', src:'My Girl (1965) - The Temptations (Lp Mono 1966) Vinyl.mp3', img:'Mygirl.jpg'},
    {titulo:'Bye Bye Love', artista:'Ray Charles', src:'Bye Bye Love - Ray Charles (Lp Mono Brazilian 1962) Vinil.mp3', img:'byebye.jpg'},
    {titulo:'Ilarie', artista:'Xuxa', src:'ilariê xuxa.mp3', img:'ilarie.jpg'}

];

let musica = document.querySelector('audio');
let indexMusica = 0;

let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');
let duracaoMusicaAtual = document.querySelector('.fim');
let progress_bar = document.querySelector('.barra');
let ponto = document.querySelector('.ponto');



progress_bar = document.querySelector('.barra');
progress_bar.addEventListener('click', (e) => {
    const newTime = ((e.offsetX / progress_bar.offsetWidth) * musica.duration);
    musica.currentTime = newTime;
});


renderizarMusica(indexMusica);

document.querySelector('.botao-play').addEventListener('click', tocarMusica);

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = 3;
    }
    renderizarMusica(indexMusica);
});

document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica++;
    if (indexMusica > 3){
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
});

function renderizarMusica(index){
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
}


function tocarMusica(){
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica(){
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function atualizarBarra(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.tempoinicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}


function segundosParaMinutos(segundos){
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10){
        campoSegundos = '0' + campoSegundos;
    }

    return campoMinutos+':'+campoSegundos;
}
