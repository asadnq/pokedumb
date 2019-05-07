import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Input, Button, Text, Badge } from 'react-native-elements'
import { connect } from 'react-redux'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import { getPokemonTypes } from '../store/actions/pokemon_type';
import { getCategories } from '../store/actions/pokemon_category';
import { filterPokemon } from '../store/actions/pokemon'

export class FilterPokemon extends Component {
    constructor() {
        super();
        this.state = {
            selectedTypes: [],
            selectedCategory: []
        }
    }

    _selectTypeHandler = (types) => {
        this.setState({selectedTypes: types});
        console.log(types)
        console.log(this.state.selectedTypes)
    }

    _selectCategoryHandler = category => {
        this.setState({selectedCategory: category})
        console.log('category',category)
        console.log('category state', this.state.selectedCategory)
    }

    _onApplyFilter = () => {
        const { selectedCategory, selectedTypes } = this.state
        this.props.navigation.state.params.filter();
        this.props.filterPokemon(selectedCategory, selectedTypes)
        this.props.navigation.navigate('Home');
    }


  componentDidMount() {
    this.props.getPokemonTypes();
    this.props.getCategories();
  }

  render() {
    return (
        <View>
            <Text h3>Filter Pokemon</Text>
            <View style={{flexDirection: 'column' , height: '90%'}}>
               <SectionedMultiSelect
                    items={this.props.pokemon_types}
                    uniqueKey="id"
                    onSelectedItemsChange={this._selectTypeHandler} 
                    showCancelButton={true}
                    selectedItems={this.state.selectedTypes}
               />
                <SectionedMultiSelect
                    items={this.props.pokemon_categories}
                    uniqueKey="id"
                    onSelectedItemsChange={this._selectCategoryHandler}
                    showCancelButton
                    single
                    selectedItems={this.state.selectedCategory}
                    />
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end',flex: 1}}>
                <Button title='cancel' style={{width: '45%', borderRadius: 30}} containerStyle={{width: '45%'}}/>
                <Button title='apply' containerStyle={{width: '45%'}} onPress={this._onApplyFilter} />
            </View>
            </View>
        </View>
    )
  }
}

const mapState = state => {
    return {
        pokemon_types: state.pokemon_type.pokemon_types,
        pokemon_categories: state.pokemon_category.categories
    }
}

export default connect(mapState, { getPokemonTypes, getCategories, filterPokemon})(FilterPokemon)
