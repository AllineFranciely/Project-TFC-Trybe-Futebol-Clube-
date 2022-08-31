O projeto TFC -Trybe Futebol Clube, foi desenvolvido para conslusão do bloco 28 do módulo de back-end do curso da Trybe.
Nele construí **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. Seu desenvolvimento **respeitou regras de negócio** providas no projeto e **sua API pode ser consumida por um front-end já provido nesse projeto**.

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - Será um container docker MySQL já configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - Durante a execução dos testes sempre vai ser acessado pelo `sequelize` e via porta `3002` do `localhost`;
  - Você também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço `db`.

2️⃣ **Back-end:**
 - Será o ambiente que você realizará a maior parte das implementações exigidas.
 - Deve rodar na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - Sua aplicação deve ser inicializada a partir do arquivo `app/backend/src/server.ts`;
 - Garanta que o `express` é executado e a aplicação ouve a porta que vem das variáveis de ambiente;
 - Todas as dependências extras (tal como `joi`, `boom`, `express-async-errors`...) devem ser listadas em `app/backend/packages.npm`.

3️⃣ **Front-end:**
  - O front já está concluído, não é necessário realizar modificações no mesmo. A única exceção será seu Dockerfile que precisará ser configurado.
  - Todos os testes a partir do requisito de login usam o `puppeteer` para simular uma pessoa acessando o site `http://localhost:3000/`;
  - O front se comunica com serviço de back-end pela url `http://localhost:3001` através dos endpoints que você deve construir nos requisitos.
  - Recomendamos que sempre que implementar um requisito no back-end acesse a página no front-end que consome a implementação para validar se está funcionando como esperado.

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up` ou `npm run compose:up:dev`;
  - Você **deve** configurar as `Dockerfiles` corretamente nas raízes do `front-end` e `back-end`, para conseguir inicializar a aplicação;

Todo o projeto foi desenvolvido em TypeScript e respeitando o Modelo de Arquitetura de Software MSC. Além disso a API funciona baseada nos princípios do CRUD.