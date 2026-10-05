const express = require('express');
const cors = require('cors');
const supabese = require('./supabase');// importar a comunição com supabese
const app = express();
const PORT = process.env.PORT || 3000;

//Muddlware essenciais
app.use(cors());// Permite que o frontnd acesse este backend sem erros de cors
app.use(express.json());// Permite que o Express entenda requiskçoes com corpo em JSON

//Passo 1 memoria ram do sercidor
let produtosEmMemoria = [
    { id: 1, nome: 'Teclado Mecânico RGB', preco: 150.00 },
    { id: 2, nome: 'Mouse Gamer 3200 DPI', preco: 150.00 }
];

//Rota GET
app.get('/produtos', (req, res) => {
    // console.log(`[GET /produtos] Enviando produtos em memorias...`)
    // // res.json(produtosEmMemoria)
    const{data, error} =await supabese
    .from('produtos')
    .select('*')
    .order('id', {ascending: true});
    if(error){
        return res.status(500).json({erro: error.massage});
    }
    res.json(data);
})
//Rota Post
app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body;

    if (!nome || !preco) {
        return res.status(400).json({ erro: 'Nome e preço são obritorios' });
    }
    const novoProduto = {
        id: Date.now(),//gera um id temporariamente baseado no timetamp
        nome,
        preco: parseFloat(preco)
    };

    produtosEmMemoria.push(novoProduto);
    console.log(`[POST] /produtos .... Produto Cadratado na RAM: ${novoProduto.nome} `);
    res.status(201).json(novoProduto);
});
// rota put
app.put('/produtos/:id', (req, res) => {
    const id = number(req.params.id)
    const { nome, preco } = req.body;
    const produto = produtosEmMemoria.find((item) => item.id === id);

    if (!produto) {
        return res.status(404).json({ mensagem: "Informe um nome um preçio valido" });
    }
    if (typeof nome !== 'string' || nome.trim() === '' || !Number.isFinite(Number(preco))) {
        return res.status(404).json({ mensagem: "informe um nome e prreco valido" });
    }
    produto.nome = nome.trim();
    produto.preco = number(preco)
});
//ROTA DELETE
app.delete('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const indice = produtosEmMemoria.findIndex((produto) => produto.id === id);
    if (indice === -1) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    const [produtoRemovido] = produtosEmMemoria.splice(indice, 1);
    res.json(produtoRemovido);

});
//lsten Iniciar  o servidor 
app.listen(PORT, () => {
    console.log(`============================================================`);
    console.log(`Servidor Backend Rodando em http://localhost:${PORT}`);
    console.log(`Rota de produtos ativa em http://localhost:3000/produtos`);
    console.log(`Status: MODO MEMORIA RAM ATIVO`);
    console.log(`============================================================`);
})
