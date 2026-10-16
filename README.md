# Apostilando

Estúdio pessoal de apostilas visuais, implementado em HTML, CSS e JavaScript. Sem login, GAS, Sheets, backend, cobrança ou controle de créditos.

## Módulos

- **Apostilas visuais:** tema ou documento, público, objetivo, categoria escolar/geral/música, estilos e idiomas; planejamento editável por página.
- **Fichas de estudo:** ficha, resumo, infográfico, revisão e atividade ilustrada.
- **Capas / Criativos:** capas e anúncios com título, público e orientações.
- **Montar PDF:** importar JPG/PNG/WebP, ordenar, remover e exportar A4 sem cortes.
- **Histórico e favoritos:** salvar, pesquisar, duplicar, favoritar e arquivar/restaurar projetos.
- **Meu espaço:** estatísticas locais, exportação/importação de backup com imagens.
- **Como usar:** instruções do fluxo semiautomático.

## Executar

Instale Node.js LTS e Python 3. No Windows, execute `INICIAR.bat`. Ou:

```sh
npm ci
npm test
npm run build
npm start
```

Abra `http://localhost:8080`. Use o mesmo endereço para reencontrar os projetos. Não abra o index por `file://`, pois os módulos e o leitor PDF precisam de servidor HTTP. As bibliotecas são empacotadas em `dist/vendor` durante o build; não há CDN em execução.

## Cloudflare Pages

Conecte este repositório ao Pages, usando `main`, comando de build `npm ci && npm run build` e pasta de saída `dist`. Não são necessárias variáveis de ambiente. O conteúdo dos projetos continua local a cada navegador; a hospedagem não sincroniza materiais.

## Fluxo

1. Informe um tema ou importe PDF com texto selecionável, DOCX, TXT ou MD (até 20 MB).
2. Prepare de 1 a 100 páginas e revise os títulos e conteúdos.
3. Copie os prompts individuais ou o roteiro completo e gere as imagens no Flow ou em outra IA.
4. Importe as imagens, confira a ordem e exporte o PDF.
5. Salve e exporte um backup JSON para conservar o projeto completo.

## Como o planejamento funciona

O modo por tema usa sugestões estruturadas locais, sem IA textual. Ele não finge ter escrito ou pesquisado o conteúdo. Edite o texto ou use as orientações na ferramenta de destino. No modo de documento, o texto extraído é distribuído entre a quantidade pedida de páginas, preservando integralmente os caracteres extraídos. A divisão não faz interpretação semântica; revise quebras e quantidade de texto. O leitor de PDF preserva texto extraível, não imagens, tabelas ou diagramação; PDFs escaneados exigem OCR externo.

O roteiro completo contém todas as páginas numeradas e pede imagens independentes. Não há integração automática com o Flow e não há garantia de que um único envio produza toda a apostila. Teste primeiro três páginas. A geração externa pode ter custos e limites próprios. Não há geração automática de imagens dentro desta versão.

## Dados e privacidade

Projetos e imagens ficam no IndexedDB deste navegador. Há salvamento automático a cada 15 segundos e botão de salvamento manual. Limpar os dados do site remove os projetos; use o backup. Importações de backup criam novas identidades e não substituem projetos existentes. Arquivar é reversível em Meu espaço. O limite de armazenamento depende do navegador. Documentos e imagens não são enviados pelo Apostilando a serviços externos.

## Verificação

`npm test` verifica preservação integral de texto em 14 páginas, validação do planejamento e do backup, estrutura do roteiro e encaixe A4. `npm run build` prepara os arquivos estáticos. Verifique também no navegador a importação com seus próprios documentos, o fluxo de backup/restauração e a legibilidade das imagens geradas.

## Estrutura

- `index.html`: entrada e estrutura geral.
- `src/app.js`: telas, importadores, PDF e interações.
- `src/core.js`: divisão de texto, prompts, roteiro e validação.
- `src/storage.js`: persistência local.
- `src/style.css`: interface responsiva.
- `scripts/build.mjs`: empacotamento estático.
- `tests/core.test.mjs`: verificações funcionais.

Código e identidade próprios, com organização funcional inspirada no fluxo analisado. Não inclui código, materiais privados ou ativos da plataforma de referência.

## Instalar diretamente no Cloudflare com BAT

Execute **INSTALAR_CLOUDFLARE.bat** no Windows com Node.js LTS 22 ou superior. Nao precisa de Python, Git, GAS ou Sheets para publicar.

O BAT pode ser executado sozinho: se os arquivos do sistema nao estiverem na mesma pasta, ele baixa a versao atual deste repositorio e extrai uma nova copia em `%LOCALAPPDATA%\Apostilando\downloads`. Se estiver dentro da pasta completa do repositorio, publica essa copia local.

O instalador executa `npm ci`, gera `dist`, abre o login oficial do Cloudflare com Wrangler e cria um projeto Pages com nome unico `apostilando-...`. Depois publica em producao. A URL real e exibida pelo Wrangler. Login e escolhas de conta sao feitos no seu computador.

O nome do projeto fica em `%USERPROFILE%\.apostilando\cloudflare.json`, sem senhas ou tokens. Nas proximas execucoes, o BAT atualiza o mesmo projeto; use a mesma conta Cloudflare. Uma falha interrompe o processo e mostra a etapa que precisa ser corrigida. Se a criacao ja tiver sido concluida, o nome e preservado para repetir a publicacao.

Esta e uma publicacao por Direct Upload. Ela nao configura deploy automatico a cada commit no GitHub. Execute novamente o instalador com os arquivos atualizados para publicar mudancas. O site fica acessivel pela URL do Pages; os documentos, projetos e imagens do usuario continuam apenas no navegador.
