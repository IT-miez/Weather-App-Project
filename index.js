
// Public Weather API key
const apiKey = "4ba874ba9a1e48569df105159230207"

const searchText = document.getElementById("locationSearch")
const findLocation = document.getElementById("submitBtn")
const main = document.getElementById("mainSection")
const middle = document.getElementById("middleSection")

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
        let findDIv = document.getElementById("current2")
        if (findDIv) {
            middle.removeChild(findDIv)
        }

        const dailyDiv = document.createElement("div")
        dailyDiv.setAttribute("id", "current2")
        dailyDiv.classList.add("middle-section")

        for(let day of data.forecast.forecastday) {
            let givenDateConverted = formatDate(day.date)
            let weekday = givenDateConverted[1]
            givenDateConverted = givenDateConverted[0]

            //let date = day.date
            let date = givenDateConverted
            
            console.log(`Weather forecast for ${date}:`)
            let temperature = day.day.avgtemp_c
            console.log(`Temperature: ${temperature}°C`)
            let condition = day.day.condition.text
            console.log(`Weather condition: ${condition}`)
            let imgsrc = day.day.condition.icon

            let newDiv = document.createElement("div")
            newDiv.classList.add("weather-container-daily")
            let dateDiv = document.createElement("div")
            dateDiv.classList.add("dateDiv")
            let newDate = document.createElement("p")
            let newWeekday = document.createElement("p")
            let newCondition = document.createElement("p")

            let imgTempContainer = document.createElement("div")
            imgTempContainer.classList.add("daily-container")
            let newImg = document.createElement("img")
            let newTemp = document.createElement("p")

            newCondition.textContent = condition
            newImg.src = imgsrc
            newTemp.textContent = temperature + " °C"
            newWeekday.textContent = weekday
            newDate.textContent = date

            dateDiv.appendChild(newDate)
            dateDiv.appendChild(newWeekday)
            newDiv.appendChild(dateDiv)
            newDiv.appendChild(newCondition)
            imgTempContainer.appendChild(newImg)
            imgTempContainer.appendChild(newTemp)
            newDiv.appendChild(imgTempContainer)

            dailyDiv.appendChild(newDiv)
        }

        middle.appendChild(dailyDiv)


    } catch(error) {
        console.error("Error: ", error)
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    
    // Format the date as DD.MM.YYYY
    const formattedDate = date.toLocaleDateString('fi', { day: '2-digit', month: '2-digit', year: 'numeric' });
    
    // Get the weekday
    const weekday = date.toLocaleDateString('en', { weekday: 'long' });
  
    let resultDate = [formattedDate, weekday]
    return resultDate;
  }

fetchWeatherData("London")   