# Apostilando

Projeto de ferramenta pessoal para planejar apostilas visuais, preparar prompts de imagens e organizar as páginas em PDF.

## Estado atual

Repositório inicializado com o escopo. A aplicação ainda não foi implementada.

## Primeira versão planejada

- Uso individual, sem login, planos, cobrança ou controle de créditos.
- Sem Google Apps Script e sem Google Sheets.
- Interface em português do Brasil.
- Entrada por tema, texto ou documentos PDF, DOCX, TXT e Markdown. PDFs digitalizados exigirão OCR, fora do escopo inicial.
- Planejamento editável de páginas: capa, conteúdo, atividades e revisão.
- Configuração de público, objetivo, idioma, estilo visual e quantidade de páginas.
- Prompts individuais com instruções visuais comuns para manter consistência.
- Botão para copiar um roteiro completo, contendo todas as páginas numeradas, para testar com o Google Flow Agent.
- Fichas de estudo, resumos, infográficos, capas e criativos.
- Importação de imagens JPG, PNG e WebP, ordenação das páginas e exportação de PDF A4 sem cortes.
- Salvamento local no navegador e exportação/importação dos projetos para backup.

## Fluxo previsto

1. Importar o conteúdo ou informar um tema.
2. Revisar o conteúdo e a distribuição entre páginas.
3. Preparar os prompts e copiar individualmente ou como roteiro completo.
4. Gerar as imagens no Google Flow ou em outra ferramenta escolhida pelo usuário.
5. Importar as imagens, revisar a ordem e exportar o PDF.

## Limites e validações pendentes

- A geração automática de imagens não integra a primeira versão.
- Não há integração automática confirmada com o Google Flow.
- O roteiro único será uma forma de exportar instruções; não garante que o Flow gere todas as páginas em uma única solicitação.
- Validar primeiro três páginas distintas no Flow Agent antes de adotar o fluxo para apostilas maiores.
- O uso do Flow segue os limites e custos da conta do usuário.
- A divisão de um documento em páginas precisa preservar o texto e permitir revisão; não deve omitir conteúdo silenciosamente.
- Dados locais podem ser perdidos ao limpar o navegador. O backup em arquivo deve incluir o necessário para restaurar o projeto.

## Evolução futura

Geração de imagens dentro da ferramenta por integração autorizada com API, armazenamento remoto opcional e recursos comerciais apenas se necessários.
