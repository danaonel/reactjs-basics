var Form = React.createClass({displayName: "Form",
    render: function() {
      return(React.createElement("div", {className: "form"}, 
              React.createElement("h2", null, "Form title"), 
              React.createElement("p", null, "A paragraph")
            )
        );
    }
});