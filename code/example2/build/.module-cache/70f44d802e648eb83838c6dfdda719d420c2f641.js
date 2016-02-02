var App = React.createClass({displayName: "App",
    render: function() {
      return(React.createElement("div", {className: "app"}, 
              React.createElement("h2", null, "App title"), 
              React.createElement("p", null, "A paragraph")
            )
        );
    }
});