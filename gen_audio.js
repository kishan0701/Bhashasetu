const fs = require('fs');

function generateWAV(filename, notes, sampleRate = 22050) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * bitsPerSample / 8;
  const blockAlign = numChannels * bitsPerSample / 8;

  // Pre-calculate total samples
  let totalSamples = 0;
  for (const n of notes) totalSamples += Math.floor(sampleRate * n.dur);

  const dataSize = totalSamples * blockAlign;
  const buf = Buffer.alloc(44 + dataSize);

  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + dataSize, 4);
  buf.write('WAVE', 8);
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(numChannels, 22);
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(byteRate, 28);
  buf.writeUInt16LE(blockAlign, 32);
  buf.writeUInt16LE(bitsPerSample, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (const { freq, dur, vol = 0.45, vibrato = 0 } of notes) {
    const n = Math.floor(sampleRate * dur);
    const attackSamples = Math.floor(sampleRate * 0.04);
    const releaseSamples = Math.floor(sampleRate * 0.08);
    for (let i = 0; i < n; i++) {
      const t = i / sampleRate;
      const env = Math.min(i / attackSamples, 1) * Math.min((n - i) / releaseSamples, 1);
      const vib = vibrato ? Math.sin(2 * Math.PI * 5.5 * t) * vibrato : 0;
      const f = freq + vib;
      let s = 0.6 * Math.sin(2 * Math.PI * f * t);
      s += 0.25 * Math.sin(2 * Math.PI * f * 2 * t);
      s += 0.1 * Math.sin(2 * Math.PI * f * 3 * t);
      const sample = Math.round(s * vol * env * 32767);
      buf.writeInt16LE(Math.max(-32768, Math.min(32767, sample)), offset);
      offset += 2;
    }
  }

  fs.writeFileSync(filename, buf);
  console.log('Created', filename.split('/').pop(), Math.round(buf.length / 1024) + 'KB');
}

const base = 'd:/Coding/My project/cep/cep-app/public/audio/';
const SA=261.6, RE=293.7, GA=329.6, MA=349.2, PA=392.0, DHA=440.0, NI=493.9, SA2=523.3;

generateWAV(base + 'a1_fishermans_call.wav', [
  {freq:SA, dur:0.5, vibrato:3},{freq:PA, dur:0.4, vibrato:5},
  {freq:DHA, dur:0.6, vibrato:6},{freq:SA2, dur:0.7, vibrato:8},
  {freq:DHA, dur:0.4, vibrato:5},{freq:PA, dur:0.5, vibrato:4},
  {freq:GA, dur:0.7, vibrato:5},{freq:RE, dur:0.4, vibrato:3},
  {freq:SA, dur:0.9, vibrato:2},
]);

generateWAV(base + 'a2_tarpa_chant.wav', [
  {freq:SA, dur:1.0, vibrato:2},{freq:RE, dur:0.7, vibrato:3},
  {freq:GA, dur:0.7, vibrato:4},{freq:MA, dur:0.9, vibrato:3},
  {freq:PA, dur:0.6, vibrato:5},{freq:MA, dur:0.7, vibrato:3},
  {freq:GA, dur:0.7, vibrato:4},{freq:RE, dur:0.6, vibrato:2},
  {freq:SA, dur:1.2, vibrato:2},
]);

generateWAV(base + 'a3_harvest_ovi.wav', [
  {freq:GA, dur:0.4, vibrato:4},{freq:MA, dur:0.4, vibrato:5},
  {freq:PA, dur:0.5, vibrato:6},{freq:DHA, dur:0.4, vibrato:5},
  {freq:PA, dur:0.4, vibrato:4},{freq:MA, dur:0.3, vibrato:3},
  {freq:GA, dur:0.5, vibrato:4},{freq:RE, dur:0.3, vibrato:3},
  {freq:GA, dur:0.6, vibrato:5},{freq:SA, dur:0.9, vibrato:1},
]);

generateWAV(base + 'a4_abhang.wav', [
  {freq:SA, dur:0.5},{freq:RE, dur:0.5, vibrato:2},
  {freq:GA, dur:0.6, vibrato:3},{freq:MA, dur:0.5, vibrato:3},
  {freq:PA, dur:0.7, vibrato:4},{freq:DHA, dur:0.6, vibrato:5},
  {freq:PA, dur:0.5, vibrato:4},{freq:MA, dur:0.6, vibrato:3},
  {freq:GA, dur:0.5, vibrato:3},{freq:RE, dur:0.5, vibrato:2},
  {freq:SA, dur:1.0, vibrato:1},
]);

generateWAV(base + 'a5_wedding_song.wav', [
  {freq:PA, dur:0.3, vibrato:5},{freq:DHA, dur:0.3, vibrato:6},
  {freq:NI, dur:0.4, vibrato:7},{freq:SA2, dur:0.6, vibrato:8},
  {freq:NI, dur:0.3, vibrato:7},{freq:DHA, dur:0.4, vibrato:6},
  {freq:PA, dur:0.4, vibrato:5},{freq:SA2, dur:0.7, vibrato:8},
  {freq:DHA, dur:0.5, vibrato:6},{freq:PA, dur:0.9, vibrato:4},
]);

generateWAV(base + 'a6_boat_prayers.wav', [
  {freq:SA, dur:0.8, vibrato:1},{freq:MA, dur:0.8, vibrato:3},
  {freq:PA, dur:0.9, vibrato:4},{freq:MA, dur:0.6, vibrato:3},
  {freq:GA, dur:0.8, vibrato:3},{freq:RE, dur:0.6, vibrato:2},
  {freq:SA, dur:1.4, vibrato:1},
]);

generateWAV(base + 'a7_grain_song.wav', [
  {freq:RE, dur:0.3},{freq:GA, dur:0.3, vibrato:3},
  {freq:MA, dur:0.4, vibrato:4},{freq:GA, dur:0.3, vibrato:3},
  {freq:RE, dur:0.3},{freq:SA, dur:0.3},
  {freq:RE, dur:0.3},{freq:GA, dur:0.4, vibrato:3},
  {freq:MA, dur:0.3, vibrato:4},{freq:PA, dur:0.4, vibrato:5},
  {freq:GA, dur:0.3, vibrato:3},{freq:RE, dur:0.3, vibrato:2},
  {freq:SA, dur:0.9, vibrato:1},
]);

console.log('All 7 audio files generated!');
