import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  ScrollView,
} from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
} from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ListParentJardin = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(
        `${url}/api/bonplan/site/${id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.bonPlan);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);

  const id = props.navigation.getParam("id");
  console.log(id);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(
        `${url}/api/parent/jardin/${id}`
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.existingParent);
    };
    sendRequest();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {list &&
        list.map((row) => (
          <ListItem avatar>
            <Body>
              <Text>{row.nom}</Text>
              <Text>{row.prenom}</Text>
              <Text note>{row.email}</Text>
            </Body>
            <Right>
              <AntDesign
                name="message1"
                size={25}
                color="#1565c0"
                onPress={() => {
                  props.navigation.navigate({
                    routeName: "ChatParentParent",
                    params: {
                      id: row._id,
                    },
                  });
                }}
              />
            </Right>
          </ListItem>
        ))}
    </ScrollView>
  );
};

ListParentJardin.navigationOptions = (navData) => {
  return {
    headerTitle: "Parents inscrit",
  };
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
  },
  MealRow: {
    flexDirection: "row",
  },
  mealHeader: {
    height: "85%",
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 20,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    textAlign: "center",
  },
});

export default ListParentJardin;
