var myModule = (function () {
  
  //иницилизируем наш модкль
  var init = function () {
      _setUpListers();
  };
  // прослушиваем события
  var _setUpListers = function () {
     $('#add-button-project').on('click', _showModal);// открыть модальное окно
     $('#add-new-project').on('submit', _addProject); // добавление проекта
  };    
  // Работает модальное окно
  var _showModal = function (ev) {
      console.log('вызов окна добавление проекта');
      ev.preventDefault();// отмена стандартного действия элемента

      var divPopup = $('#add-project_pop_up'),
          form = divPopup.find('.form');

      divPopup.bPopup({
                speed: 650,
                transition: 'slideDown',
                onClose: function () {
                  form.find('.server-mes').text('').hide();
                }
          });
  };
  //Добавляем проект
  var _addProject = function (ev) {
      console.log('добавление проекта');
      ev.preventDefault();// отмена стандартного действия элемента
      //переменные
       var form = $(this),
           url = 'add-project.php',
           myServerGiveAnAnswer = _ajaxForm(form,url);

       myServerGiveAnAnswer.done(function(ans) {

        var successBox = form.find('.success-mes'),
            errorBox = form.find('.error-mes');
      if(ans.status === 'OK'){        
        errorBox.hide();
        successBox.text(ans.text).show();        
      }else{
        successBox.hide();
        errorBox.text(ans.text).show();
      }
      })
  };
    //Универсальная функция
    //Для ее работы используеться 
    // @form - форма
    // @url - адрес php
    //1.собирает данные из формы
    //2.провереряет данные формы
    //3.делает запрос на сервер и возвращает ответ с сервера
  var _ajaxForm = function(form,url){    

    // if(!valid) return false;

    data = form.serialize();

    // запрос на сервер
    var ajaxResult = $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: data,
    }).fail( function(ans){
       console.log('Ошибка в PHP');
       form.find('.error-mes').text('На сервере произошла ошибка').show();
    });

     return ajaxResult;
  };
// Возвращаем обьект (Публичные методы)
  return {
    init: init
  };
  
})();

myModule.init();