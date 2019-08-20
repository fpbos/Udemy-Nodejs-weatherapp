const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#location')
const messageTwo = document.querySelector('#forecast')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
    response.json().then( (data) => {
        if(data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else {
            messageOne.textContent = data.foundLocation
            messageTwo.textContent = data.body.currently.summary + '. Het is op dit moment ' + data.body.currently.temperature + ' graden. Er staat een wind van ' + data.body.currently.windBearing + ' graden met een snelheid van ' + data.body.currently.windSpeed + 'm/s. ' + data.body.daily.summary
        }
    })
})
})