(function(){
    document.getElementById('autocomplete-input').addEventListener("keyup",(ele)=>{
//        alert(ele.target.value);
        throttle(remoteCall, 300)(ele.target.value)
    })

    async function remoteCall(input){
        document.getElementById('dropdown-content').innerHTML='';
        var response= await fetch(`http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=LssgMKS5wKRehhfiWAoS&app_code=j7mL3WkHaQC1EyEp16h5iQ&query=${input}&beginHighlight=<b>&endHighlight=</b>&country=AUS&maxresults=5`)
        var responseJson = await response.json();
//        console.log(responseJson);
        if(!responseJson.suggestions){
            return;
        }
        responseJson.suggestions.forEach(item=>{
            document.getElementById('dropdown-content').insertAdjacentHTML('beforeend',
            `<a class="dropdown-item">
                ${item.label}
             </a>`
            )
        }
            );
}


    var inThrottle;
    const throttle = (func, limit) => {
        return function() {
            const args = arguments
            const context = this
            if (!inThrottle) {
                func.apply(context, args)
                inThrottle = true
                setTimeout(() => inThrottle = false, limit)
            }
        }
    }
    var inDebounce;
    const debounce = (func, delay) => {
        return function() {
            const context = this
            const args = arguments
            clearTimeout(inDebounce)
            inDebounce = setTimeout(() => func.apply(context, args), delay)
        }
    }



}());