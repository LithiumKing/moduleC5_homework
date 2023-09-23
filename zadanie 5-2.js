const jsonString = `
{
  "list": [
    {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
    },
    {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
    }
  ]
}
`;

// Преобразование JSON в JS-объект с использованием JSON.parse()
const jsObject = JSON.parse(jsonString);

console.log(jsObject);