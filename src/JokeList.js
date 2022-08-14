import { Component } from "react";
import axios from "axios";

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
    let fetchedJokes = [];
    while (fetchedJokes.length < this.props.numJokes) {
      console.log("fetching jokes");
      let joke = (
        await axios.get(JOKE_URL, {
          headers: { Accept: "application/json" },
        })
      ).data;

      console.log("Jokes jokes");

      fetchedJokes.push(joke.joke);
      console.log(fetchedJokes);
    }
    this.setState((st) => ({ jokes: [...st.jokes, ...fetchedJokes] }));
  }

  render() {
    const jokes = this.state.jokes.map((j) => <p>{j}</p>);
    return <div className="JokeList">{jokes}</div>;
  }
}

export default JokeList;
