import React, { Component } from 'react';
import './App.css';
import InputGroup from 'react-bootstrap/InputGroup';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null
        }
    }

    search() {
        console.log('this.state', this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL} + 'q=' + ${this.state.query}'&type=artist&limit=1'`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

        fetch(FETCH_URL, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(json => {
            const artist = json.artists.items[0];
            this.setState({artist});

            FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=NG&`
            fetch(FETCH_URL, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(json => {
                const { tracks } = json;
                this.setState({tracks});
            })
        });
    }

    render() {
        return(
            <div className='App'>
                <div className='App-title'>Music Master</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl 
                            type="text"
                            placeholder="Search For An Artist"
                            value={this.state.query}
                            onChange={event => {this.setState({query: event.target.value})}}
                            onKeyPress={event => {
                                if( event.key === 'Enter' ) {
                                    this.search()
                                }
                            }}
                        />
                        <InputGroup.Prepend onClick={() => this.search()}>
                            {/*<Glyphicon glyph='search'></Glyphicon>*/}
                            <Button>Submit</Button>
                        </InputGroup.Prepend>
                    </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null
                    ?  <div> 
                            <Profile 
                            artist={this.state.artist}
                            />
                            <Gallery 
                                tracks={this.state.tracks}
                            />
                        </div>
                    : <div></div>
                }
                
            </div>
        )
    }
}

export default App;
