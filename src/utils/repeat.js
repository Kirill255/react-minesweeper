import { List } from "immutable";

// генерирует какое-то значение n-раз, в нашем случае будет генерировать ячейки
export default function repeat(n, value) {
  const array = [];

  while (n--) {
    array.push(value);
  }

  return List(array);
}
