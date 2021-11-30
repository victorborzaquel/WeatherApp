import { BorderlessButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container = styled.View<{IsDayTime: boolean}>`
  flex: 1;
  background-color: ${({IsDayTime}) => IsDayTime ? '#fff' : '#555'};
  padding: 10px;
`;

export const LocalizedName = styled.Text`
  font-size: 29px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const Weather = styled.View`
  flex-direction: row;
  width: 100%;
  padding-top: 14px;
`;

export const WeatherIcon = styled.Image`
  width: 80px;
  height: 100%;
`;

export const Content = styled.View`
  padding-left: 10px;
  flex: 1;
`;

export const WeatherText = styled.Text`
  font-size: 22px;
`;

export const Temperature = styled.View`
  flex-direction: row;
`;

export const TemperatureValue = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export const TemperatureUnit = styled.Text`
  font-size: 14px;
`;

export const DeleteButton = styled.TouchableOpacity`
  /* background-color: #b31515;
  width: 30px;
  height: 30px;
  border-radius: 15px; */
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
`;