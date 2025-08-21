const billInput =document.querySelector('.bill-input input')
const customTipInput =document.querySelector('.custom-tip')
const noOfPeople =document.querySelector('.no-of-people')
const billGenerate =document.querySelector('.Generate-bill')
const total =document.querySelector('.Total')
const eachPertionBill =document.querySelector('.Each-Pertion-Bill')
const tipAmount=document.querySelector('.Tip-Amount')
const resetButton=document.querySelector('.Reset')
const autoGenerateTipContainer =document.querySelector('.auto-select')
let tipInPersentage =0;


function billGenerateActive(){
    
    if(tipInPersentage && +billInput.value && +noOfPeople.value){
        billGenerate.disabled=false
    }
    else{
        billGenerate.disabled=true
    }
    resetOutput()
}
function resetOutput(){
    tipAmount.innerText = ``
    total.innerText=``
    eachPertionBill.innerText= ``
}

billInput.addEventListener('input', (e)=>{
    if(e.target.value){
        noOfPeople.disabled=false
        customTipInput.disabled=false
        autoGenerateTipContainer.classList.remove('disabled')
    }else{
        noOfPeople.disabled=true
        customTipInput.disabled=true
        autoGenerateTipContainer.classList.add('disabled')
    }
    billGenerateActive()
})
noOfPeople.addEventListener('input',(e)=>{
    billGenerateActive()
})

billGenerate.addEventListener('click', ()=>{
    const tip= billInput.value * tipInPersentage/ 100
    const totalPayment= tip + parseInt(billInput.value)
    const perhead = (totalPayment / noOfPeople.value).toFixed(2)
    tipAmount.innerText = `₹${tip}`
    total.innerText=`₹${totalPayment}`
    eachPertionBill.innerText= `₹${perhead}`
    resetButton.disabled = false
})

autoGenerateTipContainer.addEventListener('click',(e)=>{
    if(autoGenerateTipContainer.classList.contains('disabled')) return
    if(tipInPersentage ===parseInt(e.target.innerText)){
        e.target.classList.remove('selected')
        tipInPersentage=0
        billGenerateActive()
        return
    }
    if(autoGenerateTipContainer !== e.target){
        [...autoGenerateTipContainer.children].forEach((tip)=> tip.classList.remove('selected'))
        e.target.classList.add('selected')
        tipInPersentage = parseInt(e.target.innerText)
        customTipInput.value=''
        billGenerateActive()
    }
})

customTipInput.addEventListener('input',()=>{
    if(customTipInput.value){
    tipInPersentage = parseInt(customTipInput.value);
    [...autoGenerateTipContainer.children].forEach((tip)=> tip.classList.remove('selected'))
    }else{
        tipInPersentage=0
    }
    billGenerateActive()
})


resetButton.addEventListener('click', ()=>{
    [...autoGenerateTipContainer.children].forEach((tip)=> tip.classList.remove('selected'))
    tipInPersentage=0
    customTipInput.value=''
    billInput.value=''
    noOfPeople.value= ''
    resetButton.disabled = true
    billGenerateActive()
    resetOutput()
})


