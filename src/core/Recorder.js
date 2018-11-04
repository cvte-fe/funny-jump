class Recorder {
  constructor() {
    this._initAudio();
    this._initAnalyser();
  }

  start() {
    const constraints = {
      audio: true
    };

    return navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        this.source = this.audio.createMediaStreamSource(stream);
        this.source.connect(this.analyser);
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);

        return Promise.resolve();
      });
  }

  getVolume() {
    this.analyser.getByteFrequencyData(this.dataArray);
    const sum = this.dataArray.reduce((a, b) => a + b);
    const volume = Math.round(sum / 100);
    return volume;
  }

  _initAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audio = new AudioContext();
  }

  _initAnalyser() {
    this.analyser = this.audio.createAnalyser();
    this.analyser.fftSize = 256;
  }
}

export default Recorder;