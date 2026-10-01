// Dados de contacto do instituto. É o único sítio onde se trocam os números.

export const contacto = {
  // Formato internacional, só algarismos (351 + número).
  whatsapp: '351932021938',
  // Número para chamadas, como deve aparecer escrito na página.
  telefone: '+351 932 021 938',
  // Em Portugal é obrigatório indicar o custo da chamada junto ao número.
  // Ex.: 'Chamada para a rede móvel nacional' ou 'Chamada para a rede fixa nacional'.
  custoChamada: 'Chamada para a rede móvel nacional',
};

export const morada = {
  rua: 'Rua de Oliveira Monteiro, 435',
  codigoPostal: '4050-160',
  cidade: 'Porto',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+de+Oliveira+Monteiro+435%2C+4050-160+Porto',
};

export const numeroProvisorio = contacto.whatsapp.includes('000000');

export const linkTelefone = `tel:${contacto.telefone.replace(/[^\d+]/g, '')}`;

export function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
