// Итераторы
// Конспект по статье https://doka.guide/js/iterator/

// =============================================
// 1. Что такое итератор
// =============================================
// Итератор - это объект, у которого есть метод next(),
// и каждый вызов next() возвращает СЛЕДУЮЩИЙ элемент последовательности.
//
// next() возвращает объект из ДВУХ полей:
//   { value: <текущий элемент>, done: <boolean - закончили или нет> }
//
// Когда done = true, последовательность исчерпана.

// =============================================
// 2. Простейший итератор вручную
// =============================================
// Превратим обычный массив в итератор.

type IteratorResult<T> = { value: T; done: false } | { value: undefined; done: true };

const makeArrayIterator = <T>(arr: T[]) => {
  let index = 0;
  return {
    next(): IteratorResult<T> {
      if (index < arr.length) {
        return { value: arr[index++], done: false };
      }
      return { value: undefined, done: true };
    },
  };
};

const it = makeArrayIterator([10, 20, 30]);
console.log(it.next()); // { value: 10, done: false }
console.log(it.next()); // { value: 20, done: false }
console.log(it.next()); // { value: 30, done: false }
console.log(it.next()); // { value: undefined, done: true }
console.log(it.next()); // { value: undefined, done: true } - дальше тоже done

// Это и есть "итератор-протокол". Любой объект с таким next() - итератор.

// =============================================
// 3. Iterable - умеющий "отдать итератор"
// =============================================
// Чтобы объект можно было использовать в for...of, spread'е, деструктуризации -
// он должен быть ИТЕРИРУЕМЫМ (iterable).
//
// Iterable - это объект, у которого есть СПЕЦИАЛЬНЫЙ метод
// [Symbol.iterator](), возвращающий итератор.
//
// Symbol.iterator - встроенный уникальный ключ. Не строка, не число.
// Поэтому метод не виден в обычном for...in или Object.keys.

// =============================================
// 4. Встроенные iterable'ы
// =============================================
// Array, String, Map, Set, NodeList уже реализуют Symbol.iterator.
// Поэтому работают в for...of и spread автоматически.

const arr = [1, 2, 3];
const arrIter = arr[Symbol.iterator](); // получаем встроенный итератор
console.log(arrIter.next()); // { value: 1, done: false }
console.log(arrIter.next()); // { value: 2, done: false }
console.log(arrIter.next()); // { value: 3, done: false }
console.log(arrIter.next()); // { value: undefined, done: true }

// Когда ты пишешь "for (const x of arr)" - JS под капотом делает примерно так:
const itManual = arr[Symbol.iterator]();
let step = itManual.next();
while (!step.done) {
  console.log("step value:", step.value);
  step = itManual.next();
}

// =============================================
// 5. Свой iterable - диапазон чисел
// =============================================
// Сделаем объект, который можно перебрать как range(1, 5) = [1, 2, 3, 4, 5].

const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next(): { value: number; done: boolean } {
        if (current <= last) {
          return { value: current++, done: false };
        }
        return { value: 0, done: true };
      },
    };
  },
};

for (const num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}

// Поскольку объект iterable - работает и spread:
console.log([...range]); // [1, 2, 3, 4, 5]

// =============================================
// 6. Генераторы - простой способ сделать итератор
// =============================================
// Писать next/done вручную - громоздко. Есть встроенный механизм:
// функции-ГЕНЕРАТОРЫ. Объявляются через "function*" (со звездочкой)
// и используют слово "yield" для отдачи значения.
//
// Каждый yield "приостанавливает" функцию и возвращает значение.
// Следующий вызов next() возобновляет с того же места.

function* countToThree(): Generator<number> {
  yield 1;
  yield 2;
  yield 3;
}

const g = countToThree();
console.log(g.next()); // { value: 1, done: false }
console.log(g.next()); // { value: 2, done: false }
console.log(g.next()); // { value: 3, done: false }
console.log(g.next()); // { value: undefined, done: true }

// Тип Generator<number> - встроенный в TS тип для генераторов.

// Генератор УЖЕ iterable - работает в for...of и spread'е без доп. кода:
for (const n of countToThree()) {
  console.log(n); // 1, 2, 3
}
console.log([...countToThree()]); // [1, 2, 3]

// =============================================
// 7. Range через генератор - тот же пример, но проще
// =============================================
function* rangeGen(from: number, to: number): Generator<number> {
  for (let i = from; i <= to; i++) {
    yield i;
  }
}

console.log([...rangeGen(1, 5)]);   // [1, 2, 3, 4, 5]
console.log([...rangeGen(10, 13)]); // [10, 11, 12, 13]

// Сравни с разделом 5 - в 4 раза короче. Поэтому в реальном коде
// итераторы почти всегда пишут через генераторы.

// =============================================
// 8. Бесконечные итераторы
// =============================================
// Генератор может выдавать значения ВЕЧНО - памяти он при этом не ест,
// потому что значения создаются ПО ЗАПРОСУ (lazy).

function* infiniteCounter(): Generator<number> {
  let n = 0;
  while (true) {
    yield n++;
  }
}

const counter = infiniteCounter();
console.log(counter.next().value); // 0
console.log(counter.next().value); // 1
console.log(counter.next().value); // 2
// и так бесконечно

// Чтобы не повесить процесс - в for...of надо ставить break:
let i = 0;
for (const n of infiniteCounter()) {
  if (i++ >= 5) break;
  console.log("inf:", n); // 0, 1, 2, 3, 4
}

// =============================================
// 9. yield* - делегирование другому iterable
// =============================================
// Внутри генератора можно "развернуть" другой iterable через "yield*".

function* combined(): Generator<number> {
  yield 0;
  yield* rangeGen(1, 3); // отдает 1, 2, 3
  yield* [10, 20];       // отдает 10, 20 - массив тоже iterable
  yield 999;
}

console.log([...combined()]); // [0, 1, 2, 3, 10, 20, 999]

// =============================================
// 10. TS-специфика: типы Generator и Iterable
// =============================================
// В TS есть несколько встроенных интерфейсов:
//   Iterator<T>          - что-то с методом next(): { value: T, done }
//   Iterable<T>          - что-то с методом [Symbol.iterator]()
//   IterableIterator<T>  - и то и другое (как все встроенные)
//   Generator<T>         - то, что возвращает function*

// Самый полезный для нас - Iterable<T> в параметрах функций:
const sumAny = (items: Iterable<number>): number => {
  let total = 0;
  for (const n of items) total += n;
  return total;
};

// Теперь функция принимает ВСЕ, что итерируется:
console.log(sumAny([1, 2, 3]));                    // массив - 6
console.log(sumAny(new Set([1, 2, 3])));           // Set - 6
console.log(sumAny(rangeGen(1, 5)));               // генератор - 15
console.log(sumAny([...rangeGen(1, 3), 10, 20]));  // комбо - 36

// Если бы написали "items: number[]" - принимался бы только массив.
// Iterable<number> - гораздо гибче.

// =============================================
// 11. Где iterable'ы реально пригождаются
// =============================================
// 1) Lazy-вычисления больших последовательностей: вместо генерации
//    миллиона чисел в массив - генератор отдает их по одному.
//
// 2) Бесконечные потоки данных (числа Фибоначчи, ID, события).
//
// 3) Свои коллекции (дерево, граф, очередь) можно сделать iterable
//    и сразу получить for...of, spread, деструктуризацию бесплатно.
//
// 4) Чтение больших файлов/потоков: каждый yield - следующая порция.

// Маленький пример - первые N чисел Фибоначчи:
function* fibonacci(): Generator<number> {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const takeN = <T>(iter: Iterable<T>, n: number): T[] => {
  const result: T[] = [];
  let count = 0;
  for (const value of iter) {
    if (count++ >= n) break;
    result.push(value);
  }
  return result;
};

console.log(takeN(fibonacci(), 10)); // [0,1,1,2,3,5,8,13,21,34]

// =============================================
// Итог
// =============================================
// - Итератор - объект с методом next() -> { value, done }
// - Iterable - объект со скрытым методом [Symbol.iterator]()
// - Все встроенные коллекции уже iterable
// - Генератор (function* + yield) - простой способ создать итератор
// - Генераторы вычисляются "лениво" - идеально для больших/бесконечных
//   последовательностей
// - В TS принимай "Iterable<T>" в параметрах - универсальнее массива
