(function(){

    var states = [
        '',
        'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL',
        'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH',
        'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM',
        'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC',
        'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];


    var sizes = {
        Youth: ['Youth XS', 'Youth S', 'Youth M', 'Youth L', 'Youth XL'],
        Adult: ['Adult XS', 'Adult S', 'Adult M', 'Adult L', 'Adult XL',
                'Adult 2XL', 'Adult 3XL', 'Adult 4XL', 'Adult 5XL']
    };

    function populateStates(){
        var selector = document.getElementById('state');

        for(var state in states){
            var opt = document.createElement('option');
            opt.value = states[state];
            opt.innerHTML = states[state];
            selector.appendChild(opt);
        }
    }

    function populateSizes(){
        var htmlSelect = document.getElementById('size');
        let blankOpt = document.createElement('option');
        blankOpt.value = '';
        blankOpt.innerHTML = '';

        htmlSelect.appendChild(blankOpt);

        for(var group of Object.keys(sizes)){
            var category = document.createElement('optgroup');
            category.label = group;
            htmlSelect.appendChild(category);

            for(var size of Object.values(sizes[group])){
                // console.log(size);
                var opt = document.createElement('option');
                opt.value = (group.slice(0, 1) + '-' + size).toLowerCase();
                opt.innerHTML = size;
                category.appendChild(opt);
            }
        }
    }

    populateStates();
    populateSizes();
})();

