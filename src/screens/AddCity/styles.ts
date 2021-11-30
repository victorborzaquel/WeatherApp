import { FlatList } from "react-native";
import styled from "styled-components/native";
import { ICityResponse } from "../../interfaces";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 10px;
  margin-bottom: -20px;
`;

export const SearchContent = styled.View`
  flex-direction: row;
  background-color: #fff;
  border-radius: 10px;
`;

export const Search = styled.TextInput`
  flex: 1;
  padding: 10px 15px;
`;

export const SearchButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  width: 90px;
  align-items: center;
  justify-content: center;
  background-color: #99ff99;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const SearchButtonText = styled.Text`
  
`;

export const CitiesList = styled.FlatList`
  flex: 1;
` as unknown as new () => FlatList<ICityResponse>;