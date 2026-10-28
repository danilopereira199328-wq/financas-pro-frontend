const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de Middlewares
app.use(cors());
app.use(express.json());

// Servir ficheiros estáticos da pasta atual
app.use(express.static(path.join(__dirname)));

// Base de dados em memória para as transações sincronizadas
let transacoesDoServidor = [];

// --- ROTAS DA API ---
app.get('/api/transactions', (req, res) => {
    res.json(transacoesDoServidor);
});

app.post('/api/transactions', (req, res) => {
    const novaTx = req.body;
    transacoesDoServidor.unshift(novaTx);
    res.status(201).json({ success: true, transaction: novaTx });
});

// --- ROTA DE SUPORTE AO FRONTEND ---
// Garante que qualquer pedido feito ao servidor devolve o index.html principal
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar Servidor
app.listen(PORT, () => {
    console.log(`Servidor Finanças PRO a correr na porta ${PORT}`);
});