import React, { Component } from 'react';
import { Card, Image, Heading, Flex, Box } from 'rebass';
import { Label, Radio } from '@rebass/forms'


class Cat extends Component{

    constructor(props) {
        super(props);
   }

    render(){
   return <Card width={[ 512, 512 ]} mx='auto' sx={{ p: 1, borderRadius: 2, boxShadow: '0 0 16px rgba(0, 0, 0, .25)'}}>
                     <Image sx={{ width: [ '100%', '100%' ], borderRadius: 8,}} src={this.props.pictureUrl} />
                     <Heading><Label width={[ 1/2, 1/4 ]} p={2} >
                            <Radio id={this.props.id} name='cat' value={this.props.id} onChange={this.props.onChangeValue} checked={this.props.isVoted} />
                            Cat {this.props.id}
                     </Label></Heading>
                 </Card>}

}

class Match  extends Component {

    constructor() {
    super();
    this.state = { match:
                        {user: {id: null},
                         cat1: {id: null, pictureUrl: null, nbVotes: null},
                         cat2: {id: null, pictureUrl: null, nbVotes: null},
                         catVoted: {id: null, pictureUrl: null, nbVotes: null}},
                 error: null,
                 isLoaded: false };

    this.onChangeValueCat = this.onChangeValueCat.bind(this);

    if(process.env.NODE_ENV === 'development'){
        this.api_host = process.env.REACT_APP_API_HOST_DEV;
    }
    else{
        if(process.env.NODE_ENV === 'production'){
              this.api_host = process.env.REACT_APP_API_HOST_PROD;
        }else{
              this.api_host = process.env.REACT_APP_API_HOST_TEST;
        }
    }
    }

  async componentDidMount() {
      this.updateMatch();
  }

  async updateMatch() {
      await fetch(this.api_host+"user", {credentials: 'include'});
      const response = await fetch(this.api_host+"cats/match" , {credentials: 'include'});
      const match = await response.json();
      this.setState({isLoaded:true})
      if(response.error){
        this.setState({error: response.error});
      }
      else{
        this.setState({match: match});
      }
   }

  async onChangeValueCat(event) {
      await fetch(this.api_host+"user", {credentials: 'include'});
      const response = await fetch(this.api_host+"cats/match/vote" ,
            {method: 'POST',
            credentials: 'include',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ catId1: this.state.match.cat1.id,
                                    catId2: this.state.match.cat2.id,
                                    catIdVoted: event.target.value})
             });

      const match = await response.json();
      if(response.error){
        this.setState({error: response.error});
      }
      else{
        this.setState({match: match});
        this.updateMatch();
      }

  }

  render(){if (this.state.error) {
      return <div>Erreur : {this.state.error.message}</div>;
      } else if (!this.state.isLoaded) {
          return <div>Chargement...</div>;
        } else {
      return <div>

      <Box >
           <Flex mx={-2} flexWrap='wrap'>
       <Box sx={{maxWidth: 512, mx: 'auto', px: 3}}>
        <Cat id={this.state.match.cat1.id} pictureUrl={this.state.match.cat1.pictureUrl}
         isVoted={this.state.match.catVoted!=null && this.state.match.catVoted.id===this.state.match.cat1.id}
          onChangeValue = {this.onChangeValueCat}/>
       </Box>
       <Box sx={{maxWidth: 512, mx: 'auto', px: 3}}>
        <Cat id={this.state.match.cat2.id} pictureUrl={this.state.match.cat2.pictureUrl}
         isVoted={this.state.match.catVoted!=null && this.state.match.catVoted.id===this.state.match.cat2.id}
          onChangeValue = {this.onChangeValueCat}/>
        </Box>
           </Flex>
       </Box></div>


    }
  }

}



export {Match, Cat};