import React, { useEffect, useRef, useState } from 'react';
import { View, Picker, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, useWindowDimensions, Animated, InputAccessoryView } from 'react-native';
import { useNavigation } from "@react-navigation/native";

// TODO
// if no data, next not clickable
// auto close modal
import { SearchArea } from './chatbot.js';
import { DATA } from './data.js'




export function Form({ }) {
  const navigation = useNavigation()


  const titles = ["Stationary Combustion", "Mobile combustion", "Fugitive emissions"];

  //const for title of form
  const [index, setIndex] = useState(0);
  const [title, setTitle] = useState(titles[index]);


  const array_ini = DATA[titles[index]];
  //const for options to display and option selected stored in a dict
  const [options, setOptions] = useState(array_ini);
  const [selectedDict, setSelectedDict] = useState({})
  const [selectedValue, setSelectValue] = useState(); //dsiplay on the form

  //const for result input 
  const [resultsModal, setResultModal] = useState(false);

  const [numInput, setNumInput] = useState(false);


  //store result
  const [results, setResults] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [storedKeys, setStoredKeys] = useState([]);

  //array of dict sent to make graphs | 0 : fugitive - 1 : mobile - 2 : stationary
  //the sous categories are the keys which are an arrays  
  const [dataGraph, setDataGraph] = useState([]);





  useEffect(() => {
    setSelectedDict(options[0]) 
    console.log("options useeffect: ",options)
    if (Object.keys(options[0]) == "input"){
      setNumInput(true);
    }
  }, [options])




  useEffect(() => {
    console.log("datagraph: ", dataGraph)
  }, [dataGraph]);


  const handleSubmit = () => {
    let key = Object.keys(selectedDict);
    console.log("option handle submit", options)
    console.log("selected dict", selectedDict)

      const newStoredKey = [...storedKeys, key];
      setStoredKeys(newStoredKey);
      setOptions(DATA[key]);
    
  };

  const handleCalulate = () => {
    if (results.length === 0) {
      setResultModal(true);
    }
    const coef = Object.values(options[0])
    const result = coef * inputValue;
    var result_dict = { [storedKeys]: result };
    if (index == 2) {
      result_dict = { [key]: result }
    }
    const newResults = [...results, result_dict];
    setStoredKeys([]);
    setResults(newResults); //store result in dict 
    setOptions(array_ini)
    setNumInput(false);
    setShowModal(false)
  };

  const handleNext = () => {
    if (index == 0) {
      setStationaryCombustion(results);
    } else if (index == 1) {
      setMobileCombustion(results);
    }


    if (index >= titles.length - 1) {
      const newDataGraph = [...dataGraph, results];
      navigation.navigate("graph", { data: newDataGraph });
    } else {
      const newDataGraph = [...dataGraph, results];
      setDataGraph(newDataGraph);
      const newIndex = index + 1;
      setTitle(titles[newIndex]);
      setIndex(newIndex);
      setSelectedDict({});
      setResults([]);
      setOptions(DATA[titles[newIndex]]);
    }

  };


  const [showChat, setShowChat] = useState(false);

  const handleChatModal = () => {
    setShowChat(!showChat);
  };


  const [chat, setChat] = useState([{
    "role": "system", "content":
      `You are an environmental assistant.
      You are respectfull and polite.
      Give simple explications.
    `}])

  const [type, setType] = useState("");
  // Arthur's code
  const [showModal, setShowModal] = useState(false);
  const [stationaryCombustion, setStationaryCombustion] = useState();
  const [mobileCombustion, setMobileCombustion] = useState();

  return (
    <View style={{ minHeight: "100vh", width: "100vw", backgroundColor: "white", padding: 30 }}>
      <TouchableOpacity style={{ padding: 10, backgroundColor: "green", marginLeft: 20, borderRadius: 10, position: "absolute", bottom: 40, right: 40 }} onPress={handleNext}>
        <Text style={{ color: "white", fontWeight: "600" }}>{index == 2 ? "Show graphs ->" : "Next ->"}</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row",}}>
        <Text style={{ fontWeight: "700", fontSize: 32 }} >Your emission sources</Text>
        <TouchableOpacity style={{ padding: 10, backgroundColor: "green", marginLeft: 20, borderRadius: 10 }} onPress={() => setShowModal(true)}>
          <Text style={{ color: "white", fontWeight: "600" }}>Add an emission source</Text>
        </TouchableOpacity>
      </View>

      {
        stationaryCombustion && (
          <View>
            <Text style={{ fontWeight: "600", fontSize: 22, marginTop: 20, marginBottom: 10,  }}>Stationary Combustion</Text>
            
            {
              <View style={{ flexDirection: "row",}}>
                {stationaryCombustion.map((result, index) => {
                  return (
                    <View key={index} style={{
                      padding: 10, alignItems: "center", borderRadius: 10,
                      shadowColor: '#000',
                      shadowOpacity: 0.3,
                      shadowRadius: 4,
                      backgroundColor: "white",
                      flexDirection: "row",
                      marginRight: 20
                    }}>
                      <View style={{ alignItems: "center" }}>
                        <Text style={{ fontWeight: "600" }}>{Object.keys(result)[0]}</Text>
                        <Text style={{ opacity: 0.9 }}>
                          {Number(Object.values(result)[0]).toFixed(2) + " NaN"}
                        </Text>
                      </View>
                      <Text style={{ marginLeft: 20, fontWeight: "600" }}>X</Text>
                    </View>
                  )
                })}
              </View>
            }
          </View>
        )
      }
      {
        mobileCombustion && (
          <View>
            <Text style={{ fontWeight: "600", fontSize: 22, marginTop: 20, marginBottom: 10 }} >Mobile Combustion</Text>
            {
              <View style={{ flexDirection: "row" }}>
                {mobileCombustion.map((result, index) => {
                  return (
                    <View key={index} style={{
                      padding: 10, alignItems: "center", borderRadius: 10,
                      shadowColor: '#000',
                      shadowOpacity: 0.3,
                      shadowRadius: 4,
                      backgroundColor: "white",
                      flexDirection: "row",
                      marginRight: 20
                    }}>
                      <View style={{ alignItems: "center" }}>
                        <Text style={{ fontWeight: "600" }}>{Object.keys(result)[0]}</Text>
                        <Text style={{ opacity: 0.9 }}>
                          {Number(Object.values(result)[0]).toFixed(2) + " NaN"}
                        </Text>
                      </View>
                      <Text style={{ marginLeft: 20, fontWeight: "600" }}>X</Text>
                    </View>
                  )
                }
                )}
              </View>

            }
          </View>
        )
      }


      <View style={{ marginTop: 25 }}>
        <Text style={{ fontWeight: "600", fontSize: 22, marginBottom: 10 }}>{title}</Text>
        {
          results.length !== 0 ? (
            <View style={{ flexDirection: "row" }}>
              {results.map((result, index) => {
                return (
                  <View key={index} style={{
                    padding: 10, alignItems: "center", borderRadius: 10,
                    shadowColor: '#000',
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    backgroundColor: "white",
                    flexDirection: "row",
                    marginRight: 20
                  }}>
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ fontWeight: "600" }}>{Object.keys(result)[0]}</Text>
                      <Text style={{ opacity: 0.9 }}>
                        {Number(Object.values(result)[0]).toFixed(2) + " NaN"}
                      </Text>
                    </View>
                    <Text style={{ marginLeft: 20, fontWeight: "600" }}>X</Text>
                  </View>
                )
              })}
            </View>
          )
            :
            (
              <Text>No emission added for now</Text>
            )
        }
      </View>

      {
        showModal && (
          <View style={{ height: "100vh", width: "100vw", justifyContent: "center", alignItems: "center", zIndex: 1, position: "absolute", top: 0, left: 0 }}>
            <View style={{}}>
              <TouchableOpacity onPress={() => setShowModal(false)} style={{ position: "absolute", top: 20, right: 20 }}>
                <Text>Close</Text>
              </TouchableOpacity>
              <Text style={{ fontWeight: "600", fontSize: 24, marginBottom: 20,}}>{title}</Text>


              <Picker
                style={styles.picker}
                selectedValue={selectedValue}
                onValueChange={(item, index) => {
                  setSelectValue(item)
                  setSelectedDict(options[index])
                }}
              >
                {options.map((option, index) => (
                  <Picker.Item
                    value={Object.keys(option)[0]}
                    label={Object.values(option)[0]}
                    key={index}
                  />
                ))}

              </Picker>

              {numInput === true && (
                <TextInput
                  style={styles.input}
                  placeholder="Enter a number"
                  keyboardType="numeric"
                  value={inputValue}
                  onChangeText={(text) => setInputValue(text)}

                />
              )}

              {numInput === false && (
                <TouchableOpacity style={{ padding: 10, backgroundColor: "green", borderRadius: 10 }} onPress={handleSubmit}>
                  <Text style={{ color: "white", fontWeight: "600", textAlign: "center" }}>Next</Text>
                </TouchableOpacity>
              )}

              {numInput === true && (
                <TouchableOpacity style={{ padding: 10, backgroundColor: "green", borderRadius: 10 }} onPress={handleCalulate}>
                  <Text style={{ color: "white", fontWeight: "600", textAlign: "center" }}>Calculate</Text>
                </TouchableOpacity>
              )}


            </View>
          </View>

        )
      }
      {showChat ?
       
          <ScrollView style={{ height: "50vh" }}>
            <View>
              <TouchableOpacity style={styles.buttonBot} onPress={handleChatModal}>
                <Text style={styles.buttonText}>close</Text>
              </TouchableOpacity>
              <SearchArea chat={chat} setChat={setChat} setType={setType} />
            </View>
          </ScrollView>
          :
          <TouchableOpacity style={styles.buttonBot} onPress={handleChatModal}>
            <Text style={styles.buttonText}>ChatBot</Text>
          </TouchableOpacity>
          }

    </View>
  );
};



const styles = StyleSheet.create({
  containerForm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    paddingHorizontal: 70,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  result: {
    marginHorizontal: 2,

  },
  results: {
    flexDirection: 'row',
    padding: 10,
    width: '25%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // Center vertically
    borderColor: '#FF4500',
    backgroundColor: '#FF4500',
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },

  picker: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,

  },

  buttonBot: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    marginBottom: 50,
    width: 100,
    marginLeft: '80%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },

  button: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginHorizontal: '30%',
  },
  buttonNext: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    marginBottom: 50,
    width: 100,
    marginLeft: '80%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  result: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
});


