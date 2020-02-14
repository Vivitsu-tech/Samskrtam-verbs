import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap';

class HomePage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            root: '',
            requestedForm: 'kartari',
            redirectFlag: false,
            optionsList: [],
            rootOptions: [],
            error: ''
        }
    }

    componentDidMount() {
        console.log('ready to fetch the list of dhatus')
        let roots = [];

        fetch('/lakaras')
        .then (response => response.json())
        .then (data => {
            this.setState({optionsList: data}, () => console.log(this.state))
            roots = this.state.optionsList.map((root) => {
                return <option key={root}>{root}</option>
            })
            this.setState({rootOptions: roots}, () => console.log(this.state))
        })
        .catch (error => console.log(this.state.error))

        console.log(`ready to load options....`)
        
    }

    handleRootChange = event => {
        this.setState ({root: event.target.value})
    }

    handleFormChange = event => {
        this.setState ({requestedForm: event.target.value})
    }

    SubmitHandler = event => {
        event.preventDefault();

        if (this.state.root.length > 0) 
        { this.setState ({redirectFlag: true})
        }
        else {
            this.setState ({redirectFlag: false});
            alert (`Select a Verb Root`)
        }
    }

    render() {
        const {root,requestedForm, redirectFlag, optionsList,rootOptions} = this;

        if (this.state.redirectFlag) {
            return <Redirect to = {{
            pathname: '/BranchOut',
            state: { root: this.state.root, 
                     form: this.state.requestedForm}
            }} />
        }

        return (
            //<Jumbotron>
            <form onSubmit={this.SubmitHandler}> 
                <h2> Namaste! Get ready to learn samskritam verbs</h2>
                <p>Enter verb root or pick one from the dropdown</p>
                <label name="root">Verb Root </label>
                <select value={root} onChange={this.handleRootChange}>
                    <option value=""></option>
                    {this.state.rootOptions}
                </select>
                <br/> <br/>
                <label name="requestedForm">Verb Forms</label>
                <select value={requestedForm} onChange={this.handleFormChange}>
                    <option value="kartari">kartari lakArAh/Active voice</option>
                    <option value="karmaNi">karmaNi lakArAh/Passive voice</option>
                    <option value="kRdanta">kRdanta forms</option>
                    <option value="All">All forms</option>
                </select>
                <br/> <br/>
                <button type="submit" >Submit</button>
            </form>
            //</Jumbotron>
        );
    }
}

export default HomePage;