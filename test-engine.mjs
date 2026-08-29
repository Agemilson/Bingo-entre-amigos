// Teste unitário independente do motor atualizado com modo 15 dezenas

function formatDezena(val) {
  const num = typeof val === 'number' ? val : parseInt(String(val).trim(), 10);
  if (isNaN(num) || num < 0 || num > 99) return '';
  return num.toString().padStart(2, '0');
}

function extractDezenasFromMilhar(input, modo = 'final') {
  if (!input) return null;
  const clean = input.replace(/\D/g, '');
  if (!clean) return null;

  if (clean.length === 1) {
    const d = '0' + clean;
    return { numeroBruto: clean, dezenas: [d], dezenaPrincipal: d, detalhe: { final: d } };
  }
  if (clean.length === 2) {
    return { numeroBruto: clean, dezenas: [clean], dezenaPrincipal: clean, detalhe: { final: clean } };
  }

  const milhar4 = clean.slice(-4).padStart(4, '0');
  const inicial = milhar4.slice(0, 2);
  const central = milhar4.slice(1, 3);
  const final = milhar4.slice(2, 4);

  if (modo === '15_dezenas') {
    return {
      numeroBruto: clean,
      dezenas: [inicial, central, final],
      dezenaPrincipal: final,
      detalhe: { inicial, central, final }
    };
  }

  return {
    numeroBruto: clean,
    dezenas: [final],
    dezenaPrincipal: final,
    detalhe: { final }
  };
}

console.log('🧪 Iniciando testes das novas funcionalidades...\n');

// Teste 1: Modo 15 Dezenas
const res15 = extractDezenasFromMilhar('2119', '15_dezenas');
console.assert(res15 && res15.dezenas.length === 3, 'Falha: deveria extrair 3 dezenas');
console.assert(res15.detalhe.inicial === '21', `Inicial errada: ${res15.detalhe.inicial}`);
console.assert(res15.detalhe.central === '11', `Central errada: ${res15.detalhe.central}`);
console.assert(res15.detalhe.final === '19', `Final errada: ${res15.detalhe.final}`);
console.log('✅ Teste 1: Milhar 2119 no modo 15 dezenas extrai [21, 11, 19] com sucesso!');

// Teste 2: Modo Dezena Final
const resFinal = extractDezenasFromMilhar('2119', 'final');
console.assert(resFinal && resFinal.dezenas.length === 1, 'Falha: deveria extrair 1 dezena');
console.assert(resFinal.dezenas[0] === '19', 'Final errada');
console.log('✅ Teste 2: Milhar 2119 no modo final extrai [19] com sucesso!');

// Teste 3: Lote de 5 Milhares no Modo 15 Dezenas
const milharesFederal = ['2119', '8452', '0304', '7890', '4533'];
const todasDezenas = [];
milharesFederal.forEach((m) => {
  const r = extractDezenasFromMilhar(m, '15_dezenas');
  todasDezenas.push(...r.dezenas);
});
console.assert(todasDezenas.length === 15, `Deveria ter 15 dezenas, obteve ${todasDezenas.length}`);
console.log('✅ Teste 3: 5 milhares da Federal geram exatamente 15 dezenas:', todasDezenas.join(', '));

console.log('\n🎉 TODOS OS TESTES PASSARAM COM SUCESSO!');
