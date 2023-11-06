import logo from './logodesigns.png';
import background from './mountains.jpg'
import './App.css';

function App() {
  return (
    <div className="App">
        <div className="image-container">
        {<img src={background} className="background" alt="mountains"/>}
        {<img src={logo} className="cw-logo" alt="logo" />}
        </div>
        <div class="search-container">
        <input type="text" placeholder="Search..."></input>
        <button type="submit">Search</button>
    </div>
    <div class="containerTime">
        <h6 id="currentTime"></h6>
    </div>
    <div class="containerDay">
        <h6 id="currentDay"></h6>
    </div>
    <div class="containerDate">
        <h6 id="currentDate"></h6>
    </div>
    <script src="script.js"></script>
          

        {/* <p>
          Cool Stuff
        </p>
        <a
          className="App-link"
          href="https://www.weather.gov/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
    </div>
  );
}

export default App;
