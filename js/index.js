
const searchButton = () => {
    const input = document.getElementById('input-value');
    const errorMessage = document.getElementById('error-messeg');
    const inputValue = parseInt(input.value); 
    if(isNaN(inputValue) || inputValue == ""){ //isNaM cheak number or string / others-true
        // alert('Please enter a number');
        errorMessage.innerText = "Please Enter a Number";
        input.value = "";
        main.innerHTML = '';
    }
    else if(inputValue <= 0){
        errorMessage.innerText = "Pleade Enter a Positive Number";
        input.value = "";
        main.innerHTML = '';
    }
    else{
        fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`)
        .then(res => res.json())
        .then(data => displayCard(data.cards));
        input.value = "";
        errorMessage.innerHTML = '';
        main.innerHTML = '';

    }
}

const displayCard = (cards) => {
    const main = document.getElementById('main');
    for(const card of cards){
        // console.log(card.image)
        const div = document.createElement('div');
        div.innerHTML = `
                <div class="card"  style ="width:18rem;">
                <img src="${card.image}" class="card-img-top" alt="...">
                <div class="card-body text-center text-primary">
                 
                    <button onclick = "cardDetails('${card.code}')" class="btn btn-primary">See Details</button>
                </div>
                </div>
        `
        main.appendChild(div);
        // console.log(cards)
    }
   
}
const cardDetails = (code) => {
    fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
    .then(res => res.json())
    .then(data => {
     const allCards = data.cards;
     const singleCard = allCards.find(card => card.code === code);
     const div = document.createElement('div');
     main.innerHTML = '';
     div.innerHTML = `
            <div class="card"  style ="width:18rem;">
                <img src="${singleCard.image}" class="card-img-top" alt="...">
                <div class="card-body text-center text-primary">
                    <h4 class="card-title">${singleCard.suit}</h4>
                    <h5 class="card-value">${singleCard.value}</h5>
                    <p class="card-text">${singleCard.code}</p>
                    
                </div>
            </div>
     `
    //  console.log(singleCard)
    main.appendChild(div);
    
    });
}