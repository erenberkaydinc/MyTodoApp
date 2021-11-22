import { View, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import {Text, Card } from "react-native-elements";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Button } from "react-native-paper";
import db from "../firebase";
import Emoji from "react-native-emoji";
import { ActivityIndicator, Colors } from "react-native-paper";

const Details = ({ navigation, route }) => {
  const [loading, isLoading] = useState(false);
  const LoadingComponent = () => (
    <ActivityIndicator size="large" animating={true} color={Colors.purple500} />
  );

  const { taskToUpdate } = route.params;
  const taskId = taskToUpdate.id;

  const [task, setTask] = useState({
    title: taskToUpdate.title,
    desc: taskToUpdate.desc,
    check: taskToUpdate.check,
    type: "task",
  });



  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            name="arrow-left"
            size={36}
            color="white"
            style={{ paddingLeft: "7%", paddingTop: "5%" }}
            onPress={goBack}
          />
          <Text h4 h4Style={styles.title}>
            Details of Task <Emoji name="date" style={{fontSize: 24}} />
          </Text>
        </View>
      </View>
      {/* content */}
      <View style={styles.content}>
        <View style={styles.cardDetails}>
         
          <Card>
            <Card.Title style={{fontSize:22}} >{task.title.toUpperCase()} <Emoji name='v' style={{fontSize: 24}} /></Card.Title>
            <Card.Divider />
            <Text style={{ textAlign: "center", fontSize: 12,marginBottom:8 ,fontWeight:'bold'}}>
              {task.check ? 'Completed' :'Not Completed'}
            </Text>
            
            <Text style={{ textAlign: "center", fontSize: 15 }}>
              {task.desc}
            </Text>
          </Card>
        <Button style={styles.Button} mode={'contained'}  onPress={()=>{navigation.navigate("Update", { taskUpdateId:taskToUpdate.id,title: taskToUpdate.title,
    desc: taskToUpdate.desc,
    check: taskToUpdate.check, })}}>Edit <Emoji name='pencil2' style={{fontSize:12}} /></Button>
        </View>
        
       
        {loading ? (
          <View style={{ marginTop: "5%" }}>
            <LoadingComponent />
          </View>
        ) : null}
      </View>
    </View>
  );
};

//CODED BY EREN BERKAY DINC https://github.com/erenberkaydinc

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    flex: 0.15,
    backgroundColor: "#9239b8",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  content: {
    flex: 0.85,
    width: "100%",
    paddingLeft: "12%",
    paddingTop: "5%",
    paddingRight: "12%",
    
  },
  title: {
    color: "white",
    paddingLeft: "5%",
    fontWeight: "300",
    paddingTop: "5%",
  },
  cardDetails: {
    flex: 0.5,
  },
  Button:{
    marginTop:'12%'
  }
});

export default Details;
