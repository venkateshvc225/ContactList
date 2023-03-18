import React, { Component } from 'react';

class AddContact extends Component {
    state = {
        name: "",
        email: "",
    };
    add = (e) => {
        e.preventDefault();
        if(this.state.name === "" || this.state.email === ""){
            alert("All fields are required");
            return;
        }
        this.props.addContactHandler(this.state);
        this.State({name: "", email:""});
    };
    render() {
        return (
            <div className="ui main">
                <h2> Add Contact details</h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className="ui field">
                        <label>Name</label>
                        <input type="text" 
                             name='name' 
                             placeholder='name'
                             value={this.state.value}
                             onChange={(e) => {this.setState({name: e.target.value})}}/>
                    </div>
                    <div className="ui field">
                        <label>email</label>
                        <input type="text" name='email' placeholder='email' 
                        value={this.state.value}
                        onChange={(e) => {this.setState({email: e.target.value})}}/>
                    </div>
                    <button className="ui button blue"> Add</button>
                </form>
                 
            </div>
        );
    }
}

export default AddContact;
