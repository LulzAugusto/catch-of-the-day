/*
    AddFishForm
    <AddFishForm/>
 */

import React from 'react';

var AddFishForm = React.createClass({
    createFish: function(event) {
        event.preventDefault();

        var fish = {
            name: this.refs.name.value,
            price: this.refs.price.value,
            status: this.refs.status.value,
            desc: this.refs.desc.value,
            image: this.refs.image.value
        };

        this.props.addFish(fish);
        this.refs.fishForm.reset();
    },

    render: function() {
        return (
            <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
                <input type="text" placeholder="Fish name" ref="name"/>
                <input type="text" placeholder="Fish price" ref="price"/>
                <select ref="status">
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea placeholder="Desc" ref="desc"></textarea>
                <input type="text" placeholder="URL to Image" ref="image"/>
                <button type="submit">+ Add Item</button>
            </form>
        )
    }
});

export default AddFishForm;
