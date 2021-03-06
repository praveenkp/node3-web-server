console.log('client side js loaded');

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    }
    )
})





const weather_form= document.querySelector('form')
const search=document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weather_form.addEventListener('submit',(e)=>{
    e.preventDefault()

    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';

    fetch('/weather?address='+search.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error;
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forcast
            console.log(data.location)
            console.log(data.forcast)
            console.log(data.address)
        }
    })
})

})