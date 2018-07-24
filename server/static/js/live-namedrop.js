(function(){

    let text = document.getElementById('namedrop');
    let container = document.getElementById('shirt-namedrop-container');
    let namedrop = document.getElementById('namedrop-span');

    text.addEventListener('input', function(e){
        // console.log(e.target.value);
        namedrop.innerText = e.target.value;
        if(e.target.value.length > 0){
            resize();
        }
    });

    function resize() {
        let size = 24;
        let num = 0;
        // console.log(num++);
        namedrop.style.fontSize = size + 'px';
        // console.log(num++);
        while (namedrop.offsetWidth > container.offsetWidth) {
            // console.log(num++);
            size -= 0.5;
            namedrop.style.fontSize = size + 'px';
        }
    }
})();