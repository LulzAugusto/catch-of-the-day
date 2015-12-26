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
    render: function() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafod Market"/>
                </div>
                <Order/>
                <Inventory/>
            </div>
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
            <p>Inventory</p>
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
