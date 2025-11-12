// Importando as dependências
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// ---------------------------
// CONFIGURAÇÃO DA REDE
// ---------------------------
// bitcoin.networks.bitcoin  → mainnet (rede principal)
// bitcoin.networks.testnet  → testnet (rede de testes)
const network = bitcoin.networks.testnet;  // altere para mainnet se quiser usar a rede principal

// Caminho HD derivation (BIP44)
// m / purpose' / coin_type' / account' / change / address_index
// Para Bitcoin testnet → coin_type = 1
// Para Bitcoin mainnet → coin_type = 0
const path = `m/49'/1'/0'/0/0`; // testnet (troque 1 por 0 se for mainnet)

// ---------------------------
// GERAÇÃO DO MNEMONIC E SEED
// ---------------------------
const mnemonic = bip39.generateMnemonic(); // gera 12 palavras aleatórias
const seed = bip39.mnemonicToSeedSync(mnemonic);
const root = bip32.fromSeed(seed, network);

// ---------------------------
// DERIVAÇÃO DA CONTA (CHAVES)
// ---------------------------
const account = root.derivePath(path);
const node = account.derive(0);

// ---------------------------
// CRIAÇÃO DO ENDEREÇO BITCOIN
// ---------------------------
// Escolha o tipo de endereço que quer gerar:

// 1️⃣ Endereço legado (começa com "m" ou "n" na testnet / "1" na mainnet)
const { address: p2pkhAddress } = bitcoin.payments.p2pkh({
  pubkey: node.publicKey,
  network,
});

// 2️⃣ Endereço SegWit (bech32 - começa com "tb1" ou "bc1")
// const { address: p2wpkhAddress } = bitcoin.payments.p2wpkh({
//   pubkey: node.publicKey,
//   network,
// });

// ---------------------------
// SAÍDA DOS DADOS
// ---------------------------
console.log('=====================================');
console.log('💳 Carteira Bitcoin gerada com sucesso!');
console.log('=====================================');
console.log('Endereço (P2PKH):', p2pkhAddress);
// console.log('Endereço (P2WPKH):', p2wpkhAddress); // descomente se quiser SegWit
console.log('Chave privada (WIF):', node.toWIF());
console.log('Mnemonic (Seed):', mnemonic);
console.log('=====================================');
// Fim do código