import React, { useEffect, useRef, useState } from 'react';
import { View, Picker, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, useWindowDimensions, Animated } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { TypingAnimation } from 'react-native-typing-animation';
import { Configuration, OpenAIApi } from "openai";

const darkGreen = "rgb(38, 55, 51)";
const green = "rgb(41, 93, 78)";






const Message = ({ el, i, mess }) => {

  const scale = useRef(new Animated.Value(0)).current;

  const animScale = () => {
    Animated.spring(scale, {
      bounciness: 14,
      toValue: 1,
      speed: 3,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Animated.View
      onLayout={() => {
        animScale();
      }}
      style={{ maxWidth: "80%", marginTop: 10, padding: el.type == 2 ? 0 : 10, borderRadius: 10, backgroundColor: el.type == 0 ? green : darkGreen, alignSelf: el.type == 0 ? "flex-end" : "flex-start", transform: [{ scale: scale }] }}>
      {el.type == 2 && i == mess.length - 1 &&
        <View style={{ width: 50, height: 40, borderRadius: 10, backgroundColor: darkGreen }}>
          <TypingAnimation
            dotColor={"white"}
            dotMargin={5}
            dotAmplitude={3}
            dotSpeed={0.15}
            dotRadius={4}
            dotX={12}
            dotY={8}
            style={{ position: "absolute", top: 10, left: 10 }}
          />
        </View>
      }
      <Text style={{ fontWeight: "500", color: "white" }}>{el.content}</Text>
    </Animated.View>
  )
}

export const SearchArea = ({ chat, setChat, setType }) => {

  const [query, setQuery] = useState("");
  const { height } = useWindowDimensions()
  const [h, setH] = useState(height - 15 - 15 - 50);

  const [mess, setMess] = useState([]);
  const [openai, setOpenai] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const gatherResponse = async () => {
      setMess((old) => [...old, { type: 2, content: "" }])

      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: chat
      });
      const resp = response.data.choices[0].message.content;

      setMess((old) => [...old, { type: 1, content: resp }])
      setLoading(false);
    }

    if (mess.length != 0 && mess[mess.length - 1].type == 0) {
      gatherResponse();
    }
  }, [chat])


  useEffect(() => {
    const configuration = new Configuration({
      apiKey: "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"
    });
    setOpenai(new OpenAIApi(configuration))
  }, [])

  useEffect(() => {

    if (mess.length != 0 && mess[mess.length - 1].type == 0) {
      setLoading(true)
      setChat((old) => [...old, {
        "role": "user",
        "content": mess[mess.length - 1].content,
      }])
    }

  }, [mess.length])

  const textOpacity = useRef(new Animated.Value(1)).current;
  const hideText = () => {
    Animated.timing(textOpacity, {
      duration: 800,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      setMess((old) => [...old, { type: 0, content: query }])
    })
  }

  const messScrollRef = useRef(null)
  return (
    <View style={{ width: "100%", alignItems: "center", paddingTop: textOpacity._value == 0 ? 0 : 0.25 * height, }}>
      {textOpacity._value != 0 && <Animated.Text style={{ fontSize: 45, textAlign: "center", fontWeight: "bold", opacity: textOpacity, color: darkGreen }}>{`Econos ChatBot`}</Animated.Text>}
      {textOpacity._value == 0 && <ScrollView onContentSizeChange={() => messScrollRef.current.scrollToEnd({ animated: true })} ref={messScrollRef} style={{
        minWidth: 400,
        maxWidth: 600,
        width: "50vw",
        marginTop: 50,
        paddingHorizontal: 15,
        paddingBottom: 10,
        height: textOpacity._value == 0 ? "calc(100vh - 80px - 77px - 100px)" : null // top bar (80px) | search bar (57px + 20px de margin)
      }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-end',
        }}
      >
        {
          mess.map((el, i) => {
            return <Message key={i} el={el} i={i} mess={mess} />
          })
        }
      </ScrollView>}
      <View style={{ flexDirection: "row", marginTop: 50 }}>
        <Entypo name="magnifying-glass" size={26} color={green} style={{ position: "absolute", top: 14, left: 14 }} />
        <TextInput
          editable={!loading}
          placeholder="Ask you're question"
          value={query}
          onChange={(e) => setQuery(e.nativeEvent.text)}
          placeholderTextColor={darkGreen}
          style={{
            marginBottom: 20,
            outline: "none",
            padding: 20,
            paddingLeft: 20 + 30,
            borderRadius: 20,
            minWidth: 400,
            maxWidth: 600,
            width: "50vw",
            // shadowColor: "#000",
            shadowColor: darkGreen,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.4,
            shadowRadius: 7,
            fontWeight: "500"
          }}
          onSubmitEditing={() => {
            if (textOpacity._value == 1) {
              setQuery("");
              hideText();
            } else {
              setQuery("");
              setMess((old) => [...old, { type: 0, content: query }])
            }
            // setH((old) => old+500)
          }}
        />
      </View>
    </View>
  )
}


