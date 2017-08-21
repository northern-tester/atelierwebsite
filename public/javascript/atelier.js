    function recaptcha_callback() {
       document.getElementById('cfpSubmit').disabled = false;
    }

    function recaptcha_expired_callback() {
       document.getElementById('cfpSubmit').disabled = true;
    }