(function(){

    let states = [
        '',
        'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL',
        'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH',
        'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM',
        'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC',
        'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];


    let sizes = {
        Youth: ['Youth XS', 'Youth S', 'Youth M', 'Youth L'],
        Adult: ['Adult S', 'Adult M', 'Adult L', 'Adult XL',
                'Adult 2XL', 'Adult 3XL', 'Adult 4XL', 'Adult 5XL']
    };

    let sizeMap = {
        'Youth XS': 'xs',   'Youth S': 's',     'Youth M': 'm',
        'Youth L': 'l',     'Adult S': 's',     'Adult M': 'm',
        'Adult L': 'l',     'Adult XL': 'xl',   'Adult 2XL': '2xl',
        'Adult 3XL': '3xl', 'Adult 4XL': '4xl', 'Adult 5XL': '5xl'
    };

    function populateStates(){
        let selector = document.getElementById('state');

        for(let state in states){
            let opt = document.createElement('option');
            opt.value = states[state];
            opt.innerHTML = states[state];
            selector.appendChild(opt);
        }
    }

    function populateSizes(){
        let htmlSelect = document.getElementById('size');
        let blankOpt = document.createElement('option');
        blankOpt.value = '';
        blankOpt.innerHTML = '';

        htmlSelect.appendChild(blankOpt);

        for(let group of Object.keys(sizes)){
            let category = document.createElement('optgroup');
            category.label = group;
            htmlSelect.appendChild(category);

            for(let size of Object.values(sizes[group])){
                // console.log(size);
                let opt = document.createElement('option');
                opt.value = (group.slice(0, 1) + '-' + sizeMap[size]).toLowerCase();
                opt.innerHTML = size;
                category.appendChild(opt);
            }
        }
    }

    populateStates();
    populateSizes();
})();

