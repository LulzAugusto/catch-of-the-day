/*
    StorePicker
    This will let us make <StorePicker/>
 */

import React from 'react';
import { History } from 'react-router';
import h from '../helpers';

var StorePicker = React.createClass({
    mixins: [ History ],

    goToStore: function(event) {
        event.preventDefault();
        this.history.pushState(null, '/store/' + this.refs.storeId.value);
    },

    render: function() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please enter a Store</h2>
                <input type="text" ref="storeId" defaultValue={h.getFunName()} required/>
                <input type="submit"/>
            </form>
        )
    }
});

export default StorePicker;
