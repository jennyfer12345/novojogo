document.addEventListener("DOMContentLoaded", function () {
  const carrinho = [];
  const games = document.querySelectorAll(".game");
  const gameDetails = document.querySelector(".centered-container");
  const gameDetailsContent = document.getElementById("gameDetailsContent");
  const closeButton = document.getElementById("closeDetails");

  const gameInfo = {
    "Need for Speed: Underground 2": {
      price: "Preço: R$49,99",
      description:
        "Need For Speed: Underground 2 é um jogo de corrida de 2004 desenvolvido pela EA Black Box e publicado pela Electronic Arts. É a oitava edição da série Need for Speed ​​e a sequência direta de Need for Speed: Underground. Foi desenvolvido para Microsoft Windows, GameCube, PlayStation 2 e Xbox.",
      tipo: "Plataforma: PlayStation 2",
    },
    "Forza Horizon 5": {
      price: "Preço: R$59,99",
      description:
        "Forza Horizon 5 é um jogo eletrônico de corrida desenvolvido pela Playground Games e publicado pela Xbox Game Studios. É o quinto jogo da série Forza Horizon e o décimo segundo título principal da franquia Forza. O jogo se passa em uma representação ficcional do México.",
      tipo: "Plataforma: Xbox",
    },
    "Gran Turismo 4": {
      price: "Preço: R$129,99",
      description:
        "Gran turismo 4! Mais de 650 carros abrangendo um século de história automotiva, até 100 pistas de todo o mundo, espectadores que reagem a cada movimento seu, novos modos de jogo como o Modo Foto e o Modo B-Spec, correndo em toda a sua glória de tirar o fôlego. Reviva esse clássico dos Games.",
      tipo: "Plataforma: PlayStation 2",
    },
    "Mario Kart: Double Dash": {
      price: "Preço: R$99,99",
      description:
        "É o quarto jogo da série Mario Kart, estrelada por personagens típicos da série Mario. Ele traz, como principal inovação, dois personagens em cada kart. O jogo introduziu uma série de novas características de jogabilidade, especialmente a inclusão de dois pilotos por kart.",
      tipo: "Plataforma: Nintendo GameCube",
    },
    "Project CARS 2": {
      price: "Preço: R$199,99",
      description:
        "Feito por fãs e para fãs de corridas automobilísticas, Project CARS 2 traz uma série de recursos a mais para os maníacos por carros. Entre as novidades do jogo estão mais de 200 trajetos espalhados por 50 lugares distintos, incluindo opções rally em pistas de terra, lama e neve.",
      tipo: "Plataformas: Xbox One",
    },
    "Burnout 3": {
      price: "Preço: R$39,99",
      description:
        "Burnout 3 Takedown é um jogo de corrida onde seu principal objetivo é a destruição: corra na contra mão, persiga e bata em seus inimigos e chegue em primeiro! Em Burnout 3 Takedown velocidade não é tudo, o jogador tem que literalmente destruir seus inimigos em colisões insanas.",
      tipo: "Plataformas: PlayStation 2",
    },
    "Colin McRae Rally": {
      price: "Preço: R$59,99",
      description:
        "Colin McRae Rally 04 coloca você no assento do piloto, competindo em emocionantes corridas de rali ao redor do mundo. Com gráficos detalhados, física de carros realista e uma jogabilidade desafiadora, este jogo é perfeito para os fãs de corridas de rali.",
      tipo: "Plataformas: PlayStation 2",
    },
    "Call of Duty: World at War – Final Fronts": {
      price: "Preço: R$99,99",
      description:
        "Call of Duty: Word at War – Final Fronts é um jogo de tiro em primeira pessoa assim como os outros títulos da série Call of Duty. Seu foco está em suas campanhas single-player. O jogador pode alternar entre duas armas e pode transportar granadas de fragmentação e granadas de fumaça.",
      tipo: "Plataformas: PlayStation 2",
    },
    "Battlefield 4": {
      price: "Preço: R$139,99",
      description:
        "Além do aclamado modo multiplayer, o Battlefield 4 conta com uma campanha dramática, intensa e focada em personagens, que começa com a evacuação de VIPs Americanos de Xangai e acompanha a luta do seu pelotão para encontrar o caminho de casa.",
      tipo: "Plataformas: PlayStation 4",
    },
    "Counter-Strike: Global": {
      price: "Preço: R$89,99",
      description:
        "O jogo é baseado em rodadas nas quais equipes de contraterroristas e terroristas combatem-se até a eliminação completa de um dos times, e tem como objetivo principal plantar e desarmar bombas, ou sequestrar e salvar reféns.",
      tipo: "Plataformas: PlayStation 3",
    },
    Overwatch: {
      price: "Preço: R$89,99",
      description:
        "Overwatch possui um combate de equipe com dois times rivais compostos de seis jogadores cada. Os jogadores podem escolher um dos vários heróis, cada qual com suas próprias habilidades e função de classe.",
      tipo: "Plataforma: Xbox",
    },
    "Rainbow Six Siege": {
      price: "Preço: R$59,99",
      description:
        "Tom Clancy's Rainbow Six® Siege é um jogo de tiro tático em primeira pessoa com intensas partidas de 5 contra 5. Ataque ou defenda com uma variedade de agentes diferentes à sua escolha.",
      tipo: "Plataformas: PlayStation 4",
    },
    Destiny: {
      price: "Preço: R$49,99",
      description:
        "Destiny é um jogo de tiro em primeira pessoa de última geração, com uma narrativa cinematográfica rica sem precedentes, modos de jogo públicos cooperativos e competitivos e atividades integradas a um mundo online persistente. Aventure-se só ou junte-se a um grupo de amigos. A escolha é sua.",
      tipo: "Plataformas: Xbox",
    },
    Halo: {
      price: "Preço: R$159,99",
      description:
        "A Trama Traz Master Chief Novamente Como Personagem Principal, Retratando A Luta Do Herói Contra Forças Desconhecidas Para Tentar Salvar O Universo. A Inteligência Artificial Cortana Também Retorna Para Auxiliar O Soldado Nos Momentos Mais Intensos E Sangrentos Na Batalha, Como Uma Ajuda Adcional Para A Sua Vitória.",
      tipo: "Plataformas: Xbox",
    },
    "The Witcher 3: Wild Hunt": {
      price: "Preço: R$269,99",
      description:
        "Ambientado em uma tranquila província repleta de vinhedos banhados pela luz do sul, arquitetura incrível e locais extravagantes, nem tudo é o que parece quando Geralt de Rivia surge do nada na cidade. Desvende os segredos sombrios por trás de uma série de misteriosos assassinatos que começam a assolar a região.",
      tipo: "Plataformas: PlayStation",
    },
    "Skyrim (The Elder ScrollsV)": {
      price: "Preço: R$149,99",
      description:
        "The Elder Scrolls V: Skyrim - The Adventure Game é um jogo cooperativo de aventura e exploração de 1 a 4 jogadores em Skyrim. Os jogadores assumem o papel de heróis envolvidos em missões épicas, trabalhando juntos para derrotar seus inimigos e explorando a vasta extensão de Skyrim.",
      tipo: "Plataformas: Nintendo Switch",
    },
    "Final Fantasy XV": {
      price: "Preço: R$179,99",
      description:
        "Final Fantasy XV se passa em meio a uma batalha mitológica, contando a história do único país que tem a posse de um Crystal, a maior fonte de poder do mundo. Todos os outros reinos já tiveram em suas mãos esses cristais, mas os perderam em batalhas contínuas.",
      tipo: "Plataformas: Xbox One",
    },
    "Mass Effect": {
      price: "Preço: R$299,99",
      description:
        "Uma pessoa é tudo o que se interpõe entre a humanidade e a maior ameaça que esta já enfrentou. Revive a lenda de Comandante Shepard na altamente aclamada trilogia Mass Effect com o Mass Effect™ Legendary Edition.",
      tipo: "Plataformas: Xbox 360",
    },
    "Dragon Age: Inquisition": {
      price: "Preço: R$59,99",
      description:
        "Dragon Age: Origins, você deixará sua marca em um mundo aberto, influenciado pela história e repleto de personagens complexos, combates desafiadores e decisões difíceis. Um evento cataclísmico causou desordem na terra de Thedas.",
      tipo: "Plataformas: PlayStation 4",
    },
    Starfield: {
      price: "Preço: R$349,99",
      description:
        "Neste RPG de nova geração localizado por entre as estrelas, cria qualquer personagem que desejes e explora com uma liberdade sem paralelo enquanto partes numa viagem épica para desvendar o maior mistério da humanidade.",
      tipo: "Plataformas: Xbox",
    },
    "Dark Souls": {
      price: "Preço: R$149,99",
      description:
        "Dark Souls é uma série de jogos de RPG de ação desenvolvidos pela FromSoftware e publicados pela Bandai Namco Entertainment. Tudo começou com o lançamento de Dark Souls e teve duas sequências, Dark Souls II e Dark Souls III.",
      tipo: "Plataformas: PlayStation 4",
    },
  };

  games.forEach((game) => {
    const gameTitle = game.querySelector(".game-info p:first-child").innerText;
    const gameImage = game.querySelector("img");

    // Adiciona evento de clique no título do jogo
    game
      .querySelector(".game-info p:first-child")
      .addEventListener("click", () => {
        showGameDetails(gameTitle);
      });

    // Adiciona evento de clique na imagem do jogo
    gameImage.addEventListener("click", () => {
      showGameDetails(gameTitle);
    });
  });

  function showGameDetails(title) {
    const details = gameInfo[title];

    const detailsHTML = `
      <h3>${title}</h3>
      <p>${details.price}</p>
      <p>${details.description}</p>
      <p>${details.tipo}</p>
      <!-- Adicione outras informações que desejar -->
    `;

    gameDetailsContent.innerHTML = detailsHTML;
    gameDetails.style.display = "flex";
  }

  closeButton.addEventListener("click", () => {
    gameDetails.style.display = "none";
  });

  const searchForm = document.getElementById("searchForm");

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Lógica de pesquisa (se desejado)
  });
});
const games = document.querySelectorAll(".game");

function searchGames(searchTerm) {
  games.forEach((game) => {
    const gameTitle = game
      .querySelector(".game-info p:first-child")
      .innerText.toLowerCase();

    if (gameTitle.includes(searchTerm.toLowerCase())) {
      game.style.display = "block"; // Mostra o jogo se corresponder à pesquisa
    } else {
      game.style.display = "none"; // Esconde o jogo se não corresponder à pesquisa
    }
  });
}

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== "") {
    searchGames(searchTerm);
  } else {
    // Se o campo de pesquisa estiver vazio, exibir todos os jogos novamente
    games.forEach((game) => {
      game.style.display = "block";
    });
  }
});
const ratingContainer = document.getElementById("ratingContainer");
const closeRatingButton = document.getElementById("closeRating");
const gameDetailsContent = document.getElementById("gameDetailsContent");

games.forEach((game) => {
  const gameTitle = game.querySelector(".game-info p:first-child").innerText;

  // Adiciona evento de clique no título do jogo
  game
    .querySelector(".game-info p:first-child")
    .addEventListener("click", () => {
      showGameDetails(gameTitle);
    });

  // Adiciona evento de clique na imagem do jogo
  game.querySelector("img").addEventListener("click", () => {
    showGameDetails(gameTitle);
  });
});
const openReviewButton = document.getElementById("openReview");
const closeReviewButton = document.getElementById("closeReview");
const gameReviewContainer = document.getElementById("gameReviewContainer");

openReviewButton.addEventListener("click", () => {
  gameReviewContainer.style.display = "block";
});

closeReviewButton.addEventListener("click", () => {
  gameReviewContainer.style.display = "none";
});

const submitReviewButton = document.getElementById("submitReview");

submitReviewButton.addEventListener("click", () => {
  const selectedStars = document.querySelector(".stars .selected");
  const reviewComment = document.getElementById("reviewComment").value;

  // Adicione o código para obter o user_id do usuário logado (se aplicável)
  const userId = 1; // Substitua pelo código real para obter o ID do usuário logado

  // Verifica se a avaliação e o comentário foram fornecidos
  if (!selectedStars || !reviewComment || !userId) {
    console.error("Avaliação, comentário ou ID do usuário ausentes.");
    return;
  }

  // Dados a serem enviados para o backend
  const reviewData = {
    comentario: reviewComment,
    avaliacao: selectedStars.getAttribute("data-value"),
    user_id: userId,
  };

  // Envia os dados para o backend
  fetch("http://localhost:3000/comentarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Resposta do servidor:", data);
      // Limpeza de campos ou outras ações necessárias após o envio bem-sucedido
      // ...

      // Fechar o contêiner de avaliação após o envio
      gameReviewContainer.style.display = "none";
    })
    .catch((error) => {
      console.error("Erro ao enviar avaliação:", error);
      // Lógica de tratamento de erro, se necessário
    });
});

// script.js
document.addEventListener("DOMContentLoaded", function () {
  var carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  var addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Pergunta ao usuário se deseja adicionar o item ao carrinho
      var confirmation = confirm(
        "Você tem certeza que deseja adicionar este item ao carrixnho?"
      );

      if (confirmation) {
        var gameContainer = button.closest(".game");
        if (gameContainer) {
          var gameDetails = {
            name:
              gameContainer.querySelector(".game-info p:first-child")
                ?.textContent || "Nome do Jogo Indisponível",
            image:
              gameContainer.querySelector("img")?.src ||
              "caminho/da/imagem-padrao.jpg",
            price:
              gameContainer.querySelector(".game-info p:last-child")
                ?.textContent || "Preço Indisponível",
          };

          // Adiciona o jogo ao array carrinho
          carrinho.push(gameDetails);

          // Armazena o array carrinho no localStorage para persistência entre páginas
          localStorage.setItem("carrinho", JSON.stringify(carrinho));

          // Redireciona para a página do carrinho
          window.location.href = "carrinho.html";
        } else {
          console.error("Erro: Container do jogo não encontrado");
        }
      }
    });
  });
});
