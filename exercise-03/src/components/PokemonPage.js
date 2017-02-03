import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import PokemonCard from './PokemonCard'

class PokemonPage extends React.Component {

  render(){
    if(this.props.data.loading){
      return(<div>Loading</div>)
    }
    if(this.props.data.error){
      console.log(this.props.data.error)
      return (<div>An error occurred</div>)
    }
    return (
      <div>
        <PokemonCard pokemon={this.props.data.Pokemon} handleCancel={this.goBack} />
      </div>
    )
  }
  goBack = () => {
    this.props.router.replace('/')
  }
}

//we use this id and fetch the pokemon then render the pokemon 
const PokemonQuery = gql`query PokemonQuery($id: ID!) {
  Pokemon(id: $id) {
    id
    url
    name
  }
}`

const PokemonPageWithQuery = graphql(PokemonQuery, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.params.pokemonId
    }
  })
})(withRouter(PokemonPage))

export default PokemonPageWithQuery
