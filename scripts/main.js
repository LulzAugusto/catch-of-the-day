var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var h = require('./helpers');

/*
    App
 */
var App = React.createClass({
    getInitialState: function() {
        return {
            fishes: {},
            order: {}
        };
    },

    addFish: function(fish) {
        var timestamp = new Date().getTime();
        this.state.fishes['fish-' + timestamp] = fish;
        this.setState({ fishes: this.state.fishes });
    },

    loadSamples: function() {
        this.setState({ fishes: require('./sample-fishes') });
    },

    render: function() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafod Market"/>
                </div>
                <Order/>
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
            </div>
        )
    }
});

/*
    AddFishForm
    <AddFishForm/>
 */
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

/*
    Header
    <Header/>
 */
var Header = React.createClass({
    render: function() {
        return (
            <header className="top">
                <h1>
                    Catch
                    <span className="ofThe">
                        <span className="of">of</span>
                        <span className="the">the</span>
                    </span>
                    Day
                </h1>
                <h3 className="tagline"><span>{this.props.tagline}</span></h3>
            </header>
        )
    }
});

/*
    Order
    <Order/>
 */
var Order = React.createClass({
    render: function() {
        return (
            <p>Order</p>
        )
    }
});

/*
    Inventory
    <Inventory/>
 */
var Inventory = React.createClass({
    render: function() {
        return (
            <div>
                <h2>Inventory</h2>

                <AddFishForm {...this.props}/>
                <button type="button" onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        )
    }
});

/*
    StorePicker
    This will let us make <StorePicker/>
 */
var StorePicker = React.createClass({
    mixins: [History],

    goToStore: function goToStore(event) {
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

/*
    Not found
 */
var NotFound = React.createClass({
    render: function() {
        return <h1>Not found!</h1>
    }
});

/*
    Routes
 */

var routes = (
    <Router history={createBrowserHistory()}>
        <Route path="/" component={StorePicker}/>
        <Route path="/store/:storeId" component={App}/>
        <Route path="*" component={NotFound}/>
    </Router>
)
ReactDOM.render(routes, document.getElementById('main'));
