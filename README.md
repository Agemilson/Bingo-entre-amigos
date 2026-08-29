# 🎟️ BolãoBingo - Sistema de Bingo das Dezenas entre Amigos

Sistema web moderno, responsivo e pronto para nuvem (Vercel, Render, Railway, etc.) para sorteios de bingo e bolões entre amigos baseados nas dezenas da **Loteria Federal** e **Jogo do Bicho**.

---

## 🎯 Regras do Jogo

1. **Cartela do Jogador**:
   - Cada jogo é composto por **10 dezenas únicas** de `00` a `99`.
   - **Sem repetição**: Não é permitido repetir números dentro da mesma cartela.
   - O jogador pode escolher as dezenas visualmente na grade de 00 a 99, usar o botão **🎲 Surpresinha** (aleatório automático) ou digitar dezenas separadas por espaço.
   - Um mesmo participante pode cadastrar quantos jogos quiser no mesmo pedido.
   - **Valor por jogo**: R$ 10,00 (configurável pelo organizador).

2. **Extração das Dezenas pelo Organizador (Admin)**:
   - Baseado nos resultados da **Loteria Federal** ou **Jogo do Bicho**.
   - O organizador digita a **milhar** ou **centena** sorteada (ex: `2119`), e o sistema extrai e marca automaticamente a dezena `19`.
   - Suporte a lançamento rápido do **1º ao 5º prêmio** da Federal de uma só vez.
   - O sistema também conta com um globo eletrônico de sorteio aleatório virtual caso queira sortear na hora.

3. **Critério de Vitória (BINGO!)**:
   - O sistema audita todas as cartelas a cada número lançado.
   - O primeiro participante que atingir **10 acertos** (10/10) vence o bolão.
   - Havendo empate no mesmo sorteio, o prêmio acumulado é dividido proporcionalmente entre os ganhadores.

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- npm ou yarn

### Passo a passo
1. Abra o terminal no diretório do projeto:
   ```bash
   cd C:\Users\Agemilson\.gemini\antigravity\scratch\bingo-amigos
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse no seu navegador:
   - **Página Inicial:** [http://localhost:3000](http://localhost:3000)
   - **Comprar Jogos:** [http://localhost:3000/jogar](http://localhost:3000/jogar)
   - **Telão ao Vivo:** [http://localhost:3000/telao](http://localhost:3000/telao)
   - **Minhas Cartelas:** [http://localhost:3000/minhas-cartelas](http://localhost:3000/minhas-cartelas)
   - **Painel Organizador:** [http://localhost:3000/admin](http://localhost:3000/admin) *(PIN padrão: `1234`)*

---

## ☁️ Como Fazer o Deploy Gratuito na Nuvem

### Opção 1: Vercel (Recomendado - 1 Clique)
1. Crie uma conta gratuita na [Vercel](https://vercel.com).
2. Suba o projeto para um repositório no seu GitHub.
3. No painel da Vercel, clique em **Add New Project** e selecione o repositório.
4. Clique em **Deploy**. Seu sistema estará no ar com link público HTTPS pronto para enviar aos seus amigos!

### Opção 2: Render ou Railway
1. Conecte seu repositório no [Render](https://render.com) ou [Railway](https://railway.app).
2. Selecione ambiente `Node` e comando de build `npm run build && npm start`.

---

## 🛠️ Tecnologias Utilizadas
- **Next.js 14 (App Router)** com **TypeScript**
- **Tailwind CSS** com suporte a design dark mode refinado
- **Lucide Icons**
- **Canvas-Confetti** para efeitos de vitória
- Motor de persistência de dados local/nuvem em JSON com suporte a API REST
