import ConsoleFacade, { Color } from './ConsoleFacade';

const loremText =
  'Contrary to popular belief, Lorem Ipsum is not simply random text.\n' +
  'It has roots in a piece of classical Latin literature from 45 BC,\n' +
  'making it over 2000 years old. Richard McClintock, a Latin\n' +
  'professor at Hampden-Sydney College in Virginia, looked up one of\n' +
  'the more obscure Latin words, consectetur, from a Lorem Ipsum\n' +
  'passage, and going through the cites of the word in classical\n' +
  'literature, discovered the undoubtable source. Lorem Ipsum\n' +
  'comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum\n' +
  'et Malorum" (The Extremes of Good and Evil) by Cicero, written in\n' +
  '45 BC. This book is a treatise on the theory of ethics, very popular\n' +
  'during the Renaissance. The first line of Lorem Ipsum, "Lorem\n' +
  'ipsum dolor sit amet..", comes from a line in section 1.10.32.\n';

// returns random color from the Color enumeration
const getRandomColor = (): Color => {
  const colors = Object.values(Color).filter(color => typeof color !== 'string');
  const randomColor = colors[Math.floor(Math.random() * colors.length)] as Color;

  return randomColor;
}

(() => {
  // create facade instance that wraps Console System
  const consoleFacade = new ConsoleFacade();

  // print the original text line by line using random colors
  for (const line of loremText.split('\n')) {
    consoleFacade.printLine(line, getRandomColor());
  }
})();
