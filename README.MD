# 🎬 CineTech Solutions

**CineTech Solutions** é um sistema completo para gerenciamento e visualização de filmes. Desenvolvido em PHP orientado a objetos, utilizando o padrão MVC, PDO para conexão segura ao banco de dados, Composer para autoload e dependências, Bootstrap para a interface responsiva e moderna, e API REST para comunicação entre front-end e back-end.

## 🧰 Tecnologias Utilizadas

- PHP 8+
- PDO (PHP Data Objects)
- Composer (Autoload e organização de dependências)
- Bootstrap 5
- MySQL
- HTML5, CSS3 e JavaScript (Fetch API)
- Arquitetura MVC
- API RESTful
- Upload de imagens

---

## 📁 Estrutura do Projeto

```bash
├── backend/             # Lógica do sistema em PHP (MVC + PDO)
├── cine-api/            # API REST em PHP orientado a objetos
├── frontend/            # Interface do usuário (HTML + Bootstrap + JS)
└── README.md            # Documentação do projeto

🛠️ Como Instalar
1. Clonar o repositório
bash
Copiar
Editar
git clone https://github.com/seu-usuario/cinetech-solutions.git
cd cinetech-solutions
2. Configurar o banco de dados
Crie um banco de dados MySQL (ex: cinetech_db)

Importe o script SQL localizado em backend/database/cinetech.sql

3. Configurar o arquivo .env ou config.php (dependendo da sua estrutura)
php
Copiar
Editar
// backend/config/config.php
define('DB_HOST', 'localhost');
define('DB_NAME', 'cinetech_db');
define('DB_USER', 'seu_usuario');
define('DB_PASS', 'sua_senha');
4. Instalar as dependências com o Composer
bash
Copiar
Editar
cd backend
composer install
▶️ Como Usar
Iniciar servidor local com PHP
bash
Copiar
Editar
php -S localhost:8000 -t public/
Acesse a área pública: http://localhost:8000

Acesse a área administrativa: http://localhost:8000/admin