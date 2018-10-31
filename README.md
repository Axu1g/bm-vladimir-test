# Тестовое задание
## Привет!
Думал, думал, в итоге придумал дать такое задание. Надо будет закомментировать код и сделать несколько улучшений.

Это фрагмент кода из проекта, описывающий модель и логику поведения иодели опросов.

### Стек, используемый в данном отрезке кода:

1. node 8.11.2
2. mongodb 3.6
3. https://github.com/posquit0/koa-rest-api-boilerplate - Koa-rest-boilerplate
4. http://mongoosejs.com/ – (абстракция над MongoDB, с которой мы работаем в рамках проекта)
5. https://lodash.com/docs/4.17.4
6. http://ramdajs.com/ – библиотека с набором функций для ФП

### Как запустить

```
git clone https://github.com/pdll/bm-vladimir-test.git
yarn
yarn start
```

Сервер запускается на http://localhost:7070

База данных ожидается по адресу

```
mongodb://127.0.0.1:27017/vlad-test
```

### Задача

1. В папке app/models закомментировать код (так, чтобы любой желающий мог понять что происходит)
2. В той же папке
    1. В модели Poll добавить метод, который аггрегирует данные по опросам для определенного пользователя (со списков вариантов ответа и с количеством голосов для каждого)
    2. Добавить в API (/app/routes.js) endpoint, который будет обращаться к жтому методу и возвращать результат выполнения
3. Если хватит рвения
    1. Добавить в модель Poll индикатор, говорящий о том, что опрос завершен. Если этот индикатор равен true – запрещать голосовать за варианты ответа в этом опросе.
    2. Добавить поле, в которое будет записан выйгравший вариант ответа на вопрос (его _id) при изменении индикатора из прошлого пункта на true
    3. Добавить в API endpoint, закрывающий опрос. Резултатом запроса должен быть получившийся объект poll

### API

API находится в файле /app/routes.js

Контроллер API находится в файле /app/controllers/home.js

```
GET /

/**
* query parameters:
* pollId – required – _id of desired poll
* userId - optional - Number – _id of user
*/
```
Возвращает информацию об опросе с _id = pollId

```
POST /create

/**
* body parameters:
* userId - Number – required – user _id - указывай какой хочешь
* postId – Number – required – post _id - указывай какой хочешь
* options - [String] – required – массив вариантов отвера на опрос - список строк
* title – String – required – название опроса
*/
```
Создает опрос с введенными параметрами. Возвращает информацию о созданном опросе.

```
POST /poll/:pollId

/**
* url parameters:
* pollId – _id опроса
*
* body parameters:
* userId - Number – required - user _id - указывай какой хочешь
* idArray – [ObjectId] – required – список _id вариантов ответа на опрос (_id берутся из базы, либо из результата выдачи метода GET /)
*/
```
Добавляет голоса вариантам ответа на опрос.

```
POST /poll/:pollId/close

/**
* url parameters
* pollId - _id опроса
*/
```
Закрывает опрос

```
GET /user/:userId/votes

/**
* url parameters
* userId - id юзера
*/
```
Возвращает голоса пользователя везде где он участвовал
