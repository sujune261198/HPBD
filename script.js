
/* Password gate: password is 2711 */
(function(){
  const PASSWORD = "2711";
  window.checkPassword = function(){
    const input = document.getElementById("passwordInput");
    const error = document.getElementById("passwordError");
    const value = (input?.value || "").trim();
    if(value === PASSWORD){
      const gate = document.getElementById("passwordGate");
      gate?.classList.add("hide");
      document.body.classList.remove("locked");
      setTimeout(()=>gate?.remove(),850);
    }else{
      if(error) error.textContent = "Sai mất rồi 🥺 Thử lại nhé vợ iuuu ❤️";
      if(input){
        input.value = "";
        input.focus();
        input.animate(
          [{transform:"translateX(0)"},{transform:"translateX(-8px)"},{transform:"translateX(8px)"},{transform:"translateX(0)"}],
          {duration:260}
        );
      }
    }
  };
  document.addEventListener("DOMContentLoaded",()=>{
    const input = document.getElementById("passwordInput");
    input?.addEventListener("keydown",(e)=>{
      if(e.key === "Enter") window.checkPassword();
    });

    const canvas = document.getElementById("gateSparkCanvas");
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    let stars = [];
    function resize(){
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      stars = Array.from({length:140},()=>({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:Math.random()*2+0.4,
        a:Math.random()*Math.PI*2,
        vx:(Math.random()-.5)*0.16,
        vy:(Math.random()-.5)*0.16
      }));
    }
    resize();
    addEventListener("resize",resize);
    function draw(){
      if(!document.getElementById("passwordGate")) return;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      stars.forEach(s=>{
        s.x+=s.vx; s.y+=s.vy; s.a+=0.018;
        if(s.x<0)s.x=canvas.width;if(s.x>canvas.width)s.x=0;
        if(s.y<0)s.y=canvas.height;if(s.y>canvas.height)s.y=0;
        const glow=(Math.sin(s.a)+1)/2;
        ctx.globalAlpha=.22+glow*.72;
        ctx.fillStyle = Math.random() > .1 ? "#ffd9ea" : "#ffd36e";
        ctx.shadowColor = "#ff5aa5";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fill();
      });
      ctx.globalAlpha=1;
      requestAnimationFrame(draw);
    }
    draw();
  });
})();


/* Spark canvas for first dashboard-like hero */
(function initFirstSpark(){
  const canvas = document.getElementById("firstSparkCanvas");
  if(!canvas) return;
  const ctx = canvas.getContext("2d");
  let stars = [];
  function resize(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    stars = Array.from({length:150},()=>({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      r:Math.random()*2+0.45,
      a:Math.random()*Math.PI*2,
      vx:(Math.random()-.5)*0.16,
      vy:(Math.random()-.5)*0.16
    }));
  }
  resize();
  addEventListener("resize",resize);
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    stars.forEach(s=>{
      s.x+=s.vx; s.y+=s.vy; s.a+=0.018;
      if(s.x<0)s.x=canvas.width;if(s.x>canvas.width)s.x=0;
      if(s.y<0)s.y=canvas.height;if(s.y>canvas.height)s.y=0;
      const glow=(Math.sin(s.a)+1)/2;
      ctx.globalAlpha=.22+glow*.72;
      ctx.fillStyle = Math.random() > .1 ? "#ffd9ea" : "#ffd36e";
      ctx.shadowColor = "#ff5aa5";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fill();
    });
    ctx.globalAlpha=1;
    requestAnimationFrame(draw);
  }
  draw();
})();

let current = 0;
const scenes = [...document.querySelectorAll('.scene')];
let giftUnlockTimer = null;
let finalGiftOpened = false;
const music = document.getElementById('bgMusic');

const TELEGRAM_BOT_TOKEN = "8991745758:AAFUXwTyXmIaA66chn6zdsAgVRQESJKKQ9c";
const TELEGRAM_CHAT_ID = "8447501783";



const cursorGlow = document.createElement("div");
cursorGlow.className = "cursor-glow";
document.body.appendChild(cursorGlow);

document.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
  document.documentElement.style.setProperty("--mx", (e.clientX / innerWidth - 0.5).toFixed(3));
  document.documentElement.style.setProperty("--my", (e.clientY / innerHeight - 0.5).toFixed(3));
});

function startStory(){
  music.play().catch(()=>{});
  nextScene();
}

function showScene(i){
  const oldVideo = scenes[current].querySelector('video');
  if(oldVideo) oldVideo.pause();

  scenes[current].classList.remove('active');
  current = (i + scenes.length) % scenes.length;
  scenes[current].classList.add('active');

  const newVideo = scenes[current].querySelector('video');
  if(newVideo){
    music.pause();
  } else {
    music.play().catch(()=>{});
  }

  runTypewriter();
  prepareVideoGiftUnlock();
}

function nextScene(){ showScene(current + 1); }
function prevScene(){ showScene(current - 1); }

document.addEventListener('keydown', e => {
  if(e.key === 'ArrowRight') nextScene();
  if(e.key === 'ArrowLeft') prevScene();
  if(e.key === 'Escape') closePhoto();
});

function runTypewriter(){
  const el = scenes[current].querySelector('.typewriter');
  if(!el || el.dataset.done) return;
  const text = el.dataset.text;
  el.textContent = '';
  let i = 0;
  const timer = setInterval(()=>{
    el.textContent += text[i++] || '';
    if(i > text.length){
      clearInterval(timer);
      el.dataset.done = '1';
    }
  }, 35);
}

function notifyTelegram(){
  const now = new Date();
  const timeText = now.toLocaleString("vi-VN");
  const device = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? "Điện thoại" : "Máy tính";

  fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: `🎁 Vợ iuuu vừa bấm Mở quà sinh nhật!\n⏰ Thời gian: ${timeText}\n📱 Thiết bị: ${device}`
    })
  }).catch(() => {});
}



function showGift(event){
  if(event && event.isTrusted === false) return;
  if(finalGiftOpened) return;
  finalGiftOpened = true;

  const clickedButton = event?.currentTarget || event?.target;
  if(clickedButton){
    clickedButton.disabled = true;
    clickedButton.style.display = "none";
  }

  notifyTelegram();
  burstConfetti();

  const box = document.getElementById("qrBox");
  let seconds = 27;
  const messages = [
    [27, "Chờ xíu nhó..."],
    [23, "Anh đang gửi một điều nhỏ cho vợ iuuu..."],
    [18, "Chờ anh một chút thôi nhó ❤️"],
    [13, "Sắp đến khoảnh khắc cuối rồi..."],
    [8, "Anh mong vợ sẽ thích điều này"],
    [3, "Chuẩn bị nhé..."]
  ];

  box.classList.add("gift-loading","cinema-countdown");
  box.innerHTML = `
    <h3>🎁 Món quà đang được gửi đến em...</h3><div class="heartbeat">❤️</div>
    <p id="countMessage">Anh hơi hồi hộp...</p>
    <div class="countdown">${seconds}</div>
  `;
  box.style.display = "block";

  const timer = setInterval(() => {
    seconds--;
    const counter = box.querySelector(".countdown");
    const msg = box.querySelector("#countMessage");
    if(counter) counter.textContent = seconds;
    const found = messages.find(m => m[0] === seconds);
    if(found && msg) msg.textContent = found[1];

    if(seconds <= 0){
      clearInterval(timer);
      document.body.classList.add("final-flash");
      setTimeout(() => document.body.classList.remove("final-flash"), 900);

      burstConfetti();
      launchFinalHearts();

      box.classList.remove("gift-loading","cinema-countdown");
      box.classList.add("final-reveal","cinematic-final");
      box.innerHTML = `
        <div class="final-photo-wrap">
          <img src="assets/photo%20%2812%29.webp" alt="Lời chúc của anh">
        </div>
        <h3 class="final-line one">Chúc mừng sinh nhật vợ iuuu ❤️</h3>
        <p class="final-line two">Cảm ơn em vì đã yêu anh.</p>
        <p class="final-line three">Anh mong tuổi mới của vợ luôn vui vẻ, bình an, xinh đẹp và được yêu thương thật nhiều.</p>
        <p class="final-line four"><b>Anh yêu em.</b></p>
        <p class="final-line five"></p><p class="small-note">Kiểm tra ...điện thoại của vợ nhé ❤️</p>
      `;
}
  }, 1000);
}

function launchFinalHearts(){
  const layer = document.createElement("div");
  layer.className = "heart-layer";
  document.body.appendChild(layer);

  for(let i = 0; i < 48; i++){
    const heart = document.createElement("span");
    heart.textContent = ["❤️","💖","✨","🌷","💫"][Math.floor(Math.random()*5)];
    heart.style.left = Math.random()*100 + "vw";
    heart.style.animationDelay = Math.random()*2.5 + "s";
    heart.style.fontSize = (Math.random()*20 + 16) + "px";
    layer.appendChild(heart);
  }

  setTimeout(() => layer.remove(), 10000);
}

const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
function resize(){canvas.width=innerWidth;canvas.height=innerHeight; resizeFireworks();}
resize(); addEventListener('resize',resize);

function burstConfetti(){
  const pieces = Array.from({length:150},()=>({
    x: innerWidth/2, y: innerHeight/2,
    vx:(Math.random()-.5)*14, vy:(Math.random()-.8)*14,
    s:Math.random()*7+4, life:95, r:Math.random()*Math.PI
  }));
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; p.vy+=.18; p.life--; p.r+=.12;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r);
      ctx.fillStyle = ['#ff8fbd','#ffd43b','#ffffff','#f06595','#b197fc'][Math.floor(Math.random()*5)];
      ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s);
      ctx.restore();
    });
    if(pieces.some(p=>p.life>0)) requestAnimationFrame(draw);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  draw();
}

const modal = document.getElementById('photoModal');
const modalImg = document.getElementById('modalImg');
const modalText = document.getElementById('modalText');
const fwCanvas = document.getElementById('fireworks');
const fwCtx = fwCanvas.getContext('2d');
let fwParticles = [];
let fwTimer = null;

function resizeFireworks(){
  if(!fwCanvas) return;
  fwCanvas.width = innerWidth;
  fwCanvas.height = innerHeight;
}

function openPhoto(src, text){
  modalImg.src = src;
  modalText.textContent = text;
  modal.classList.add('show');
  resizeFireworks();
  launchFireworks();
}

function closePhoto(e){
  if(e && e.target !== modal) return;
  modal.classList.remove('show');
  fwParticles = [];
  fwCtx.clearRect(0,0,fwCanvas.width,fwCanvas.height);
  if(fwTimer) clearInterval(fwTimer);
}

function launchFireworks(){
  if(fwTimer) clearInterval(fwTimer);
  createFirework(innerWidth*.25, innerHeight*.25);
  createFirework(innerWidth*.75, innerHeight*.28);
  createFirework(innerWidth*.5, innerHeight*.72);
  fwTimer = setInterval(()=>{
    createFirework(Math.random()*innerWidth, Math.random()*innerHeight*.75);
  }, 650);
  animateFireworks();
}

function createFirework(x,y){
  const colors = ['#ff8fbd','#ffd43b','#ffffff','#b197fc','#66d9e8'];
  for(let i=0;i<44;i++){
    const angle = (Math.PI*2*i)/44;
    const speed = Math.random()*4+2;
    fwParticles.push({
      x,y,
      vx:Math.cos(angle)*speed,
      vy:Math.sin(angle)*speed,
      life:70,
      size:Math.random()*3+2,
      color:colors[Math.floor(Math.random()*colors.length)]
    });
  }
}

function animateFireworks(){
  fwCtx.clearRect(0,0,fwCanvas.width,fwCanvas.height);
  fwParticles.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy; p.vy+=.035; p.life--;
    fwCtx.globalAlpha = Math.max(p.life/70,0);
    fwCtx.beginPath();
    fwCtx.arc(p.x,p.y,p.size,0,Math.PI*2);
    fwCtx.fillStyle=p.color;
    fwCtx.shadowColor=p.color;
    fwCtx.shadowBlur=18;
    fwCtx.fill();
  });
  fwCtx.globalAlpha = 1;
  fwParticles = fwParticles.filter(p=>p.life>0);
  if(modal.classList.contains('show')) requestAnimationFrame(animateFireworks);
}


/* Final dashboard functions */










document.addEventListener('DOMContentLoaded',()=>{
 const btn=document.querySelector('.gift-after-video');
 if(btn){
   btn.addEventListener('click',()=>{
     const countdown=document.querySelector('.countdown')?.closest('section');
     if(countdown){ setTimeout(()=>countdown.scrollIntoView({behavior:'smooth'}),150);}
   });
 }
});


function prepareVideoGiftUnlock(){
  const btn = document.getElementById('unlockGiftBtn');
  if(!btn) return;

  clearTimeout(giftUnlockTimer);

  const isVideoGiftScene = scenes[current]?.querySelector('#birthdayVideo');
  if(isVideoGiftScene){
    btn.style.display = 'none';
    giftUnlockTimer = setTimeout(()=>{
      btn.style.display = 'inline-block';
    }, 3000);
  }
}

document.addEventListener('DOMContentLoaded',()=>{
  prepareVideoGiftUnlock();
});
