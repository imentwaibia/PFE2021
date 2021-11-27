import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Picker,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  CheckBox,
  Button,
} from "react-native";
import { Textarea, Input } from "native-base";
import IconEntypo from "react-native-vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import mime from "mime";
import { Authcontext } from "../context/auth-context";

const Reclamation = (props) => {
  const [sujet, setSujet] = useState();
  const [description, setDescription] = useState();
  const [selectedValue, setSelectedValue] = useState();

  const auth = useContext(Authcontext);

  const submit = async () => {
    let response = await fetch(
      "http://192.168.0.104:5000/api/reclamation/ajout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sujet: sujet,
          description:description,
          jardinId:selectedValue,
          parentId:auth.userId
        }),
      }
    );

    if (!response.ok) {
      let responsedata = await response.json();
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);

      throw new Error(responsedata.message);
    }

    let responsedata = await response.json();
    Alert.alert(
      "Message",
      "votre demande est enregistrer, vous recevez une réponce bientot",
      [{ text: "fermer" }]
    );
  };

  const [list, setList] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(`http://192.168.0.104:5000/api/jardin`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.existingJardin);
    };
    sendRequest();
  }, []);

  console.log(list);

  return (
    <View>
      <ScrollView>
        <View style={{ marginRight: 20 }}>
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, marginTop: 10, marginLeft: "0%" }}>
              Sujet
            </Text>

            <Input
              placeholder="Sujet"
              value={sujet}
              onChangeText={(text) => {
                setSujet(text);
              }}
            />
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, marginTop: 10, marginLeft: "0%" }}>
              Reclamation
            </Text>

            <Textarea
              rowSpan={5}
              bordered
              placeholder="Description"
              value={description}
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, marginTop: 10, marginLeft: "0%" }}>
              Jardin
            </Text>

            {list && (
              <Picker
                selectedValue={selectedValue}
                style={{ height: 60, width: 250, marginLeft: "0%" }}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                {list.map((row) => (
                  <Picker.Item label={row.nom} value={row._id} />
                ))}
              </Picker>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Envoyer"
            color="#0086c3"
            onPress={() => {
              submit();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

Reclamation.navigationOptions = {
  headerTitle: "Reclamation",
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "80%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  checkbox: {
    alignSelf: "center",
  },
});

export default Reclamation;
