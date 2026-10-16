# Alterações

## 1.2.1

Distribui documentos por frases completas, sem cortar no meio de uma frase. Se faltarem blocos completos para a quantidade pedida, informa um total máximo em vez de fragmentar o texto. Reforça margens A4, área útil, corpo legível, prioridade do texto e revisão de palavras/linhas faltantes nos prompts. Acrescenta alerta de densidade acima de 1.400 caracteres ou 180 palavras por página. Corrige quebra de linhas, cartões, botões, modal e controles de seleção para a largura disponível. 32 testes aprovados; não houve verificação visual em navegador real ou geração de imagens no Flow.

## 1.2.0

Adiciona marcadores independentes para capa, contracapa e síntese final do aprendizado. A quantidade informada é o total de páginas, incluindo os itens escolhidos, com ao menos uma página de conteúdo. Ordem inicial: capa, conteúdo, síntese e contracapa. Textos importados são preservados nas páginas de conteúdo. A síntese individual recebe as páginas atuais como referência e pede conceitos, aplicação, checklist e autoavaliação. Capa e contracapa não têm numeração visível. As escolhas e os tipos das páginas são preservados em backup. 28 testes aprovados.

## 1.1.1

Reforça português do Brasil como idioma padrão e as regras de idioma em títulos, legendas, rótulos e textos visíveis. Aplica a instrução no prompt individual, em cada página do roteiro e na revisão final. Conteúdo de origem em outro idioma deve ser traduzido fielmente para o idioma selecionado, sem resumo ou perda de informações. Orienta personagens com roupas e ambientes contemporâneos, salvo contexto histórico explicitamente solicitado, mantendo a identidade entre páginas. Inclui quatro testes específicos; 24 testes no total.

## 1.1.0

Revisão funcional dos módulos de criação, documentos, imagens, PDF e acervo. Adiciona planejamento manual, foto/logo de referência e impressão dos prompts. Corrige preservação de favoritos, divisão de texto, roteiro integral de documentos e ordenação de imagens. Inclui avisos de extração parcial de PDF e validação mais rigorosa dos backups. Amplia a verificação para 20 testes.

Para atualizar um site instalado por Direct Upload, execute novamente `INSTALAR_CLOUDFLARE.bat` sozinho em uma pasta, ou baixe a versão atual do repositório e execute o BAT nela. O nome do projeto Cloudflare é reutilizado pela configuração local. Use a mesma conta Cloudflare e a mesma URL de produção para conservar o acesso aos dados locais existentes.
