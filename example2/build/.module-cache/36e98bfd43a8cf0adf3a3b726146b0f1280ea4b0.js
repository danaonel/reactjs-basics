var Field = React.createClass({displayName: "Field",
    render: function() {
      return (React.createElement("p", null, 
                  React.createElement("label", null, this.props.children), 
                  React.createElement("input", {type: "text", value: ""})
                )
      );
   }
});