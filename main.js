const cards = [
    {
        img: './imgs/img1.png',
        color: '#386177',
        content: {
            title: '📍 Image for 404 - Nothing found on the map',
            paragraph: 'Uploaded for Douglas'
        },
        user: {
            name: 'Douglas',
            description: 'Developer | UI'
        }
    },
    {
        img: './imgs/img2.png',
        color: '#92e3a9',
        content: {
            title: 'Image for Web site - I wanted a fish 🎣',
            paragraph: 'Uploaded for Unknow'
        },
        user: {
            name: 'Unkow',
            description: 'UI'
        }
    },
    {
        img: './imgs/img4.png',
        color: '#c9dbfe',
        content: {
            title: 'Ghost 👻',
            paragraph: 'Uploaded for Alícia'
        },
        user: {
            name: 'Alícia',
            description: 'Back-end Developer'
        }
    },
    {
        img: './imgs/img3.png',
        color: '#8d667d',
        content: {
            title: 'Connect 404 🔌',
            paragraph: 'Uploaded for Raph'
        },
        user: {
            name: 'Raph',
            description: 'Front-end Developer'
        }
    },
]


let paramsMorph = {
    top: 0,
    left: 0,
    color: '#212121'
}


const hamburguer = document.querySelector('.hamburguer')
const navigation = document.querySelector('.navigation')
const morph = document.querySelector('.morph')
const details = document.querySelector('.details')

let rightContentIsOpen = false


function manipulateScroll(typeOverflow) {

    return document.body.style.overflowY = typeOverflow

}


function openMenu() {
    
    document.body.style.overflowY == 'auto' ? manipulateScroll('hidden') : manipulateScroll('auto')

    const backdropHeader = document.querySelector('.backdrop-header')
    return backdropHeader.classList.toggle('open')

}


function morphIsOpen({top, left, color}) {

    const morph = document.querySelector('.morph')
    
    morph.style.left = `${left}px`
    morph.style.top = `${top}px`
    morph.style.backgroundColor = color

    return morph.classList.toggle('open')

}


function openAsideRight(index) {

    const rightContent = document.querySelector('.right-content')
    const imgDetails = document.querySelector('.img-details')

    if(rightContentIsOpen) {

        const { img, color, content, user } = cards[index]
    
        imgDetails.src = img

        rightContent.innerHTML = `
            
            <div>
                <h2>${content.title}</h2>
                <p>${content.paragraph}</p>
            </div>
    
            <div class="card-user">
                <div class="user">
                    <h4>${user.name}</h4>
                    <p>${user.description}</p>
                </div>
            </div>
    
            <button style='background-color: ${color};' arial-label="Save" >Save</button>
        
        `

    }

    return rightContent.classList.toggle('open')

}


function insertCards() {
    
    const cardsWrapper = document.querySelector('.cards-wrapper')
    
    cards.map((item, index) => {
        return cardsWrapper.insertAdjacentHTML('beforeend', `
            <div class="card" style="background-color: ${item.color};" onclick="viewDetails(event, ${index})" >
                <img src='${item.img}' alt="Image preview" />
            </div>
        `)
    })    

}


hamburguer.addEventListener('click', (e) => {

    paramsMorph = {
        top: e.pageY,
        left: e.pageX,
        color: '#212121'
    }

    morphIsOpen(paramsMorph)
    openMenu()
    
    hamburguer.classList.toggle('active')

})


function viewDetails(e, index) {

    rightContentIsOpen = !rightContentIsOpen

    manipulateScroll('hidden')

    paramsMorph = {
        top: e.pageY,
        left: e.pageX,
        color: cards[index].color
    }

    details.classList.add('show')

    navigation.classList.add('open')
    hamburguer.classList.add('hide')
    
    morphIsOpen(paramsMorph)

    setTimeout(() => openAsideRight(index), 500)
    
}


navigation.addEventListener('click', () => {

    rightContentIsOpen = !rightContentIsOpen
    
    
    morphIsOpen(paramsMorph)
    openAsideRight()

    setTimeout(() =>  details.classList.remove('show'), 300)
    
    setTimeout(() => {
        
        navigation.classList.remove('open')
        hamburguer.classList.remove('hide')
        
        manipulateScroll('auto')

    }, 500)
    

})


insertCards()




