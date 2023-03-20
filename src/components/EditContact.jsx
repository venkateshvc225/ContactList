import React, { Component } from 'react';

class EditContact extends Component {
    constructor(props){
        super(props);
        console.log(props);
        const {id,name,email} = props.location.state.contact;
        this.state = {
            id: id,
            name: name,
            email: email,
        };
    }
    
    update = (e) => {
        e.preventDefault();
        if(this.state.name === "" || this.state.email === ""){
            alert("All fields are required");
            return;
        }
        this.props.updateContactHandler(this.state);;
        this.setState({name: "", email:""});
        this.props.history.push("/"); 
    };
    render() {
        return (
            <div className="ui main">
                <h2> Edit  Contact details</h2>
                <form className="ui form" onSubmit={this.update}>
                    <div className="ui field">
                        <label>Name</label>
                        <input type="text" 
                             name='name' 
                             placeholder='name'
                             value={this.state.name}
                             onChange={(e) => {this.setState({name: e.target.value})}}/>
                    </div>
                    <div className="ui field">
                        <label>email</label>
                        <input type="text" name='email' placeholder='email' 
                        value={this.state.email}
                        onChange={(e) => {this.setState({email: e.target.value})}}/>
                    </div>
                    <button className="ui button blue"> Update</button>
                </form>
                 
            </div>
        );
    }
}

export default EditContact;
