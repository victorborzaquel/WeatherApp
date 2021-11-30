import React, { useState } from 'react';
import { ActivityIndicator, Alert, Keyboard } from 'react-native';
import { CityItem } from '../../components/CityItem';
import { Separator } from '../../components/Separator';
import { ICityResponse } from '../../interfaces';
import { api } from '../../services/api';
import { shadow } from '../../styles/shadow';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  CitiesList,
  Container, Header, Search, SearchButton, SearchButtonText, SearchContent
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../../routes';
import { Loader } from '../../components/Loader';

const { STORAGE_KEY } = process.env
const { API_KEY } = process.env

export function AddCity() {

  const [city, setCity] = useState('')
  const [citiesResponseList, setCitiesResponseList] = useState([] as ICityResponse[])

  const [loadSearch, setLoadSearch] = useState(false)
  const [loadAddCity, setLoadAddCity] = useState(false)

  const navigation = useNavigation<RootNavigationProps<'AddCity'>>()

  async function citySearch() {
    setLoadSearch(true)
    try {
      const response = await api.get<ICityResponse[]>('/locations/v1/cities/autocomplete', {
        params: {
          apikey: API_KEY,
          q: city,
          language: 'pt-br'
        }
      })

      if (response.status === 200) {
        setCitiesResponseList(response.data)
      } else {
        Alert.alert('Ops','Cidade não encontrada!')
      }
    } catch (error) {
      Alert.alert('Ops','Não foi possivel se conectar com o servidor!')
      console.log(error)
    } finally {
      setLoadSearch(false)
      Keyboard.dismiss()
    }
  }

  async function handleAddCity(city: ICityResponse) {
    setLoadAddCity(true)
    try {
      const storageData = await AsyncStorage.getItem(STORAGE_KEY!) || '[]'

      const cities = JSON.parse(storageData) as ICityResponse[]

      if (cities.some(c => c.Key === city.Key)) {
        return Alert.alert(
          'Ops',
          'Você já tem essa cidade adicionada!',
          [
            {
              text: "Voltar",
              onPress: () => navigation.navigate('Home'),
              style: 'cancel'
            },
            {
              text: 'Adicionar outra',
              onPress: () => setLoadAddCity(false),
              style: 'default'
            }
          ]
        )
      }

      cities.push(city)

      await AsyncStorage.setItem(STORAGE_KEY!, JSON.stringify(cities))
      navigation.navigate('Home')
    } catch (error) {
      Alert.alert('Ops','Não foi possivel adicionar a cidade!')
    } 
  }

  return (
    <Container>
      <Header>
        <SearchContent style={shadow}>
          <Search
            placeholder="Cidade"
            value={city}
            onChangeText={setCity}
          />

          <SearchButton onPress={citySearch} disabled={loadSearch}>
            {loadSearch
              ? <ActivityIndicator size="small" color="black" />
              : <SearchButtonText>Pesquisar</SearchButtonText>
            }
          </SearchButton>
        </SearchContent>
      </Header>

      {loadAddCity
        ? <Loader />
        : <CitiesList
          keyExtractor={item => item.Key}
          data={citiesResponseList}
          renderItem={({ item }) => <CityItem onPress={() => handleAddCity(item)} data={item} />}
          ItemSeparatorComponent={() => <Separator />}
          contentContainerStyle={{ padding: 10, paddingTop: 20 }}
        />
      }
    </Container>
  );
}
