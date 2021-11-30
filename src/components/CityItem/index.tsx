import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { ICityResponse } from '../../interfaces';

import {
  AdministrativeArea,
  Container, Country, Details, LocalizedName
} from './styles';

export function CityItem({ data, ...rest }: { 
  data: ICityResponse;
} & RectButtonProps) {
  return (
    <Container {...rest}>
      <LocalizedName>{data.LocalizedName}</LocalizedName>

      <Details>
        <Country>{data.Country.LocalizedName}</Country>

        <AdministrativeArea>{data.AdministrativeArea.LocalizedName}</AdministrativeArea>
      </Details>
    </Container>
  );
}
