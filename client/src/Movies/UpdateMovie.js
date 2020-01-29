import React from 'react';
import axios from 'axios';

class UpdateMovie extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: null,
            userInput: {
                title: '',
                director: '',
                metaScore: ''
            }
        }
    }

    componentDidMount = () => {
        this.fetchMovie(this.props.match.params.id);
    }

    fetchMovie = id => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log("update: ",res.data)
                this.setState({...this.state, movie: res.data});
            })
            .catch(err => {
                console.log("Error: ", err);
            })
    }

    handleChange = (e) => {
        const value = (e.target.name === 'metaScore') ? parseInt(e.target.value) : e.target.value;
        this.setState({
            ...this.state,
            userInput: {
                ...this.state.userInput,
                [e.target.name]: value
            }
        })
    }
    // id: 5,
    // title: 'Tombstone',
    // director: 'George P. Cosmatos',
    // metascore: 89,
    // stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],

    render() {
        console.log("Movie: ", this.state.movie);
        if (!this.state.movie) {
            return <div>Loading movie information...</div>;
        }
        return (
            <div className="update-wrapper">
                <h1>Update Movie</h1>
                <form>
                    <input type="text" placeholder="Enter title" name="title" value={this.state.movie.title} onChange={this.handleChange} />
                    <input type="text" placeholder="Enter director" name="director" value={this.state.movie.director} onChange={this.handleChange} />
                    <input type="number" placeholder="Enter metascore" name="metaScore" value={this.state.movie.metascore} onChange={this.handleChange} />
                    <button>Update</button>
                </form>
            </div>
        )
    }
}

export default UpdateMovie;