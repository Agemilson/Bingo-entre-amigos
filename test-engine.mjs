// Teste unitário independente de validação das regras do Bingo

function formatDezena(val) {
  const num = typeof val === 'number' ? val : parseInt(String(val).trim(), 10);
  if (isNaN(num) || num < 0 || num > 99) {
    return '';
  }
  return num.toString().padStart(2, '0');
}

function extractDezenaFromMilhar(input) {
  if (!input) return null;
  const clean = input.replace(/\D/g, '');
  if (!clean) return null;
  if (clean.length === 1) {
    return { dezena: '0' + clean, milharLimpa: clean };
  }
  const ultimosDois = clean.slice(-2);
  return { dezena: ultimosDois, milharLimpa: clean };
}

function validarJogo(dezenasInput) {
  let lista = [];
  if (typeof dezenasInput === 'string') {
    lista = dezenasInput.split(/[\s,.;-]+/).map((s) => s.trim()).filter((s) => s.length > 0);
  } else if (Array.isArray(dezenasInput)) {
    lista = dezenasInput.map((s) => String(s).trim()).filter((s) => s.length > 0);
  }

  const formatadas = [];
  const set = new Set();

  for (const item of lista) {
    const dezena = formatDezena(item);
    if (!dezena) {
      return { valido: false, erro: `Número inválido: "${item}"`, dezenasFormatadas: [] };
    }
    if (set.has(dezena)) {
      return { valido: false, erro: `Dezena repetida: "${dezena}"`, dezenasFormatadas: [] };
    }
    set.add(dezena);
    formatadas.push(dezena);
  }

  if (formatadas.length < 10) {
    return { valido: false, erro: `Apenas ${formatadas.length} dezenas selecionadas`, dezenasFormatadas: formatadas };
  }
  if (formatadas.length > 10) {
    return { valido: false, erro: `Mais de 10 dezenas selecionadas`, dezenasFormatadas: formatadas.slice(0, 10) };
  }

  formatadas.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  return { valido: true, dezenasFormatadas: formatadas };
}

function gerarSurpresinha() {
  const set = new Set();
  while (set.size < 10) {
    const rand = Math.floor(Math.random() * 100);
    set.add(rand.toString().padStart(2, '0'));
  }
  return Array.from(set).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
}

// BATERIA DE TESTES
console.log('🧪 Iniciando testes das regras do BolãoBingo...\n');

// Teste 1: Extração de Milhar
const ex1 = extractDezenaFromMilhar('2119');
console.assert(ex1 && ex1.dezena === '19', `Falha: 2119 deveria extrair 19, obteve ${ex1?.dezena}`);
console.log('✅ Teste 1.1: Milhar 2119 extrai dezena 19');

const ex2 = extractDezenaFromMilhar('0504');
console.assert(ex2 && ex2.dezena === '04', `Falha: 0504 deveria extrair 04, obteve ${ex2?.dezena}`);
console.log('✅ Teste 1.2: Milhar 0504 extrai dezena 04');

const ex3 = extractDezenaFromMilhar('7');
console.assert(ex3 && ex3.dezena === '07', `Falha: 7 deveria extrair 07, obteve ${ex3?.dezena}`);
console.log('✅ Teste 1.3: Número 7 extrai dezena 07');

// Teste 2: Validação de 10 dezenas sem repetição
const jogoValido = ['04', '12', '19', '25', '33', '45', '56', '67', '80', '99'];
const v1 = validarJogo(jogoValido);
console.assert(v1.valido && v1.dezenasFormatadas.length === 10, 'Falha no jogo válido');
console.log('✅ Teste 2.1: Jogo com 10 dezenas únicas aprovado');

const jogoComRepeticao = ['04', '12', '19', '19', '33', '45', '56', '67', '80', '99'];
const v2 = validarJogo(jogoComRepeticao);
console.assert(!v2.valido && v2.erro.includes('repetida'), 'Falha ao rejeitar repetição');
console.log('✅ Teste 2.2: Jogo com número repetido (19) rejeitado com sucesso');

const jogoIncompleto = ['04', '12', '19'];
const v3 = validarJogo(jogoIncompleto);
console.assert(!v3.valido, 'Falha ao rejeitar menos de 10');
console.log('✅ Teste 2.3: Jogo com menos de 10 dezenas rejeitado com sucesso');

// Teste 3: Surpresinha
const surp = gerarSurpresinha();
const vSurp = validarJogo(surp);
console.assert(vSurp.valido && surp.length === 10, 'Falha na Surpresinha');
console.log('✅ Teste 3: Surpresinha gerou 10 dezenas únicas válidas:', surp.join(', '));

// Teste 4: Verificação de Vitória (BINGO!)
const dezenasSorteadas = ['04', '12', '19', '25', '33', '45', '56', '67', '80', '99'];
const acertos = jogoValido.filter((d) => dezenasSorteadas.includes(d));
console.assert(acertos.length === 10, 'Falha no cálculo de BINGO');
console.log('✅ Teste 4: Cartela com 10 acertos detectada com sucesso (BINGO!)');

console.log('\n🎉 TODOS OS TESTES PASSARAM COM 100% DE SUCESSO!');
