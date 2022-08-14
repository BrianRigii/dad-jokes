import { Component } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

const JOKE_URL = "https://icanhazdadjoke.com/";

class JokeList extends Component {
  static defaultProps = {
    numJokes: 10,
  };
  constructor(props) {
    super(props);

    this.state = {
      jokes: [],
    };
  }

  async componentDidMount() {
    console.log("Component Moonted");
    let fetchedJokes = [];
    while (fetchedJokes.length < this.props.numJokes) {
      console.log("fetching jokes");
      let joke = (
        await axios.get(JOKE_URL, {
          headers: { Accept: "application/json" },
        })
      ).data;

      fetchedJokes.push({ joke: joke.joke, votes: 0, id: uuid() });
      console.log(fetchedJokes);
    }
    this.setState((st) => ({ jokes: [...st.jokes, ...fetchedJokes] }));
  }

  render() {
    const jokes = this.state.jokes.map((j) => <p>{j}</p>);
    return (
      <div className="JokeList">
        <h1>Dad Jokes</h1>
        <div className="JokeList-jokes"></div>
        {jokes}
      </div>
    );
  }
}

export default JokeList;
