(function(){
    let form = document.getElementById('order-form');
    let state = document.getElementById('state');
    let size = document.getElementById('size');
    let code = document.getElementById('code');
    let codeValid = false;

    const SAVE_KEYS = [
        'namedrop', 'size', 'name',
        'address1', 'address2', 'city',
        'state', 'zipcode', 'email', 'phone'
    ];



    // Update state validity on selection
    state.addEventListener('change', function(){
        validateState();
    });

    size.addEventListener('change', function(){
        validateSize();
    });

    form.addEventListener('submit', function(e){
        e.preventDefault();
        e.stopPropagation();
        clientValidate();
        submitForm();
    });

    window.addEventListener('load', function(){
        // Repopulate form values if they are saved
        let entry = getSavedFormEntriesObj();
        if(entry){
            populateFormElements(
                JSON.parse(entry)
            );
        }
    });




    function getSavedFormEntriesObj(){
        if(window.sessionStorage){
            // Returns null if !exist
            return sessionStorage.getItem('GSForm');
        } else {
            return false;
        }
    }

    function populateFormElements(entry){
        let keys = SAVE_KEYS;
        for(let k in keys){
            // Set retrieved value
            document.getElementById(keys[k]).value = entry[keys[k]];
        }
    }




    function clientValidate(){
        validateSize();
        validateState();
        form.classList.add('was-validated');
    }

    function submitForm(){
        if(form.checkValidity() === true){
            // todo - delete stored form data on success page
            // Save values to repopulate form if submission fails
            if(window.sessionStorage){
                sessionStorage.setItem(
                    'GSForm',
                    JSON.stringify(makeFormEntriesObj())
                );
            }
            form.submit();
       }
    }

    function makeFormEntriesObj(){
        let entry = {};
        let keys = SAVE_KEYS;
        for(let k in keys){
            entry[keys[k]] = document.getElementById(keys[k]).value;
        }

        return entry;
    }



    // todo - make validator functions for all fields
    function validateState(){
        if(state.value === ''){
            state.setCustomValidity('No state');
        } else {
            state.setCustomValidity('');
        }
    }

    function validateSize(){
        if(size.value === ''){
            size.setCustomValidity('No size selected');
        } else {
            size.setCustomValidity('');
        }
    }
})();