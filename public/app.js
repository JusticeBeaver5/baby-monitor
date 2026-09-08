const PEER_OPTIONS = {
  debug: 1,
  config: {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }
    ]
  }
};

const I18N = {
  ru: {
    eyebrow: 'PRIVATE CAMERA STREAM',
    heroTitle: 'Камера на одном устройстве.<br><span>Просмотр на другом.</span>',
    heroText: 'Откройте сайт на двух устройствах. На первом создайте комнату и включите камеру, на втором введите код.',
    hostTitle: 'Включить камеру',
    hostText: 'Это устройство будет передавать видео и звук.',
    createRoom: 'Создать комнату',
    roomCodeLabel: 'Код комнаты',
    copyHint: 'Нажмите на код — он скопируется',
    liveCamera: 'КАМЕРА В ЭФИРЕ',
    audioVideoSent: 'Видео и звук передаются',
    flipCamera: 'Переключить камеру',
    stopStream: 'Остановить трансляцию',
    viewerTitle: 'Смотреть стрим',
    viewerText: 'Введите код комнаты на втором устройстве.',
    connect: 'Подключиться',
    waitingVideo: 'Ожидание видео…',
    enableSound: 'Включить звук',
    muteSound: 'Выключить звук',
    fullscreen: 'На весь экран',
    disconnect: 'Отключиться',
    httpsLabel: 'HTTPS:',
    httpsText: 'Netlify автоматически выдаёт HTTPS, поэтому Safari может получить доступ к камере и микрофону.',
    privacyLabel: 'Передача:',
    privacyText: 'видео и звук передаются по WebRTC напрямую между устройствами, когда сеть позволяет P2P-соединение.',
    creatingRoom: 'Создаём комнату…',
    connecting: 'Подключаемся…',
    roomFound: 'Комната найдена. Ждём видео…',
    viewerConnected: 'Зритель подключён — запускаем видео…',
    liveConnected: 'Эфир подключён',
    viewerDisconnected: 'Зритель отключился',
    streamEnded: 'Трансляция завершена',
    signalingDisconnected: 'Сигнальный сервер отключён',
    cameraHttps: 'Камера и микрофон требуют HTTPS.',
    permissionDenied: 'Нет доступа к камере или микрофону. Разрешите доступ для Safari.',
    enterCode: 'Введите 6 символов кода',
    copyDone: 'Код скопирован ✓',
    roomCopied: 'Код комнаты скопирован',
    connectionError: 'Ошибка соединения. Попробуйте ещё раз.',
    roomBusy: 'Код занят. Нажмите «Создать комнату» ещё раз.',
    roomNotFound: 'Комната не найдена или камера отключена',
    unavailable: 'Не удалось подключиться к комнате',
    videoError: 'Не удалось получить видео и звук',
    streamStartError: 'Не удалось начать трансляцию',
    soundOn: 'Звук включён',
    soundBlocked: 'Нажмите «Включить звук», чтобы разрешить воспроизведение.',
    signalingLost: 'Соединение с сигнальным сервером потеряно'
  },
  en: {
    eyebrow: 'PRIVATE CAMERA STREAM',
    heroTitle: 'Camera on one device.<br><span>Watch on another.</span>',
    heroText: 'Open the site on two devices. Create a room and enable the camera on one, then enter the code on the other.',
    hostTitle: 'Turn on camera',
    hostText: 'This device will transmit video and audio.',
    createRoom: 'Create room',
    roomCodeLabel: 'Room code',
    copyHint: 'Tap the code to copy it',
    liveCamera: 'CAMERA LIVE',
    audioVideoSent: 'Video and audio are being sent',
    flipCamera: 'Switch camera',
    stopStream: 'Stop stream',
    viewerTitle: 'Watch stream',
    viewerText: 'Enter the room code on the second device.',
    connect: 'Connect',
    waitingVideo: 'Waiting for video…',
    enableSound: 'Enable sound',
    muteSound: 'Mute sound',
    fullscreen: 'Fullscreen',
    disconnect: 'Disconnect',
    httpsLabel: 'HTTPS:',
    httpsText: 'Netlify provides HTTPS automatically, so Safari can access the camera and microphone.',
    privacyLabel: 'Transfer:',
    privacyText: 'video and audio are sent directly between devices over WebRTC when the network allows a P2P connection.',
    creatingRoom: 'Creating room…',
    connecting: 'Connecting…',
    roomFound: 'Room found. Waiting for video…',
    viewerConnected: 'Viewer connected — starting video…',
    liveConnected: 'Live stream connected',
    viewerDisconnected: 'Viewer disconnected',
    streamEnded: 'Stream ended',
    signalingDisconnected: 'Signaling server disconnected',
    cameraHttps: 'Camera and microphone require HTTPS.',
    permissionDenied: 'Camera or microphone access was denied. Allow access for Safari.',
    enterCode: 'Enter a 6-character code',
    copyDone: 'Code copied ✓',
    roomCopied: 'Room code copied',
    connectionError: 'Connection error. Please try again.',
    roomBusy: 'That code is busy. Create a new room.',
    roomNotFound: 'Room not found or camera is offline',
    unavailable: 'Could not connect to the room',
    videoError: 'Could not receive video and audio',
    streamStartError: 'Could not start the stream',
    soundOn: 'Sound enabled',
    soundBlocked: 'Tap “Enable sound” to allow playback.',
    signalingLost: 'Connection to the signaling server was lost'
  }
};

const $ = id => document.getElementById(id);
const createBtn = $('createBtn');
const joinBtn = $('joinBtn');
const roomInput = $('roomInput');
const hostPanel = $('hostPanel');
const viewerPanel = $('viewerPanel');
const roomCode = $('roomCode');
const localVideo = $('localVideo');
const remoteVideo = $('remoteVideo');
const copyRoomBtn = $('copyRoomBtn');
const copyHint = $('copyHint');
const flipBtn = $('flipBtn');
const stopBtn = $('stopBtn');
const viewerStatus = $('viewerStatus');
const viewerPlaceholder = $('viewerPlaceholder');
const fullscreenBtn = $('fullscreenBtn');
const soundBtn = $('soundBtn');
const leaveBtn = $('leaveBtn');
const hostDot = $('hostDot');
const viewerDot = $('viewerDot');
const toast = $('toast');
const langBtn = $('langBtn');

let role = null;
let room = null;
let localStream = null;
let peer = null;
let currentCall = null;
let facingMode = 'user';
let toastTimer;
let copyTimer;
let lang = localStorage.getItem('camera-room-lang') || (navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'ru');

function t(key) { return I18N[lang][key] ?? key; }

function applyLanguage() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  langBtn.textContent = lang === 'ru' ? 'EN' : 'RU';
  langBtn.setAttribute('aria-label', lang === 'ru' ? 'Switch language to English' : 'Переключить язык на русский');
  roomInput.setAttribute('aria-label', t('roomCodeLabel'));
  copyRoomBtn.setAttribute('aria-label', t('roomCodeLabel'));
}

function showToast(text) {
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function normalizeCode(value) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
}

function randomRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const values = new Uint32Array(6);
  crypto.getRandomValues(values);
  return Array.from(values, n => chars[n % chars.length]).join('');
}

function setStatusDot(el, active = false) {
  el.style.background = active ? 'var(--success)' : '#34405a';
}

function destroyPeer() {
  if (currentCall) {
    try { currentCall.close(); } catch {}
    currentCall = null;
  }
  if (peer) {
    try { peer.destroy(); } catch {}
    peer = null;
  }
}

function stopLocalStream() {
  localStream?.getTracks().forEach(track => track.stop());
  localStream = null;
  localVideo.srcObject = null;
  setStatusDot(hostDot, false);
}

async function startCamera() {
  if (!navigator.mediaDevices?.getUserMedia) {
    showToast(t('cameraHttps'));
    return false;
  }

  stopLocalStream();
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode,
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });
    localVideo.srcObject = localStream;
    updatePreviewTransform();
    await localVideo.play().catch(() => {});
    setStatusDot(hostDot, true);
    return true;
  } catch (error) {
    console.error(error);
    showToast(t('permissionDenied'));
    return false;
  }
}

function makePeer(code) {
  return new Peer(code, PEER_OPTIONS);
}

langBtn.addEventListener('click', () => {
  lang = lang === 'ru' ? 'en' : 'ru';
  localStorage.setItem('camera-room-lang', lang);
  applyLanguage();
  if (!peer) return;
  if (role === 'viewer') viewerStatus.textContent = t('connecting');
});

applyLanguage();

createBtn.addEventListener('click', async () => {
  if (peer) return;

  createBtn.disabled = true;
  createBtn.textContent = t('creatingRoom');

  const code = randomRoomCode();
  peer = makePeer(code);

  peer.on('open', async id => {
    role = 'host';
    room = id;
    roomCode.textContent = id;
    hostPanel.classList.remove('hidden');
    createBtn.classList.add('hidden');

    const ok = await startCamera();
    if (!ok) {
      createBtn.classList.remove('hidden');
      createBtn.disabled = false;
      createBtn.textContent = t('createRoom');
      hostPanel.classList.add('hidden');
      destroyPeer();
    }
  });

  peer.on('connection', conn => {
    conn.on('open', () => {
      viewerStatus.textContent = t('viewerConnected');
      setStatusDot(hostDot, true);
      currentCall?.close();
      if (!localStream) return;
      currentCall = peer.call(conn.peer, localStream, { metadata: { hasAudio: true } });
      if (!currentCall) showToast(t('streamStartError'));
      currentCall.on('close', () => {
        viewerStatus.textContent = t('viewerDisconnected');
      });
      currentCall.on('error', error => {
        console.error(error);
        viewerStatus.textContent = t('connectionError');
      });
    });
  });

  peer.on('error', error => {
    console.error(error);
    showToast(error.type === 'unavailable-id' ? t('roomBusy') : t('connectionError'));
    stopLocalStream();
    destroyPeer();
    createBtn.disabled = false;
    createBtn.textContent = t('createRoom');
    createBtn.classList.remove('hidden');
    hostPanel.classList.add('hidden');
  });

  peer.on('disconnected', () => {
    viewerStatus.textContent = t('signalingDisconnected');
    showToast(t('signalingLost'));
  });
});

joinBtn.addEventListener('click', async () => {
  const code = normalizeCode(roomInput.value);
  roomInput.value = code;
  if (code.length !== 6) {
    showToast(t('enterCode'));
    return;
  }
  if (peer) return;

  joinBtn.disabled = true;
  joinBtn.textContent = t('connecting');
  role = 'viewer';
  room = code;
  viewerPanel.classList.remove('hidden');
  viewerStatus.textContent = t('connecting');

  peer = new Peer(PEER_OPTIONS);

  peer.on('open', () => {
    const conn = peer.connect(code, { reliable: true });
    conn.on('open', () => {
      viewerStatus.textContent = t('roomFound');
    });
    conn.on('error', error => {
      console.error(error);
      showToast(t('unavailable'));
    });
  });

  peer.on('call', call => {
    currentCall?.close();
    currentCall = call;
    call.answer();
    call.on('stream', stream => {
      remoteVideo.srcObject = stream;
      viewerPlaceholder.style.display = 'none';
      updateVideoAspect(remoteVideo, document.querySelector('.viewer-video-wrap'));
      viewerStatus.textContent = stream.getAudioTracks().length ? t('liveConnected') : t('videoError');
      setStatusDot(viewerDot, true);
      // Start muted so desktop browsers can autoplay the received video.
      remoteVideo.muted = true;
      remoteVideo.volume = 1;
      remoteVideo.play().then(() => {
        soundBtn.textContent = t('enableSound');
      }).catch(() => {
        soundBtn.textContent = t('enableSound');
        showToast(t('soundBlocked'));
      });
    });
    call.on('close', () => {
      viewerStatus.textContent = t('streamEnded');
      viewerPlaceholder.style.display = 'flex';
      setStatusDot(viewerDot, false);
    });
    call.on('error', error => {
      console.error(error);
      showToast(t('videoError'));
      viewerStatus.textContent = t('connectionError');
    });
  });

  peer.on('error', error => {
    console.error(error);
    if (error.type === 'peer-unavailable') {
      showToast(t('roomNotFound'));
      viewerStatus.textContent = t('roomNotFound');
    } else {
      showToast(t('connectionError'));
      viewerStatus.textContent = t('connectionError');
    }
    joinBtn.disabled = false;
    joinBtn.textContent = t('connect');
    destroyPeer();
  });
});

roomInput.addEventListener('input', e => {
  e.target.value = normalizeCode(e.target.value);
});
roomInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') joinBtn.click();
});

copyRoomBtn.addEventListener('click', async () => {
  if (!room) return;
  try {
    await navigator.clipboard.writeText(room);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = room;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }
  copyHint.textContent = t('copyDone');
  showToast(t('roomCopied'));
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => {
    copyHint.textContent = t('copyHint');
  }, 1600);
});

function updatePreviewTransform() {
  // Mirror only the front/selfie camera preview.
  // The rear camera preview should match the actual outgoing image.
  localVideo.style.transform = facingMode === 'user' ? 'scaleX(-1)' : 'none';
}

function updateVideoAspect(video, wrapper) {
  const setAspect = () => {
    if (video.videoWidth && video.videoHeight) {
      wrapper.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`;
    }
  };

  if (video.readyState >= 1) setAspect();
  else video.addEventListener('loadedmetadata', setAspect, { once: true });
}

flipBtn.addEventListener('click', async () => {
  if (!localStream) return;
  facingMode = facingMode === 'user' ? 'environment' : 'user';
  const ok = await startCamera();
  if (!ok) return;
  if (currentCall) {
    const videoSender = currentCall.peerConnection
      ?.getSenders()
      ?.find(sender => sender.track?.kind === 'video');
    const track = localStream.getVideoTracks()[0];
    if (videoSender && track) await videoSender.replaceTrack(track);
  }
});

soundBtn.addEventListener('click', async () => {
  if (!remoteVideo.srcObject) return;
  remoteVideo.muted = !remoteVideo.muted;
  if (!remoteVideo.muted) {
    try {
      await remoteVideo.play();
      soundBtn.textContent = t('muteSound');
      showToast(t('soundOn'));
    } catch {
      remoteVideo.muted = true;
      showToast(t('soundBlocked'));
    }
  } else {
    soundBtn.textContent = t('enableSound');
  }
});

remoteVideo.addEventListener('volumechange', () => {
  soundBtn.textContent = remoteVideo.muted || remoteVideo.volume === 0 ? t('enableSound') : t('muteSound');
});

stopBtn.addEventListener('click', () => location.reload());
leaveBtn.addEventListener('click', () => location.reload());

fullscreenBtn.addEventListener('click', () => {
  if (remoteVideo.requestFullscreen) remoteVideo.requestFullscreen();
  else if (remoteVideo.webkitEnterFullscreen) remoteVideo.webkitEnterFullscreen();
});

window.addEventListener('beforeunload', () => {
  stopLocalStream();
  destroyPeer();
});
