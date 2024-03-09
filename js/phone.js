const loadPhone = async (searchText, isSeeMore) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await response.json()
    const phones = data.data;
    displayPhones(phones, isSeeMore)
}

const displayPhones = (phn, isSeeMore) =>{

    const getId = document.getElementById('container-list')
    getId.textContent = '';//before search content do not show again


    //if length is greater than 5 then we can show see more button otherwise none
    const seeMore = document.getElementById('get-button')
    if(5 < phn.length && !isSeeMore){
        seeMore.classList.remove('hidden')
    }
    else{
        seeMore.classList.add('hidden')
    }


    //show only first 5 phones
    if(!isSeeMore){
        phn = phn.slice(0,5)
    }    

    phn.forEach(phn =>{
        //console.log(phn);
        const createDiv = document.createElement('div')
        createDiv.classList = `card card-compact bg-gray-200 shadow-xl p-4`;
        createDiv.innerHTML = `
        <figure><img src="${phn.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phn.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick='clickShowDetails("${phn.slug}")' class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
        getId.appendChild(createDiv);
    })

    //get after data we remove loading spinner(means add 'hidden' class)
    loadingSpinner(false)
}

//search phone btn function
const searchPhn = (isSeeMore) =>{
    loadingSpinner(true)
    const userSearch = document.getElementById('user-search')   //1st step
    const userText = userSearch.value;
    loadPhone(userText, isSeeMore)
}


//loading-spinner 
const loadingSpinner =(isLoading)=>{
    const loadSpinner = document.getElementById('loading-spinner')
    if(isLoading){
        loadSpinner.classList.remove('hidden');
    }
    else{
        loadSpinner.classList.add('hidden')
    }
}


//SEE MORE function is here
const seeMore =()=>{
    searchPhn(true)
}



//click Show Details
const clickShowDetails = async (id)=>{
    //console.log('this is me bro', id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;
    //console.log(phone);

    showPhonesModal(phone)
}


const showPhonesModal =(phone)=>{
    console.log(phone);
    const originalName = document.getElementById('show-original-name')
    originalName.innerText = phone.name//insert original name

    const showDetailContainer = document.getElementById('show-detail-container')
    showDetailContainer.innerHTML = `
        <img class="w-2/5" src="${phone.image}" alt=""/>
        <p><span class="font-bold text-xl">Storage:</span>${phone?.mainFeatures?.storage}

    `

    my_modal_5.showModal()
}