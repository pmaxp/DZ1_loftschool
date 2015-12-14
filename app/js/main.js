// Мой модуль
var myModule = (function () {

	// Инициализация проекта
	var init = function(){
		_setUpListners();
  };

  // Прослушка событий
	var _setUpListners = function (){
		$('#add-button-project').on('click', _showModal);// открыть модальное окно
		$('#add-new-project').on('submit', _addProject); // добавление проекта
		$('#send_message_mail').on('submit', _sendMail); // добавление проекта
		$('#fileupload').on('change', _changefileUpload);
		$('#autoriz').on('submit', _sendMail); // добавление проекта
	};
	var _sendMail = function (ev) {
      console.log('отправка на почту');
      ev.preventDefault();// отмена стандартного действия элемента
      //переменные 
      var form = $(this),
           url = 'add-project.php',
           myServerGiveAnAnswer = _ajaxForm(form, url);

  };
	var _sendMail = function (ev) {
      console.log('авторизация');
      ev.preventDefault();// отмена стандартного действия элемента
      //переменные 
      var form = $(this),
           url = 'add-project.php',
           myServerGiveAnAnswer = _ajaxForm(form, url);

  };

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
                  console.log('стирание полей');
                  form.find('input, textarea').val('');
                }
          });
  };

	// Изменили файл аплоад (добавили файл в файлаплоад)
	var _changefileUpload = function (){
		var input = $(this), // инпут type="file"
				name = input[0].files[0].name; // имя загруженного файла
		$('#fileupload-text')
			.val(name) // 
			.trigger('hideTooltip')
			.removeClass('has-error'); 
	};

	  //Добавляем проект
  var _addProject = function (ev) {
      console.log('добавление проекта');
      ev.preventDefault();// отмена стандартного действия элемента
      //переменные
       var form = $(this),
           url = 'add-project.php',
           myServerGiveAnAnswer = _ajaxForm(form, url);

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

	var _ajaxForm = function(form, url){    

    	 if (!validation.validateForm(form)) return false;

	    var data = form.serialize();

	    // запрос на сервер
	    return $.ajax({
	        url: url,
	        type: 'POST',
	        dataType: 'json',
	        data: data,
	    }).fail( function(ans){
	       console.log('Ошибка в PHP');
	       form.find('.error-mes').text('На сервере произошла ошибка').show();
	    });

	     
	  	};

	return {
		init: init
	};

})();

myModule.init();
