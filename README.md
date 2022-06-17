Есть проект, в который нужно добавить переводы. Никакой острой необходимости нет, но вот решили, что негоже именам кнопок в шаблонах хардкодить, давайте их куда-нибудь в константы да и вынесем. Проект на nx и весь функционал в библиотеках, соответственно переводить нужно либы. Тут и проблема. 

## Шаги к воспроизведению:

В принципе коммиты разбиты на шаги к воспроизведению и я старался там описать подробнее. 

Но добавлю и здесь:

- Создаем новый проект ангулар - `ng new library-localize`. Обращаем внимание, что на этом шаге angular.json уже создается с конфигом переводов для апликейшина library-localize

  ```typescript
  "extract-i18n": {
    "builder": "@angular-devkit/build-angular:extract-i18n",
    "options": {
      "browserTarget": "library-localize:build"
    }
  },
  ```

- Создаем библиотеку `ng g library app`. Библиотека создается без конфигурации переводов.

- Добавляем `ng add @angular/localize`

- В принципе сейчас уже можно скопировать конфиг из первого шага в библиотеку с `"browserTarget": "lib:build"` и получить ошибку, вызвав `ng run lib:extract-i18n`  Это сделано в ветке quick_reproduction. Но в основной ветке я еще немного поменял конфиг, указав пути к локалям.

   И все-таки тут 

  ```typescript
   ng run lib:extract-i18n
  ⠋ Generating browser application bundles (phase: setup)...An unhandled exception occurred: The "path" argument must be of type string. Received undefined
  See "/tmp/ng-kcD88N/angular-errors.log" for further details.
  
  ```

  ---
  

  Чисто глядя в angular-errors.log, я увидел, что собственно билдер @angular-devkit/build-angular:extract-i18n берёт buildOptions.outputPath и если этого параметра нет - то вылетает ошибка. Таким образом похоже, что build-angular:extract-i18n заточен чисто под билдеры апликейшинов, а вот @angular-devkit/build-angular:ng-packagr или @nrwl/angular:ng-packagr-lite не сработают. 

  Так что же делать, как правильно переводить библиотеки? В nx/nrwl же весь код в них. Ну не может же такого быть, что переводы работают только в апликейшинах, но не в либах. 
