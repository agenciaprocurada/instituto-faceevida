// Recorta a fotografia de cada criativo (sem o texto do anúncio) e gera o favicon.
// Correr com: npm run imagens
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const origem = 'materiais/Servicos';
const destino = 'src/assets';

const recortes = [
  {
    ficheiro: 'WhatsApp Image 2026-09-17 at 07.42.59.jpeg',
    saida: 'alinhadores.jpg',
    area: { left: 735, top: 60, width: 519, height: 970 },
  },
  {
    ficheiro: 'WhatsApp Image 2026-09-17 at 07.42.59 (1).jpeg',
    saida: 'implantes.jpg',
    area: { left: 720, top: 0, width: 534, height: 1030 },
  },
  {
    ficheiro: 'WhatsApp Image 2026-09-17 at 07.45.04.jpeg',
    saida: 'hof.jpg',
    area: { left: 545, top: 0, width: 709, height: 800 },
  },
  {
    ficheiro: 'WhatsApp Image 2026-09-17 at 07.47.29.jpeg',
    saida: 'facetas.jpg',
    area: { left: 655, top: 0, width: 599, height: 1015 },
  },
];

await mkdir(destino, { recursive: true });
await mkdir('public', { recursive: true });

for (const { ficheiro, saida, area } of recortes) {
  await sharp(`${origem}/${ficheiro}`).extract(area).jpeg({ quality: 92 }).toFile(`${destino}/${saida}`);
  console.log('recorte', saida);
}

// Logótipo sem as margens vazias do ficheiro original
for (const nome of ['logo-face-e-vida-fundo-escuro', 'logo-face-e-vida-fundo-claro']) {
  await sharp(`materiais/${nome}.png`).trim().png().toFile(`${destino}/${nome}.png`);
  console.log('logo', nome);
}

// Imagem que aparece quando o link é partilhado (WhatsApp, redes sociais)
await sharp(`${origem}/WhatsApp Image 2026-09-17 at 07.45.04.jpeg`)
  .resize(1200, 1200)
  .jpeg({ quality: 86 })
  .toFile('public/partilha.jpg');
console.log('partilha');

// Favicon: só o símbolo (rosto + dente) sobre fundo escuro
const apagaTexto = await sharp({
  create: { width: 325, height: 58, channels: 4, background: '#000' },
})
  .png()
  .toBuffer();

const recorteSimbolo = await sharp('materiais/logo-face-e-vida-fundo-escuro.png')
  .extract({ left: 450, top: 30, width: 800, height: 670 })
  // remove o pedaço da palavra "INSTITUTO" que entra no recorte
  .composite([{ input: apagaTexto, left: 0, top: 612, blend: 'dest-out' }])
  .png()
  .toBuffer();

const simbolo = await sharp(recorteSimbolo)
  .resize(176, 176, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer();

await sharp({ create: { width: 256, height: 256, channels: 4, background: '#0c0a07' } })
  .composite([{ input: simbolo, gravity: 'centre' }])
  .png()
  .toFile('public/favicon.png');
console.log('favicon');
