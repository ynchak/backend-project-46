### Tests and linter status:

[![Actions Status Hexlet](https://github.com/ynchak/backend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ynchak/backend-project-46/actions)
![CI workflow](https://github.com/ynchak/backend-project-46/actions/workflows/ci.yml/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/d42c020c6c3a0131cc90/maintainability)](https://codeclimate.com/github/ynchak/backend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d42c020c6c3a0131cc90/test_coverage)](https://codeclimate.com/github/ynchak/backend-project-46/test_coverage)

**Вычислитель отличий** – программа, определяющая разницу между двумя структурами данных.

Возможности утилиты:

- Поддержка разных входных форматов: `yaml`, `json`
- Генерация отчета в виде `plain text`, `stylish` и `json`

```console
# формат plain
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# формат stylish
gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```
