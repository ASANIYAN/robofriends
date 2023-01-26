import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import { robots } from '../robots'; // not default, so we destructure
import React from 'react';
import './App.css';

// smart components - have state
class App extends React.Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchField: '',
        }
        console.log('constructor');
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({ robots: users }));
    }

    onSearchChange = (e) => {
        this.setState({ searchField: e.target.value})
    }
    render() {
        const { robots, searchField } = this.state;
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
        return !robots.length ? 
            <h1 className='tc'>Loading</h1>
        :
            (
                <div className='tc'>
                    <h1 className='f1'> Robo Friends </h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filteredRobots} />
                    </Scroll>
                </div>
            );
    }
}
 
export default App;