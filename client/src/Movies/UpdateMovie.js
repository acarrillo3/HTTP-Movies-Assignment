import React from 'react';

class UpdateMovie extends React.Component {
    constructor(){
        super();
    }
    // id: 5,
    // title: 'Tombstone',
    // director: 'George P. Cosmatos',
    // metascore: 89,
    // stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],

    render () {
        return (
            <div className="save-wrapper">
                <h1>Update Movie</h1>
                <form>
                    <input type="text" placeholder="Enter title" />
                    <input type="text" placeholder="Enter director" />
                    <input type="number" placeholder="Enter metascore" />
                    <button>Update</button>
                </form>
            </div>
        )
    }
}

export default UpdateMovie;