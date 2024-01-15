const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;
const secretKey = "seu_segredo_secreto"; // Substitua por uma chave segura na produção

app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "acesso123",
  database: "oculto",
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.stack);
    return;
  }
  console.log("Conectado ao banco de dados como ID", connection.threadId);
});

// Rota para autenticar um usuário
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      mensagem: "Informe email e senha para autenticar um usuário.",
    });
  }

  const verificarCredenciaisQuery =
    "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
  connection.query(
    verificarCredenciaisQuery,
    [email, senha],
    (err, resultados) => {
      if (err) {
        console.error("Erro ao verificar credenciais:", err);
        return res.status(500).json({
          mensagem: "Erro interno do servidor ao verificar credenciais.",
          error: err.message,
        });
      }

      if (resultados.length === 1) {
        const usuario = resultados[0];
        const token = jwt.sign(
          { id: usuario.id, email: usuario.email },
          secretKey,
          {
            expiresIn: "1h",
          }
        );

        res.json({
          mensagem: "Autenticação bem-sucedida!",
          token: token,
        });
      } else {
        res.status(401).json({
          mensagem: "Credenciais inválidas.",
        });
      }
    }
  );
});

// Rota para cadastrar um usuário
app.post("/cadastrar", (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      mensagem: "Informe nome, email e senha para cadastrar um usuário.",
    });
  }

  const cadastrarUsuarioQuery =
    "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
  connection.query(
    cadastrarUsuarioQuery,
    [nome, email, senha],
    (err, resultado) => {
      if (err) {
        console.error("Erro ao cadastrar usuário:", err);
        return res.status(500).json({
          mensagem: "Erro interno do servidor ao cadastrar usuário.",
          error: err.message,
        });
      }

      res.json({
        mensagem: "Usuário cadastrado com sucesso!",
        id: resultado.insertId,
      });
    }
  );
});
// Rota para listar usuários cadastrados
app.get("/usuarios", verificarToken, (req, res) => {
  const listarUsuariosQuery = "SELECT id, nome, email FROM usuarios";
  connection.query(listarUsuariosQuery, (err, resultados) => {
    if (err) {
      console.error("Erro ao listar usuários:", err);
      return res.status(500).json({
        mensagem: "Erro interno do servidor ao listar usuários.",
        error: err.message,
      });
    }

    res.json({
      usuarios: resultados,
    });
  });
});

// Função para verificar o token de autenticação
function verificarToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      mensagem: "Token de autenticação não fornecido.",
    });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error("Erro ao verificar token:", err);
      return res.status(401).json({
        mensagem: "Token de autenticação inválido.",
        error: err.message,
      });
    }

    req.usuario = decoded;
    next();
  });
}

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
