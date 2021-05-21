import React, { Component } from "react";
import { Card, Image, Heading, Box} from 'rebass';


class Cat extends Component{

    constructor(props) {
        super(props);
   }

    render(){
   return <Card width={[ 400, 400 ]} mx='auto' sx={{ p: 1, borderRadius: 2, boxShadow: '0 0 16px rgba(0, 0, 0, .25)'}}>
                     <Image sx={{ width: [ '100%', '100%' ], borderRadius: 8,}} src={this.props.pictureUrl} />
                     <Heading>Cat {this.props.id} : {this.props.nbVotes} votes</Heading>
                 </Card>}

}

class Home extends Component {
    constructor() {
    super();
    this.state = { cats: [] };
    if(process.env.NODE_ENV === 'development'){
        this.api_host = process.env.REACT_APP_API_HOST_DEV;
    }
    else{
        if(process.env.NODE_ENV === 'production'){
              this.api_host = process.env.REACT_APP_API_HOST_DEV;
        }else{
              this.api_host = process.env.REACT_APP_API_HOST_TEST;
        }
    }
  }

  async componentDidMount() {
      await fetch(this.api_host+"user", {credentials: 'include'});
      const response = await fetch(this.api_host+"cats" , {credentials: 'include'});
      const cats = await response.json();
      this.setState({isLoaded:true})
      if(response.error){
        this.setState({error: response.error});
        }
      else{
        this.setState({cats: cats.sort((a, b) => a.nbVotes > b.nbVotes ? -1 : 1)});
        }
    }

  render(){
      if(this.state.error){
        return <div>Erreur : {this.state.error.message}</div>;
      }
      return <Box>
      {this.state.cats.map((cat, index) => (<Cat key={cat.id} id={cat.id} pictureUrl={cat.pictureUrl} nbVotes={cat.nbVotes}/>))}
        </Box>;}
}

export {Home, Cat};