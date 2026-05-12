# Resumo sobre CSS

## O que é CSS

CSS (Cascading Style Sheets) é uma linguagem utilizada para estilizar páginas da web. Enquanto o HTML é responsável por estruturar o conteúdo de um site, como títulos, parágrafos, imagens e links, o CSS é usado para definir a aparência desses elementos. Com o CSS é possível alterar cores, tamanhos, espaçamentos, alinhamentos e organizar melhor o layout de uma página, deixando o site mais bonito e fácil de usar.

---

## Uso de Arquivo Externo (style.css)

Uma forma recomendada de usar CSS é através de um arquivo externo chamado **style.css**. Esse arquivo é conectado ao HTML usando a tag `<link>` dentro da parte `<head>` da página.

Utilizar um arquivo externo é importante porque:

- Mantém o código mais organizado.
- Separa a estrutura (HTML) do estilo (CSS).
- Permite reutilizar o mesmo estilo em várias páginas.
- Facilita a manutenção do site.

---

## Modelo de Caixa (Box Model)

No CSS, todos os elementos da página funcionam como se fossem caixas. Esse conceito é chamado de **Box Model**.

Cada caixa possui algumas partes principais:

- **Content:** é o conteúdo do elemento, como texto ou imagem.
- **Padding:** é o espaço interno entre o conteúdo e a borda.
- **Border:** é a borda que envolve o elemento.
- **Margin:** é o espaço externo entre um elemento e outro.

### Diferença entre Margin e Padding

- **Padding:** cria espaço **dentro** do elemento.
- **Margin:** cria espaço **fora** do elemento, separando-o de outros elementos.

---

## Principais Propriedades do CSS

### color
Define a **cor do texto**.

### background-color
Define a **cor de fundo** de um elemento.

### margin
Controla o **espaçamento externo** entre os elementos da página.

### padding
Controla o **espaçamento interno** entre o conteúdo e a borda do elemento.

### display: flex
Faz parte do **Flexbox** e é usado para organizar elementos dentro de um container. Ele facilita o alinhamento horizontal e vertical dos itens e ajuda a criar layouts mais modernos.

---

## Uso de Classes no CSS

As **classes** são usadas para estilizar elementos específicos do HTML sem afetar todos os elementos da página.

No HTML usamos o atributo `class` para identificar um elemento. No CSS utilizamos um **ponto (.) antes do nome da classe** para aplicar o estilo.

O uso de classes traz algumas vantagens:

- Melhor organização do código.
- Possibilidade de reutilizar estilos.
- Facilita a manutenção do site.
- Evita repetição de código.

---

## Conclusão

O CSS é fundamental no desenvolvimento web, pois permite controlar a aparência visual das páginas. Com ele é possível deixar um site mais organizado, bonito e fácil de navegar. Entender conceitos como o **Box Model**, as **principais propriedades de estilo** e o **uso de classes** ajuda a criar páginas mais profissionais e bem estruturadas.
