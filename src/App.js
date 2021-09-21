import Navbar from "./components/Navbar.js";
import React, { Component } from "react";
import Card from "./components/Card.js";
import LoaderGif from "./loader.gif";
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      likes: localStorage
    }

    this.clickLike = this.clickLike.bind(this);
  }

  clickLike(like, unliked) {
    if (!unliked) {
      localStorage.setItem(like.url.toString(), like.title.toString());
    } else {
      localStorage.removeItem(like.url.toString(), like.title.toString());
    }
  }

  componentDidMount() {
    fetch('https://api.nasa.gov/planetary/apod?api_key=ve02NHvuTanZEQrYK1L5vDCQhp9GCuHpeao68xnB&count=100')
      .then(
        res => res.json()
      ).then(
        json => {
          this.setState({
            isLoaded: true,
            items: json
          });
        }
      );
  }

  render() {
    const likes = getLikes(this.state.likes);

    var { isLoaded, items } = this.state;
    items = shuffle(items);
    const l = Math.ceil(items.length / 2);
    const leftItems = items.splice(0, l);

    if (!isLoaded) {
      return (
        <LoaderState />
      );
    }

    return (
      <div className="App">
        <Navbar likes={likes} />

        <div className="container">
          <div className="columns">

            <div className="column is-half">
              {leftItems.map(item => (
                <Card
                  key={item.hdurl ? item.hdurl : item.url}
                  url={item.url}
                  title={item.title}
                  copyright={item.copyright}
                  date={item.date}
                  explanation={item.explanation.substring(0, item.explanation.indexOf('.') + 1)}
                  clickLike={this.clickLike}
                />
              ))
              }

            </div>

            <div className="column is-half">
              {items.map(item => (
                <Card
                  key={item.hdurl ? item.hdurl : item.url}
                  url={item.url}
                  title={item.title}
                  copyright={item.copyright}
                  date={item.date}
                  explanation={item.explanation.substring(0, item.explanation.indexOf('.') + 1)}
                  clickLike={this.clickLike}
                />
              ))
              }
            </div>

          </div>
        </div>
      </div>
    );
  }
}

function LoaderState() {
  return (
    <div className="App">
      <header className="navbar is-black block">
        <p className="title is-1 has-text-white"> Spacestagram </p>
      </header>
      <div className="columns">
        <div className="column is-one-third">
        </div>
        <div className="column is-one-third">
          <figure className="image is-square">
            <img src={LoaderGif} alt="" />
          </figure>
          <p className="title is-4"> Loading ... </p>
        </div>
        <div className="column is-one-third">
        </div>
      </div>
    </div>
  );
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function getLikes(likes) {
  const res = [];
  for (var likeUrl in likes) {
    if (localStorage.getItem(likeUrl)) {
      const title = localStorage.getItem(likeUrl);
      res.push({ url: likeUrl, title: title });
    }
  }
  return res;
}

export default App;
