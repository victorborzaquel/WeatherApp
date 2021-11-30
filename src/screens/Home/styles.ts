import { FlatList, TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { ICity, ICurrentConditionsResponse } from "../../interfaces";

export const Container = styled.View`
  flex: 1;
`;

export const AddCityButton = styled(RectButton)`
  width: 50px;
  height: 50px;
  background-color: #107e19;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: absolute;
  bottom: 30px;
  right: 30px;
  z-index: 99;
`;

export const ConditionsList = styled.FlatList`
  
` as unknown as new () => FlatList<ICity>;