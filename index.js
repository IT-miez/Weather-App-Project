
// Public Weather API key
const apiKey = "4ba874ba9a1e48569df105159230207"

const searchText = document.getElementById("locationSearch")
const findLocation = document.getElementById("submitBtn")
const main = document.getElementById("mainSection")

console.log('testi')

findLocation.addEventListener("click", () => {
    console.log(searchText.value)
    let location = searchText.value
    fetchWeatherData(location)
})

searchText.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault()
        findLocation.click()
    }
})




async function fetchWeatherData(location) {
    try {
        let url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=7&hour=24`
        console.log(url)
        let response = await fetch(url)

        if(!response.ok) {
            throw new Error("Failed to fetch weather data")
        }

        let data = await response.json()

        console.log(data)

        // Current data
        console.log(data.location.name)
        console.log(data.current.condition.text)
        console.log(data.current.condition.icon)
        console.log(data.current.temp_c)

        let currentDiv = document.createElement("div")
        currentDiv.classList.add("current")
        let currentHeader = document.createElement("h2")
        let currentCondition = document.createElement("p")
        let currentImg = document.createElement("img")
        let currentTemp = document.createElement("p")

        currentHeader.textContent = data.location.name
        currentCondition.textContent = data.current.condition.text
        currentTemp.textContent = data.current.temp_c +" °C"
        currentImg.src = data.current.condition.icon

        currentDiv.appendChild(currentHeader)
        currentDiv.appendChild(currentCondition)
        currentDiv.appendChild(currentImg)
        currentDiv.appendChild(currentTemp)
        currentDiv.setAttribute("id", "current")
        let previousElement = document.getElementById("current")
        if (previousElement) {
            main.removeChild(previousElement)
        }
        main.appendChild(currentDiv)

        // Forecast daily
        for(let day of data.forecast.forecastday) {
            let date = day.date
            console.log(`Weather forecast for ${date}:`)
            let temperature = day.day.avgtemp_c
            console.log(`Temperature: ${temperature}°C`)
            console.log(`Weather condition: ${day.day.condition.text}`)
        }


    } catch(error) {
        console.error("Error: ", error)
    }
}