var CODERS = [
 {id: 1, name: 'James Olejar', score: 0, link: 'http://google.com'},
 {id: 2, name: 'Patrick Stinus', score: 0, link: 'http://google.com'},
];
  
function Stats(props) {
  var totalCoders = props.coders.length;
  var currentLeader = props.coders[0]
  var totalPoints = props.coders.reduce(function(total, coder){
    return total + coder.score;
  }, 0);
  
  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Coders:</td>
          <td>{totalCoders}</td>
        </tr>
        <tr>
          <td>Leader:</td>
          <td>{currentLeader ? currentLeader.name : 'None'}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  )  
}
  
Stats.propTypes = {
  coders: React.PropTypes.array.isRequired,
};

function Header(props) {
  return (
    <div className="header">
      <Stats coders={props.coders}/>
      <h1>SCOREBOARD</h1>
    </div>
  );
}

Header.propTypes = {
  coders: React.PropTypes.array.isRequired,
};

function Counter(props) {
  return (
    <div className="counter">
      <div className="counter-score"> {props.score} </div>
    </div>
  );
}
  
Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
}

function Coder(props) {
  return (
    <div className="coder">
      <div className="coder-name">
        {props.name}
      </div>
      <div className="coder-score">
        <Counter score={props.score}/>
      </div>
    </div>
  );
}

Coder.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
};



var Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    initialCoders: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired,
    })).isRequired,
  },
  
  getDefaultProps: function() {
    return {
      title: "Scoreboard",
    }
  },
  
  getInitialState: function() {
    return {
      coders: this.props.initialCoders,
    };
  },
  
  render: function() {

    this.state.coders.sort(function(a, b) { 
      return b.score - a.score;
    });

    return (
      <div className="scoreboard">
        <Header title={this.props.title} coders={this.state.coders} />
      
        <div className="coders">
          {this.state.coders.length > 0 && this.state.coders.map(function(coder, index) {
            return (
              <Coder 
                name={coder.name} 
                score={coder.score} 
                key={coder.id} />
            );
          }.bind(this))}

          {this.state.coders.length === 0 && 
            <div className={'coder-zero'}>No coders added.</div>
          }

        </div>
      </div>
    );
  }
});  


ReactDOM.render(<Application initialCoders={CODERS}/>, document.getElementById('container'));
