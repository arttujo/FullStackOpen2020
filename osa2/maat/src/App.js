import React, { useState, useEffect } from "react";
import axios from "axios";
const ApiUrl = "https://restcountries.eu/rest/v2/all";
const WeatherApiUrl = "http://api.weatherstack.com/current";
const api_key = process.env.REACT_APP_API_KEY;

const SearchBox = (props) => {
  const { handleSearchChange, search } = props;
  return (
    <div>
      Find Countries:{" "}
      <input onChange={handleSearchChange} value={search}></input>
    </div>
  );
};

const CountryInfo = (props) => {
  const { countries, search, handleShowButton } = props;

  const countriesToShow = countries
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    : countries;

  if (countriesToShow.length > 10) {
    return <TooManyCountries></TooManyCountries>;
  } else if (countriesToShow.length === 1) {
    const countryToShow = countriesToShow[0];
    return (
      <SingleCountryInfo countryToShow={countryToShow}></SingleCountryInfo>
    );
  } else {
    return (
      <CountryList
        countriesToShow={countriesToShow}
        handleShowButton={handleShowButton}
      ></CountryList>
    );
  }
};

const TooManyCountries = () => {
  return (
    <div>
      <p>Too many matches, specify your search</p>
    </div>
  );
};

const CountryList = (props) => {
  const { countriesToShow, handleShowButton } = props;

  const showCountry = (country) => {
    console.log(country);
    handleShowButton(country.name);
  };

  return (
    <div>
      <ul>
        {countriesToShow.map((country) => (
          <li key={country.name}>
            {country.name}{" "}
            <button
              onClick={() => {
                showCountry(country);
              }}
            >
              show
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SingleCountryInfo = (props) => {
  const { countryToShow } = props;
  return (
    <div>
      <h1>{countryToShow.name}</h1>
      <p>Capital: {countryToShow.capital}</p>
      <p>Population: {countryToShow.population}</p>
      <h2>Languages</h2>
      <div>
        <ul>
          {countryToShow.languages.map((language) => (
            <li key={language.iso639_1}>{language.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Flag</h2>
        <img
          src={countryToShow.flag}
          alt={`Flag of ${countryToShow.name}`}
          style={{ maxWidth: "100px" }}
        ></img>
      </div>
      <Weather capital={countryToShow.capital}></Weather>
    </div>
  );
};

const Weather = (props) => {
  const [weather, setWeather] = useState();
  const { capital } = props;
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (weather!=null){             //This is here to prevent the second request sent to the api upon render of the complete component
      console.log("prevented second request")
    } else {
      axios
      .get(WeatherApiUrl, {
        params: { access_key: api_key, query: capital },
      })
      .then((response) => {
        console.log(response.data);
        setWeather(response.data);
        setLoading(false)
      });
    }
    
  }, [loading]);


  if (loading) {
    return (
      <p>Loading weather info...</p>
    )
  } else {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <h5>Temperature: {weather.current.feelslike} Celsius</h5> 
        <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} style={{maxWidth:"100px"}}></img>
    <h5>Wind: {weather.current.wind_speed} mph. Direction {weather.current.wind_dir}</h5>
      </div>
    );
  }
  
};

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get(ApiUrl).then((response) => {
      console.log(response);
      setCountries(response.data);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleShowButton = (country) => {
    setSearch(country);
  };

  return (
    <div className="App">
      <h1>Country Info</h1>
      <SearchBox
        handleSearchChange={handleSearchChange}
        search={search}
      ></SearchBox>
      <CountryInfo
        search={search}
        countries={countries}
        handleShowButton={handleShowButton}
      ></CountryInfo>
    </div>
  );
}

export default App;
