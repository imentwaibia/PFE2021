import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import { View, ScrollView, Text, StyleSheet, Alert } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Container, Header, Content, Button, Item, Input } from "native-base";
import LandingGrid from "../components/landingGrid";
import { Authcontext } from "../context/auth-context";

const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const scrollViewRef = useRef();

  const auth = useContext(Authcontext);
  const id = props.navigation.getParam("id");

  useEffect(() => {
    setInterval(() => {
      const sendRequest = async () => {
        try {
          const response = await fetch(
            `http://192.168.0.104:5000/api/message/parent/${auth.userId}`
          );

          const responseData = await response.json();
          if (!response.ok) {
            throw new Error(responseData.message);
          }

          setMessages(responseData.messages);
        } catch (err) {
          seterror(err.message);
        }
      };
      console.log(messages);

      sendRequest();
    }, 2000);
  }, []);

  const addMessage = async () => {
    setText();
    const p = {
      text: text,
      idSender: auth.userId,
      idRecever: id,
      jardinId: id,
      parentId: auth.userId,
    };
    setMessages(messages.concat(p));

    let response = await fetch("http://192.168.0.104:5000/api/message/ajout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        idSender: auth.userId,
        idRecever: id,
        jardinId: id,
        parentId: auth.userId,
      }),
    });

    if (!response.ok) {
      let responsedata = await response.json();
      Alert.alert("Message", responsedata.message, [{ text: "fermer" }]);
      throw new Error(responsedata.message);
    }
  };

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        <View style={{ marginTop: 600 }}>
          {messages &&
            messages.map((row) => (
              <View>
                {row.idSender === auth.userId
                  ? row.idRecever === id && (
                      <View
                        style={
                          row.idSender === auth.userId
                            ? {
                                flexDirection: "row-reverse",
                                alignContent: "flex-end",
                              }
                            : { marginLeft: 0 }
                        }
                      >
                        <LandingGrid
                          color={
                            row.idSender === auth.userId ? "#8e24aa" : "#4fc3f7"
                          }
                          title={row.text}
                        />
                      </View>
                    )
                  : row.idSender === id && (
                      <View
                        style={
                          row.idSender === auth.userId
                            ? {
                                flexDirection: "row-reverse",
                                alignContent: "flex-end",
                              }
                            : { marginLeft: 0 }
                        }
                      >
                        <LandingGrid
                          color={
                            row.idSender === auth.userId ? "#8e24aa" : "#4fc3f7"
                          }
                          title={row.text}
                        />
                      </View>
                    )}
              </View>
            ))}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Item rounded>
                <Input
                  placeholder="Message"
                  value={text}
                  onChangeText={(text) => {
                    setText(text);
                  }}
                />
              </Item>
            </View>
            <MaterialCommunityIcons
              name="send-circle"
              size={50}
              color="#1565c0"
              style={{ justifyContent: "space-evenly", marginVertical: 10 }}
              onPress={addMessage}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

ChatScreen.navigationOptions = {
  headerTitle: "Chat",
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
