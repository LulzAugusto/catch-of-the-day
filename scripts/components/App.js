/*
    App
 */

import React from 'react';

import Rebase from 're-base';
const base = Rebase.createClass('https://catch-of-the-day-lulz.firebaseio.com/');

import Catalyst from 'react-catalyst';

import sampleFishes from '../sample-fishes';

import Inventory from './Inventory';
import Order from './Order';
import Header from './Header';
import Fish from './Fish';


var App = React.createClass({
    mixins: [Catalyst.LinkedStateMixin],

    getInitialState: function() {
        return {
            fishes: {},
            order: {}
        };
    },

    componentDidMount: function() {
        base.syncState(this.props.params.storeId + '/fishes', {
            context: this,
            state: 'fishes'
        });

        var state = localStorage.getItem('order-' + this.props.params.storeId);

        if (state) {
            this.setState({ order: JSON.parse(state) });
        }
    },

    componentWillUpdate: function(nextProps, nextState) {
        localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
    },

    addToOrder: function(key) {
        this.state.order[key] = this.state.order[key] + 1 || 1;
        this.setState({ order: this.state.order });
    },

    removeFromOrder: function(key) {
        delete this.state.order[key];
        this.setState({ order: this.state.order });
    },

    addFish: function(fish) {
        var timestamp = new Date().getTime();
        this.state.fishes['fish-' + timestamp] = fish;
        this.setState({ fishes: this.state.fishes });
    },

    removeFish: function(key) {
        if (confirm('Are you sure you wanto to remove this fish?!')) {
            this.state.fishes[key] = null;
            this.setState({ fishes: this.state.fishes });
        }
    },

    loadSamples: function() {
        this.setState({ fishes: sampleFishes });
    },

    renderFish: function(key) {
        return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
    },

    render: function() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafod Market"/>
                    <ul className="list-of-fishes">
                        {Object.keys(this.state.fishes).map(this.renderFish)}
                    </ul>
                </div>
                <Order order={this.state.order} fishes={this.state.fishes} removeFromOrder={this.removeFromOrder}/>
                <Inventory fishes={this.state.fishes} addFish={this.addFish} loadSamples={this.loadSamples} linkState={this.linkState} removeFish={this.removeFish} />
            </div>
        )
    }
});

export default App;
