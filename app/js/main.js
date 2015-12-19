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
		$('#send_message_mail').on('submit', _sendMail); // отправка формы на почту
		$('#fileupload').on('change', _changefileUpload); // файл загружен
		$('#autoriz').on('submit', _singUp); // добавление проекта
	};	
	var _sendMail = function (ev) {
      // console.log('почта');
      ev.preventDefault();// отмена стандартного действия элемента
      //переменные 
      var form = $(this);
           validation.validateForm(form);

  };
  var _singUp = function (ev) {
      // console.log('авторизация');
      ev.preventDefault();// отмена стандартного действия элемента
      //переменные 
      var form = $(this);
           validation.validateForm(form);

  };

	var _showModal = function (ev) {
      // console.log('вызов окна добавление проекта');
      ev.preventDefault();// отмена стандартного действия элемента

      var divPopup = $('#add-project_pop_up'),
          form = divPopup.find('.form');

      divPopup.bPopup({
                speed: 650,
                transition: 'slideDown',
                onClose: function () {
                  form
                    .find('input, textarea')
                    .not('input[type="file"], input[type="hidden"]')
                    .val('');
                  form
                    .find('.server-mes')
                    .text('')
                    .hide();
                  // console.log('стирание полей');
                  $('.qtip').remove();
      	     		  form
                    .find('.has-error')
                    .removeClass('has-error'); 
      	     		  form
                  .find('.error-mes, success-mes')
                  .text('')
                  .hide();
                }
          });
  };

	// Изменили файл аплоад (добавили файл в файлаплоад)
	var _changefileUpload = function (){
		var inputfile = $(this), // инпут type="file"
				name = inputfile.val(); // имя загруженного файла

        // console.log(name);
		$('#fileupload-text')
			.val(name) // 
			.trigger('hideTooltip')
			.removeClass('has-error'); 
	};

	  //Добавляем проект
  var _addProject = function (ev) {
      // console.log('добавление проекта');
      ev.preventDefault();// отмена стандартного действия элемента      
       var form = $(this),          
           url = 'add-project.php',
           myServerGiveAnAnswer = _ajaxForm(form, url);
      
       if (!validation.validateForm(form)) return false;

      var answerServer = _ajaxForm(form, url);
          answerServer.done(function (ans) {
        var successBox = form.find('.success-mes'),
            errorBox = form.find('.error-mes');
      if(ans.status === 'OK'){        
        errorBox.hide();
        successBox.text(ans.text).show();        
      }else{
        successBox.hide();
        errorBox.text(ans.text).show();
      }
      });       
       
  };

	var _ajaxForm = function(form, url){    

	    var data = form.serialize();
	    	
	    // запрос на сервер
	    return $.ajax({
	        url: url,
	        type: 'POST',
	        dataType: 'json',
	        data: data,
	    }).fail(function(ans){
	       // console.log('Ошибка в PHP');
	       form.find('.error-mes').text('На сервере произошла ошибка').show();
	    });   
	     
	  	};

	return {
		init: init
	};

})();

myModule.init();
