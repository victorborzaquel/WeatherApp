import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Alert } from 'react-native';
import { ICity } from '../../interfaces';

import {
  Container,
  Content,
  DeleteButton,
  LocalizedName,
  Temperature,
  TemperatureUnit,
  TemperatureValue,
  Weather,
  WeatherIcon,
  WeatherText
} from './styles';

export function ConditionsItem({ data, deleteCity }: {
  data: ICity;
  deleteCity(key: string): void;
}) {
  const uri = `https://developer.accuweather.com/sites/default/files/${String(data.conditions?.WeatherIcon || '1').padStart(2, '0')}-s.png`

  function handleDeleteCity() {
      Alert.alert(
        'Essa ação não podera ser desfeita!',
        `Tem certeza que quer deletar a cidade: ${data.city.LocalizedName}?`,
        [
          {
            text: 'Deletar',
            onPress: () => deleteCity(data.city.Key),
            style: 'default'
          },
          {
            text: "Cancelar",
            style: 'cancel'
          }
        ]
      )
    
  }

  return (
    <Container IsDayTime={data.conditions?.IsDayTime || true}>
      <LocalizedName>{data.city.LocalizedName}</LocalizedName>

      <Weather>
        <WeatherIcon source={{ uri }} width={150} height={90} resizeMode='contain' />

        <Content>
          <WeatherText>{data.conditions?.WeatherText}</WeatherText>

          <Temperature>
            <TemperatureValue>{data.conditions?.Temperature.Metric.Value}</TemperatureValue>
            <TemperatureUnit>{data.conditions?.Temperature.Metric.Unit}</TemperatureUnit>
          </Temperature>
        </Content>

        <DeleteButton onPress={handleDeleteCity}>
          <Feather name="trash-2" size={25} color="#b31515" />
        </DeleteButton>
      </Weather>
    </Container>
  );
}