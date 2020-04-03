const MATCH_LIST = {
  'there': 'their',
  'their': 'there',
  'they\'re': 'there',
  'There': 'Their',
  'Their': 'There',
  'They\'re': 'There',
  'THERE': 'THEIR',
  'THEIR': 'THERE',
  'THEY\'RE': 'THERE'
};

function transformTextNodes(node) {
  if (node.nodeType === Node.TEXT_NODE ) { //проверка что узел текстовый
    let arr = node.textContent.split(' '); //преобразовать текст в массив
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] != '') {
        for (const str of Object.keys(MATCH_LIST)) {
          if (arr[i].trim() == str) {
            arr[i] = MATCH_LIST[str];
            break;
          }
        }
      }
    }
    node.textContent = arr.join(' ');
  }

  for (const child of node.childNodes) {
    transformTextNodes(child);
  }
}


transformTextNodes(document.body);