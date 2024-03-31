//Get UI

const getaudioscreen = document.getElementById('audioscreen');
const playbtn = document.getElementById('play'),
	  prevbtn = document.getElementById('prev'),
	  nextbtn = document.getElementById('next'),
	  stopbtn = document.getElementById('stop');
const getprogress = document.getElementById('progress'),
	  getprogressbar = document.getElementById('progress-bar');
const getvolprogress = document.getElementById('volumeprogress');
const getdisplaytime = document.getElementById('displaytime');

const audios = ['sample1','sample2','sample3'];

let currentindex = 0;
// console.log(audios[currentindex]); //sample1

// loadaudio(audios[currentindex]);

function loadaudio(audio){
	getaudioscreen.src = `./source/${audio}.mp3`;

}

function playaudio(){
	playbtn.querySelector('i.fas').classList.remove('fa-play');
	playbtn.querySelector('i.fas').classList.add('fa-pause');

	getaudioscreen.play(); //html's default function
}

function pauseaudio(){
	playbtn.querySelector('i.fas').classList.add('fa-play');
	playbtn.querySelector('i.fas').classList.remove('fa-pause');

	getaudioscreen.pause(); //html's default function
}

function playandpauseaudio(){

	//paused==> default keyword for audio/video

	if(getaudioscreen.paused){
		getaudioscreen.play();
	}else{
		getaudioscreen.pause();
	}
}

function nextaudio(){
	currentindex++;

	if(currentindex >audios.length-1){
		currentindex = 0;
	}
	loadaudio(audios[currentindex]);
	playaudio();
}

function previousaudio(){
	currentindex--;

	if(currentindex < 0){
		currentindex = audios.length-1;
	}
	loadaudio(audios[currentindex]);
	playaudio();
}

function updateprogress(e){
	const {duration} = e.target;
	const {currentTime} = e.target;

	if (currentTime === 0){
		getprogressbar.style.width = "0%";
	}else{
		const progresspercent = (currentTime/duration)*100;
		getprogressbar.style.width = `${progresspercent}%`;
	}

	//forward

	// const mins = Math.floor(currentTime/60);
	// const secs = Math.floor(currentTime%60);

	//backward

	const mins = Math.floor((duration-currentTime)/60);
	const secs = Math.floor((duration-currentTime)%60);

	const minutevalue = mins.toString().padStart(2,'0'); //if you use padStart() concat number must be string
	const secondvalue = secs.toString().padStart(2,'0')
	getdisplaytime.innerText = `${minutevalue}:${secondvalue}`;
}

function stopaudio(){
	getaudioscreen.currentTime = 0;
	getprogressbar.style.width = `0%`;

	pauseaudio();
}

function volumecontrol(){
	getaudioscreen.volume = getvolprogress.value/100;

	//1 is default volume (100%)
	//0.5 is half volume (50%)
	//0 is mute (0%)
}

function progressaudioclick(e){
	const width = this.clientWidth;
	console.log(width);

	const clickx = e.offsetX;
	console.log(clickx);

	const getduration = getaudioscreen.duration;
	console.log(getduration);

	getaudioscreen.currentTime = (clickx/width)*getduration;
}

getaudioscreen.addEventListener('play',playaudio);
getaudioscreen.addEventListener('pause',pauseaudio);
getaudioscreen.addEventListener('timeupdate',updateprogress);

playbtn.addEventListener('click',playandpauseaudio);
nextbtn.addEventListener('click',nextaudio);
prevbtn.addEventListener('click',previousaudio);
stopbtn.addEventListener('click',stopaudio);
getvolprogress.addEventListener('change',volumecontrol);
getprogress.addEventListener('click',progressaudioclick);

