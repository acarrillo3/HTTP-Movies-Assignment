import React from "react";
import axios from "axios";

class UpdateMovie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: null
    };
  }

  componentDidMount = () => {
    this.fetchMovie(this.props.match.params.id);
  };

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        // console.log("update: ",res.data)
        this.setState({ ...this.state, movie: res.data });
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };

  handleChange = e => {
    const value =
      e.target.name === "metascore" ? parseInt(e.target.value) : e.target.value;
    this.setState({
      ...this.state,
      movie: {
        ...this.state.movie,
        [e.target.name]: value
      }
    });
  };

  handleStarChange = (e, index) => {
    const newStars = this.state.movie.stars.slice(); //copy the array
    newStars[index] = e.target.value; //execute the manipulations

    this.setState({
      movie: {
        ...this.state.movie,
        stars: newStars
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5000/api/movies/${this.props.match.params.id}`,
        this.state.movie
      )
      .then(res => {
        console.log("Update response:", res);
        this.props.history.push(`/`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
    return (
      <div className="update-wrapper">
        <h1>Update Movie</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label>
            Title:{" "}
            <input
              type="text"
              placeholder="Enter title"
              name="title"
              value={this.state.movie.title}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="">
            Director:
            <input
              type="text"
              placeholder="Enter director"
              name="director"
              value={this.state.movie.director}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="">
            Metascore:
            <input
              type="number"
              placeholder="Enter metascore"
              name="metascore"
              value={this.state.movie.metascore}
              onChange={this.handleChange}
            />
          </label>
          {this.state.movie.stars.map((star, index) => (
            <label>
              Stars:
              <input
                key={index}
                type="text"
                placeholder="Enter star"
                name="star"
                value={star}
                onChange={e => this.handleStarChange(e, index)}
              />
            </label>
          ))}
          <button>Update</button>
        </form>
      </div>
    );
  }
}

export default UpdateMovie;
