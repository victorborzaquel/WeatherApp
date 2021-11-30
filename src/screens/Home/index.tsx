import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  AddCityButton,
  ConditionsList,
  Container
} from './styles';
import { Alert, Button, StyleSheet } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../../routes';
import { shadow } from '../../styles/shadow';
import { api } from '../../services/api';
import { ICity, ICityResponse, ICurrentConditionsResponse } from '../../interfaces';
import { ConditionsItem } from '../../components/ConditionsItem';
import { Separator } from '../../components/Separator';
import { Loader } from '../../components/Loader';

const { STORAGE_KEY } = process.env
const { API_KEY } = process.env

export function Home() {
  const [conditions, setConditions] = useState([] as ICity[])
  const [load, setLoad] = useState(false)
  const navigation = useNavigation<RootNavigationProps<'Home'>>()
  const isFocused = useIsFocused()

  function handleAddCity() {
    navigation.navigate('AddCity')
  }

  async function handleDeleteCity(Key: string) {
    try {
      const filteredConditions = conditions.filter(condition => condition.city.Key !== Key)
      const updatedStorage = filteredConditions.map(condition => condition.city)

      await AsyncStorage.setItem(STORAGE_KEY!, JSON.stringify(updatedStorage))

      setConditions(filteredConditions)
    } catch (error) {
      Alert.alert('Ops', 'Não foi possivel deletar a cidade!')
    }
  }

  useEffect(() => {
    setLoad(true)
    let isActive = true
    const ac = new AbortController()

    async function getStorageData() {
      // AsyncStorage.clear()
      try {
        const storageData = await AsyncStorage.getItem(STORAGE_KEY!) || '[]'
        if (isActive) {
          const cities = JSON.parse(storageData) as ICityResponse[]

          const storageKeys = cities.reduce((acc, curr) => [...acc, curr.Key], [] as string[]).sort()
          const currentKeys = conditions.reduce((acc, curr) => [...acc, curr.city.Key], [] as string[]).sort()

          const isAddCity = !storageKeys.every((key, index) => key === currentKeys[index])

          const searchDate = new Date().setMinutes(0, 0, 0)
          const spent1HourLastSearch = searchDate !== conditions[0]?.searchDate
          if (isAddCity || spent1HourLastSearch) {

            const citiesConditions = await Promise.all(cities.map(async (city) => {
              const response = await api.get<ICurrentConditionsResponse[]>(`/currentconditions/v1/${city.Key}`, {
                params: {
                  apikey: API_KEY,
                  language: 'pt-br'
                }
              })

              if (response.status === 200) {
                return { city, searchDate, conditions: { ...response.data[0] } }
              } else {
                return { city, searchDate, conditions: undefined }
              }
            }))

            setConditions(citiesConditions)
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoad(false)
      }
    }

    if (isFocused) {
      getStorageData()
    }

    return () => {
      isActive = false
      ac.abort()
    }
  }, [isFocused])

  return (
    <Container>
      <AddCityButton style={shadow} onPress={handleAddCity}>
        <Feather name="plus" size={25} color="white" />
      </AddCityButton>

      {load
        ? <Loader/>
        : <ConditionsList
          keyExtractor={item => item.city.Key}
          data={conditions}
          contentContainerStyle={{paddingBottom: 100}}
          renderItem={({ item }) => (
            <ConditionsItem
              data={item}
              deleteCity={handleDeleteCity}
            />
          )}
          ItemSeparatorComponent={() => <Separator />}
        />}
    </Container>
  );
}
