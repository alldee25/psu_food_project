class MyAppHeaderText extends Component {
    render() {
      return (
        <MyAppText > 
          <Text style={{fontWeight:'bold',fontSize:30}}>
            {this.props.children}
          </Text>
        </MyAppText>
      );
    }
  }