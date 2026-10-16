# Alterações

## 1.8.0

Adiciona amostras visuais dos 23 estilos de ilustração, com a mesma cena para comparação, navegação anterior/próximo e ampliação. As prévias são ilustrativas e não garantem o resultado do Flow.

## 1.7.0

Adiciona visualizador da fonte escolhida com título, subtítulo, parágrafo, números e acentos. Montserrat é incluída localmente em 400/700; fontes de sistema ausentes são sinalizadas. A quantidade informada agora conta somente páginas de conteúdo: capa, síntese e contracapa são extras. 14 conteúdos com três extras geram 17 páginas. Suporta até 100 conteúdos + 3 extras, preserva textos e migra o contador de projetos antigos sem alterar suas páginas. 53 testes aprovados.

## 1.6.0

Amplia para 23 estilos, incluindo quadrinhos, tirinhas, HQ brasileira com referência Turma da Mônica, aventura com referência ThunderCats, cartoon com referência Simpsons, mangá, anime, super-heróis, referências Disney/DreamWorks, aquarela, lápis, papel recortado, massinha, pixel art, infográfico, sketchnote e fotografia. Cada opção produz orientação visual própria e exige consistência entre páginas, mantendo a fonte e o idioma escolhidos. Inclui as correções de Novo material e seleção de fonte descritas em 1.5.1/1.5.2. A espera do teste de interface agora observa a conclusão da operação em vez de presumir que o PDF estará pronto em um intervalo fixo. 50 testes aprovados.

## 1.5.2

Restaura escolha de família tipográfica pelo usuário: Arial, Helvetica, Calibri, Verdana, Montserrat, Georgia, Times New Roman e Courier New. A família selecionada se repete nos prompts individuais, no roteiro e no comando de correção visual; tamanhos e alinhamentos permanecem uniformes. A seleção é salva no projeto e no backup. Inclui a correção do botão Novo material descrita em 1.5.1. 48 testes aprovados.

## 1.5.1

Melhora Novo material: preserva o trabalho atual antes de abrir um formulário em branco, retorna ao topo, foca o título e confirma a ação. Trabalhos com conteúdo sem título recebem um nome temporário antes do salvamento. A criação a partir do Histórico também abre e foca a tela correta. 46 testes passam com novas verificações de foco, limpeza e preservação do projeto anterior.

## 1.5.0

Define padrão tipográfico fixo Arial nos prompts: títulos 28 pt, subtítulos 18 pt, corpo 12 pt e legendas 10 pt; remove escolhas de lettering/AUTO da interface. Novas imagens são solicitadas sem paginação desenhada. O PDF aplica numeração real de 10 pt no centro do rodapé, na mesma coordenada vertical, reservando espaço sem cortar a imagem. Capa/contracapa seguem os tipos das páginas planejadas e não recebem números. Adiciona comando Padronizar visual no Flow para corrigir fontes de imagens existentes e remover paginação desenhada. 46 testes aprovados, incluindo extração da posição e tamanho da numeração em PDF real.

## 1.4.1

Repete a escolha de idioma explicitamente dentro de cada página do roteiro. Exibe o idioma alvo em Montar PDF e adiciona Corrigir idioma no Flow: comando de edição que traduz integralmente o texto da imagem anexada, preservando personagens e composição. Adiciona Substituir imagem no mesmo cartão, sem mudar a posição no PDF. Não realiza tradução automática nem leitura OCR; o resultado do Flow precisa de conferência. 43 testes aprovados.

## 1.4.0

Permite clicar, segurar e arrastar miniaturas para mudar a ordem do PDF. Acrescenta campo de posição por imagem e ZIP com nomes 01, 02, 03 seguindo a sequência escolhida, preservando bytes e extensões originais. Nomes descritivos do Flow não são ordenados alfabeticamente para inferir sequência. Ordenação automática só é aplicada quando todas as imagens têm prefixos de página reconhecíveis. Coleções de 100 páginas usam três dígitos. 41 testes aprovados, incluindo arraste em DOM simulado, posição, exportação e releitura de ZIP; não houve teste visual no navegador publicado.

## 1.3.0

Prompts individuais e roteiros incluem nomes de arquivo com prefixos 01, 02, 03 e título, além de lista TXT dos nomes. Adiciona estilo 3D tipo Pixar com personagens originais e contemporâneos. Destaca a importação de imagens, permite arrastar e soltar, ordena por nome e avisa diferenças entre quantidade de imagens e páginas. Adiciona PDF compacto por padrão, com limite A4 aproximado de 144 dpi e JPEG 84%, preservando os originais; qualidade original permanece disponível. 37 testes aprovados.

## 1.2.1

Distribui documentos por frases completas, sem cortar no meio de uma frase. Se faltarem blocos completos para a quantidade pedida, informa um total máximo em vez de fragmentar o texto. Reforça margens A4, área útil, corpo legível, prioridade do texto e revisão de palavras/linhas faltantes nos prompts. Acrescenta alerta de densidade acima de 1.400 caracteres ou 180 palavras por página. Corrige quebra de linhas, cartões, botões, modal e controles de seleção para a largura disponível. 32 testes aprovados; não houve verificação visual em navegador real ou geração de imagens no Flow.

## 1.2.0

Adiciona marcadores independentes para capa, contracapa e síntese final do aprendizado. A quantidade informada é o total de páginas, incluindo os itens escolhidos, com ao menos uma página de conteúdo. Ordem inicial: capa, conteúdo, síntese e contracapa. Textos importados são preservados nas páginas de conteúdo. A síntese individual recebe as páginas atuais como referência e pede conceitos, aplicação, checklist e autoavaliação. Capa e contracapa não têm numeração visível. As escolhas e os tipos das páginas são preservados em backup. 28 testes aprovados.

## 1.1.1

Reforça português do Brasil como idioma padrão e as regras de idioma em títulos, legendas, rótulos e textos visíveis. Aplica a instrução no prompt individual, em cada página do roteiro e na revisão final. Conteúdo de origem em outro idioma deve ser traduzido fielmente para o idioma selecionado, sem resumo ou perda de informações. Orienta personagens com roupas e ambientes contemporâneos, salvo contexto histórico explicitamente solicitado, mantendo a identidade entre páginas. Inclui quatro testes específicos; 24 testes no total.

## 1.1.0

Revisão funcional dos módulos de criação, documentos, imagens, PDF e acervo. Adiciona planejamento manual, foto/logo de referência e impressão dos prompts. Corrige preservação de favoritos, divisão de texto, roteiro integral de documentos e ordenação de imagens. Inclui avisos de extração parcial de PDF e validação mais rigorosa dos backups. Amplia a verificação para 20 testes.

Para atualizar um site instalado por Direct Upload, execute novamente `INSTALAR_CLOUDFLARE.bat` sozinho em uma pasta, ou baixe a versão atual do repositório e execute o BAT nela. O nome do projeto Cloudflare é reutilizado pela configuração local. Use a mesma conta Cloudflare e a mesma URL de produção para conservar o acesso aos dados locais existentes.
