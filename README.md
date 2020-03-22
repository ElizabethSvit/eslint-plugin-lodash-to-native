# eslint-plugin-lodash-to-native

ESLint плагин, который находит использование функции `_.map`, например `_.map(collection, fn)`, и, если это возможно, предлагает заменить его на использование нативного Array#map.

Структура репозитория:

```
lib/
    rules/
        map.js <- файл правила
tests/
    lib/
       rules <- тесты
index.js <- список правил и конфигураций
package.json <- описание npm пакета
```

### Установка
При использовании в каком-либо проекте плагин/правило устанавливается через `npm install -S github.com/MyName/eslint-plugin-lodash-to-native.git` и подключается в `.eslintrc.js` так:
  ```
  "plugins": [
      "lodash-to-native"
  ],
  "rules": {
      "lodash-to-native/map": "warn"
  },
  ```
  
### Тестирование
Для запуска тестов нужно выполнить команду `npm test`. 
