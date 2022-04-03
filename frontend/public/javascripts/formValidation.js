(function() {
  console.log('Initalising BS Validation')
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault()
        console.log('Doing BS Validation')
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault()
          registerNewUser()
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();




