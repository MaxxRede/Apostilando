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
2. Prepare de 1 a 100 páginas de conteúdo e revise os títulos e conteúdos. Capa, contracapa e síntese são extras.
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

## Revisão 1.1.0

- Planejamento manual com edição e validação de páginas sem conteúdo.
- Divisão por palavras, preservando integralmente o texto extraído e evitando páginas vazias quando há conteúdo suficiente.
- Roteiro completo de documentos reforça a preservação do texto sem tradução nem resumo.
- Upload, download e backup de foto/logo de referência (é necessário anexá-la também na IA externa).
- Impressão dos prompts com opção de salvar em PDF pelo navegador.
- Importação de imagens com ordenação numérica pelo nome; reordenação manual disponível.
- PNG e JPEG incorporados diretamente no PDF, preservando a qualidade original; WebP convertido em PNG.
- Leitor PDF avisa sobre páginas sem texto e PDFs protegidos. Fontes e mapas de caracteres incluídos no build.
- Favoritos preservados após reedição; arquivamento e restauração testados.
- Backups com validação de configurações, referências e imagens, sem substituir projetos existentes.
- Indicador de alterações pendentes e proteção contra ações concorrentes durante leitura/exportação.

### Verificação realizada

20 testes automatizados passam. Incluem importação de arquivos PDF e DOCX reais, TXT/MD, geração e releitura de PDF com 14 páginas A4, conversão WebP com adaptador, roteiro integral, validação de backup e fluxo de interface em DOM simulado: edição, cópia, impressão, salvamento, busca, duplicação, favoritos, arquivamento/restauração, backup/importação e importação/reordenação de PNGs.

A decodificação visual das imagens no teste de interface usa um adaptador simulado; o PDF final é criado e relido com bibliotecas reais. A janela de impressão e a área de transferência usam adaptadores no teste. Não houve inspeção visual em navegador real nem teste autenticado da publicação no Cloudflare. A geração de imagens continua externa; não há IA ou OCR ocultos. O uso do roteiro em lote no Flow depende dos recursos da conta e precisa de validação no próprio Flow.

## Ajuste de idioma e personagens (1.1.1)

Português do Brasil é o padrão dos novos projetos e o fallback de idioma ausente. Os prompts reforçam o idioma em todo texto visível e em cada página do roteiro. A seleção explícita de espanhol ou inglês continua disponível. Quando o texto importado estiver em outro idioma, a instrução pede tradução fiel para o idioma selecionado, preservando as informações; a extração local continua sem alterar o documento. Personagens devem ter aparência contemporânea e consistente, salvo tema histórico explicitamente solicitado. Copie novamente os prompts após atualizar: imagens já geradas no Flow não são alteradas automaticamente. As instruções reduzem divergências, mas o resultado da IA externa precisa ser revisado.

## Composição da apostila (1.2.0)

Marque Capa, Contracapa e Síntese final do aprendizado antes de planejar. Capa e síntese vêm marcadas em novos projetos; contracapa é opcional. A quantidade informada conta somente o conteúdo. Exemplo: 14 páginas de conteúdo com os três itens = capa + 14 páginas de conteúdo + síntese + contracapa, totalizando 17 páginas. O mínimo é uma página de conteúdo além dos itens selecionados.

O documento importado é distribuído integralmente entre as páginas de conteúdo. A síntese pede principais conceitos, habilidades, aplicação prática, checklist e autoavaliação, com base no material. Os prompts para capa e contracapa não incluem numeração visível. Em projetos já planejados, mudar os marcadores não apaga páginas: use Planejar páginas para aplicar a nova estrutura, após revisar o aviso de substituição. Os títulos e conteúdos continuam editáveis. Fichas e capas avulsas não usam esses marcadores.

## Integridade do texto e ajuste de tela (1.2.1)

A distribuição de documentos usa frases completas e preserva os caracteres extraídos. Quebras de linha dentro de frases extraídas de PDF não são usadas isoladamente como cortes de página. Quando não há blocos completos suficientes para preencher a quantidade solicitada, o sistema pede um total menor ou conteúdo adicional. Não modifica páginas já salvas automaticamente: replaneje a partir do texto original para aplicar a nova divisão, após exportar backup se houver edições manuais.

Os prompts pedem margens de 15 mm em A4, texto antes de ilustrações, fonte legível, frases completas e conferência da última palavra/linha de cada bloco. Em conteúdo gerado por tema, orientam concisão de 80 a 160 palavras por página; texto importado continua integral e pode exigir redistribuição. O alerta de densidade é uma estimativa local, não uma medição da imagem final. A interface ajusta controles, botões e textos longos à largura disponível.

O Flow pode ainda produzir erros de texto dentro de imagens; a instrução não garante correção tipográfica. Confira cada resultado. A alternativa para fidelidade tipográfica é compor texto como texto real e usar IA apenas nas ilustrações, recurso ainda fora desta versão.

## Nomes, imagens e PDF compacto (1.3.0)

Cada prompt inclui um nome sugerido, como `01_capa_curso.png`, `02_conteudo.png` e assim por diante. A lista pode ser baixada em TXT. O nome é uma instrução à ferramenta externa, não uma garantia de renomeação do Flow. Se o download vier com outro nome, renomeie mantendo o prefixo numérico. O nome de arquivo não deve ser desenhado na imagem.

Use **Subir imagens e montar PDF** depois de gerar as páginas. Selecione várias imagens ou arraste JPG, PNG e WebP à área indicada. A ordenação automática pelos nomes só é aplicada quando todos os arquivos têm prefixos de página reconhecíveis; nomes descritivos do Flow não são usados para inferir sequência. Você pode mudar a ordem pelas setas ou ordenar novamente pelos nomes. O sistema informa o total planejado e importado para ajudar a conferir faltantes e duplicatas.

**Compacto (recomendado)** é o padrão da exportação: mantém proporção, não amplia originais pequenos, limita o tamanho a aproximadamente 1191×1684 pixels e usa JPEG com qualidade 84%. Originais PNG/JPEG pequenos que já sejam mais leves podem ser preservados. Transparência compactada recebe fundo branco. O tamanho final depende das imagens e o modo compacto envolve perda de detalhes; confira o texto antes de compartilhar. **Qualidade original** incorpora PNG/JPEG sem reduzir e converte WebP em PNG. Imagens guardadas e backups continuam com os originais em ambos os modos.

O estilo **3D tipo Pixar (personagens originais)** descreve modelagem de animação cinematográfica, rostos expressivos, materiais suaves e iluminação de estúdio, mantendo personagens contemporâneos e adequados à idade do público. Não usa personagens existentes como modelos fixos. O Flow interpreta o prompt e não há envio automático a ele.

## Organizar e renomear as imagens (1.4.0)

Os nomes descritivos atribuídos pelo Flow, como `Woman_holding_tablet_2026...jpg`, não identificam com segurança a página correspondente. Ordená-los alfabeticamente pode embaralhar o material. A plataforma não lê as imagens para adivinhar essa correspondência.

1. Importe as imagens em Montar PDF.
2. Confira as miniaturas. Clique, segure e arraste uma imagem sobre a posição desejada. Também pode usar as setas ou o campo Posição no PDF.
3. A ordem exibida é a ordem usada na exportação do PDF e no ZIP numerado.
4. Clique em Baixar imagens numeradas (ZIP) para obter nomes reais como `01.jpg`, `02.png`, `03.jpg`, preservando as extensões e os bytes originais. Extraia esse ZIP para ver os arquivos organizados no Windows. Os arquivos antigos da pasta Downloads não são modificados.

O cartão exibe o nome original e o novo nome no ZIP. Uma coleção de 100 imagens usa `001` a `100` para manter a ordenação por nome. O botão de ordenação por prefixo aceita nomes como `01_capa`, `pagina_02` e `10_conteudo`. Se algum nome não identificar uma página, o sistema pede organização manual em vez de supor a sequência pelo assunto ou pela data.

## Imagens geradas no idioma errado (1.4.1)

A instrução de idioma agora é repetida dentro de cada página, explicitando que o idioma da conta ou de exemplos não substitui a escolha do usuário. Isso não garante que a IA externa obedeça. O Apostilando não detecta automaticamente o idioma dentro dos pixels nem altera imagens já geradas.

Em Montar PDF, confira o idioma alvo em destaque. Para uma imagem em inglês indevidamente, clique em **Corrigir idioma no Flow**, copie o comando, anexe a imagem original no Flow e solicite a edição. O comando pede tradução integral para o idioma selecionado, preservando o conteúdo, personagens, estilo e composição. Depois de conferir a imagem corrigida, use **Substituir imagem** no mesmo cartão para manter sua posição no PDF e no ZIP. O arquivo anterior não é alterado na sua pasta de downloads.

A função usa o idioma atual do projeto, inclusive se espanhol ou inglês tiverem sido escolhidos explicitamente. Revise essa seleção antes de copiar o comando. A correção no Flow pode consumir os recursos da sua conta naquele serviço e seu resultado deve ser conferido.

## Fonte e paginação padronizadas (1.5.0)

Os prompts agora usam um padrão fixo: Arial negrito 28 pt nos títulos, Arial negrito 18 pt nos subtítulos, Arial regular 12 pt no corpo e 10 pt nas legendas. Alinhamento à esquerda, título na mesma referência superior e entrelinha 1,35. O estilo da ilustração não muda a tipografia. As opções antigas de lettering e AUTO não são aplicadas aos novos prompts, inclusive em projetos antigos. A IA externa ainda pode não respeitar o pedido; isso não constitui composição tipográfica garantida no Apostilando.

**Paginação padronizada pelo sistema no PDF** vem habilitada: o exportador reserva uma faixa de rodapé e desenha texto real em 10 pt usando uma fonte padrão PDF compatível com a família escolhida (Helvetica para famílias sem serifa, Times para Georgia/Times New Roman e Courier para Courier New), centralizado horizontalmente e com a mesma coordenada vertical de 14 pt acima da borda inferior. Essa numeração não depende da IA. A sequência acompanha a posição física das imagens (02 para a segunda imagem, por exemplo). A imagem é ajustada na área restante sem cortes. Os tipos Capa e Contracapa do planejamento não recebem número; capas avulsas também não. Confirme que a ordem das imagens corresponde ao planejamento. É possível desabilitar a numeração pelo checkbox.

Novos prompts pedem que o Flow não desenhe números de página. Para imagens já geradas com fonte ou paginação irregular, clique em **Padronizar visual no Flow**, anexe a imagem original e use o comando de edição. Ele pede a família e os tamanhos fixos e a remoção apenas dos números de página, preservando os números do conteúdo. Depois confira e use Substituir imagem. O Apostilando não apaga automaticamente números ou muda as letras que já fazem parte dos pixels; a exportação não remove paginação desenhada anteriormente.

## Novo material (1.5.1)

O botão inicia outro projeto em branco no módulo atual, preservando antes o conteúdo do material anterior no Histórico. Quando há conteúdo sem título, atribui um nome temporário para salvá-lo. A ação retorna ao topo, posiciona o cursor no título e exibe confirmação. A partir do Histórico, Novo projeto abre uma apostila em branco. O novo formulário só entra no acervo quando houver conteúdo para salvar.

## Escolha da fonte e consistência (1.5.2)

Em Dê a sua cara ao material, use **Fonte de todas as páginas** para escolher Arial, Helvetica, Calibri, Verdana, Montserrat, Georgia, Times New Roman ou Courier New. A mesma família é aplicada às instruções de títulos, subtítulos, corpo e legendas em todos os prompts, com os tamanhos e alinhamentos uniformes já definidos. Não há mais obrigação de usar Arial: ela é apenas o padrão inicial e o fallback para projetos antigos sem essa escolha.

A seleção fica no projeto e no backup. Ao mudar a fonte, copie novamente os prompts ou use Padronizar visual no Flow com as imagens existentes. A composição das letras dentro da imagem depende do Flow; o PDF não troca automaticamente a fonte de textos que já fazem parte dos pixels. A paginação continua sob controle do exportador e na mesma posição.

## Biblioteca de estilos (1.6.0)

O seletor Estilo da ilustração tem 23 opções. Inclui Quadrinhos/HQ, Tirinhas, HQ brasileira com referência Turma da Mônica, Anime de aventura com referência ThunderCats, Cartoon satírico com referência Simpsons, Mangá, Anime contemporâneo, HQ de super-heróis, animação 2D com referência Disney, animação 3D com referência DreamWorks, 3D tipo Pixar, Aquarela, Giz/lápis, Recorte de papel, Massinha, Pixel art, Infográfico minimalista, Sketch/sketchnote, Realismo fotográfico e os estilos anteriores.

Cada seleção adiciona orientações próprias de traço, cor, acabamento e personagens ao prompt. As referências são direções visuais para personagens originais. O estilo deve ser mantido em todas as páginas, sem mudar a fonte e o idioma escolhidos pelo usuário. A fonte pode ser selecionada livremente no campo Fonte de todas as páginas. Escolha o estilo e copie novamente os prompts; imagens já geradas não mudam automaticamente. A interpretação visual continua a cargo da ferramenta externa.

## Prévia da fonte e páginas extras (1.7.0)

Abaixo de Fonte de todas as páginas, a prévia mostra título, subtítulo, parágrafo, números e acentos na família escolhida. A troca do seletor atualiza a visualização. Montserrat é fornecida junto ao sistema, sem CDN em execução. Arial, Helvetica, Calibri, Verdana, Georgia, Times New Roman e Courier New dependem da instalação no dispositivo; o sistema tenta verificar a disponibilidade e informa quando a prévia estiver usando uma alternativa. A aparência da imagem produzida pelo Flow não é garantida pela prévia local.

**Páginas de conteúdo** é a quantidade principal. Capa, contracapa e síntese são adicionadas por fora dessa quantidade. O cálculo aparece abaixo dos marcadores: por exemplo, 14 conteúdos + 3 extras = 17 páginas no PDF. O limite é 100 conteúdos e até três extras, com suporte a 103 imagens. O texto importado é dividido apenas nas páginas de conteúdo.

Projetos antigos mantêm exatamente as páginas já salvas. Quando abertos, o contador é ajustado para refletir a quantidade de páginas de conteúdo existentes, sem recriar ou apagar o material. Novos planejamentos seguem a regra de extras. A importação de backups aplica a mesma migração.


## Prévia dos estilos (1.8.0)

O seletor de estilo mostra uma amostra visual da mesma cena em cada técnica. Use as setas para percorrer os 23 estilos ou escolha pelo nome. Ampliar prévia abre a amostra maior. As imagens são exemplos ilustrativos, não uma simulação exata do Flow.


## Atualização garantida pelo instalador (1.8.1)

O BAT sempre baixa uma cópia atual do GitHub antes de publicar, inclusive quando executado numa pasta com arquivos antigos. A pasta original não é alterada. O nome do projeto Cloudflare é reutilizado. Confira a versão no terminal e no rodapé do site.


## Perfis profissionais (1.9.0)

Além de Qualquer assunto e Apostila escolar, há perfis para gestores, vendedores, corretores de imóveis, advogados, médicos, psicólogos e outros profissionais (campo livre). Cada perfil modifica o tom, a persona didática e as orientações nos prompts, com exemplos e cuidados pertinentes à área. O público informado prevalece. O texto importado é preservado. O perfil não altera a montagem do PDF nem a fonte ou estilo escolhidos. A opção Música e partituras foi removida; projetos anteriores migram para Qualquer assunto sem perder páginas.


## Mais estilos e nomes sequenciais (1.10.0)

Há 30 estilos, com Pixel art removido e oito novas técnicas com prévias: guache, óleo, xilogravura, low poly, line art, chibi, webtoon e retrofuturismo. Cada prompt individual começa pelo nome sugerido, como 01_Precificar.png e 02_Como_fazer.png. O Flow recebe instruções para usar o identificador também no download quando esse recurso estiver disponível. Se o Flow não nomear os arquivos, é necessário renomeá-los ou usar a ordenação manual e o ZIP numerado do Apostilando. Os identificadores não são desenhados na imagem.


## Fonte Auto (1.11.0)

Auto escolhe uma família entre Lato, Nunito e Open Sans, diferentes das oito fontes manuais. A escolha é estável por projeto e aparece na prévia; mudar tema, perfil ou estilo não troca a fonte. Ao voltar para Auto, o projeto mantém sua escolha. Os prompts de todas as páginas e de correção usam o nome concreto da família, nunca deixam o Flow escolher uma fonte por página. As três famílias incluem arquivos locais regulares e em negrito e são preservadas no backup.
