var Field = React.createClass({
    render: function() {
      return (<p>
                  <label>{this.props.children}</label>
                  <input type="text" value="" />
                </p>
      );
   }
});