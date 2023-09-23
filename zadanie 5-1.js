// Создаем парсер
const parser = new DOMParser();

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

// Парсинг XML
const xmlDom = parser.parseFromString(xmlString, 'text/xml');

// Получение всех DOM нод
const studentNode = xmlDom.querySelector('student');
const nameNode = studentNode.querySelector("name")
const firstNameNode = nameNode.querySelector("first")
const secondNameNode = nameNode.querySelector("second")
const langAttr = nameNode.getAttribute('lang');
const ageNode = studentNode.querySelector("age")
const profNode = studentNode.querySelector('prof');

const result = {
    firstName: firstNameNode.textContent,
    secondName: secondNameNode.textContent,
    age: Number(ageNode.textContent),
    prof: profNode.textContent,
    lang: langAttr,
};

console.log("result", result);