let data = []

const select = document.querySelector('#select')
const inputText = document.querySelector('#text')
const inputNumber = document.querySelector('#number')
const buttonPotvrda = document.querySelector('#potvrda')
const divIspisProhod = document.querySelector('#ispisPrihod')
const divIspisRashod = document.querySelector('#ispisRashod')
const div1 = document.querySelector('#div1')

const total = document.createElement('p')
total.textContent = 'Total:'
const prihodi = document.createElement('p')
prihodi.textContent = 'Prihodi:'
const rashodi = document.createElement('p')
rashodi.textContent = 'Rashodi:'
const pUkupno = document.createElement('p')
pUkupno.textContent = 0
const pPrihod = document.createElement('p')
pPrihod.textContent = 0
const pRashod = document.createElement('p')
pRashod.textContent = 0

div1.append(total,pUkupno,prihodi,pPrihod,rashodi,pRashod)

function ukupanPrihod() {
    let zbir = 0
    data.forEach(x => {
        if(x.tip == '+') zbir += x.vrednost
    })

    return zbir
}

function ukupanRashod() {
    let zbir = 0
    data.forEach(y => {
        if(y.tip == '-') zbir += y.vrednost
    })

    return zbir
}


function azurirajVrednosti() {
    pPrihod.textContent = ukupanPrihod()
    pRashod.textContent = ukupanRashod()
    pUkupno.textContent = ukupanPrihod() - ukupanRashod()
    
}


function dodajNaStranicu(stvar){
    const div = document.createElement('div')
    const span = document.createElement('span')
    span.textContent = `${stvar.opis} --- ${stvar.vrednost} - `
    const buttonDelete = document.createElement('button')
    buttonDelete.textContent = 'obrisi'

    div.append(span,buttonDelete)

    buttonDelete.addEventListener('click', ()=>{
        div.remove()
        let index = data.indexOf(stvar)
        data.splice(index,1)

        azurirajVrednosti()
    })

    if(stvar.tip == '+'){divIspisProhod.appendChild(div)}
    else{
        const procenat = document.createElement('span')
        procenat.textContent = ` ${stvar.vrednost * 100 / ukupanPrihod()} %`
        div.appendChild(procenat)
        divIspisRashod.appendChild(div)}
}

buttonPotvrda.addEventListener('click', ()=>{
    let obj = {
        opis: inputText.value,
        vrednost: Number(inputNumber.value),
        tip: select.value
    }

    data.push(obj)
    console.log(data);
    dodajNaStranicu(obj)
    azurirajVrednosti()

})