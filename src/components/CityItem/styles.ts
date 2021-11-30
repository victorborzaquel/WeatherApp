import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container = styled(RectButton)`
  width: 100%;
  flex: 1;
  flex-shrink: 1;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 10px;
`;

export const LocalizedName = styled.Text`
  font-size: 24px;
  padding-right: 20px;
`;

export const Details = styled.View`
  flex-direction: row;
  align-items: flex-end;
  padding-top: 5px;
`;

export const Country = styled.Text`
  font-size: 16px;
  font-weight: bold;
  padding-right: 17px;
`;

export const AdministrativeArea = styled.Text`
  font-size: 16px;
`;