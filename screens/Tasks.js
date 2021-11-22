import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList} from "react-native";
import { CheckBox, Text, FAB, ListItem, Icon ,Card} from "react-native-elements";
import Emoji from "react-native-emoji";
import { ActivityIndicator, Colors } from 'react-native-paper';


import db from "../firebase";

const Tasks = ({ navigation }) => {
  const [task, setTask] = useState([]);

  const fetchTasks = async () => {
    const tasksCollection = await db.collection("tasks").get();
    setTask(
      tasksCollection.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
    //Loading End
    isLoading(false)
  };

  const checkBoxUpdate = async (itemId, ItemCheck) => {
    try {
      await db.collection("tasks").doc(itemId).update({ check: !ItemCheck });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (itemId) => {
    try {
      const del = await db.collection("tasks").doc(itemId).delete();
      console.log(del);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    db.collection("tasks")
      .where("type", "==", "task")
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type == "added") {
            console.log("new task :", change.doc.data());
          }
          if (change.type == "modified") {
            console.log("modifief task :", change.doc.data());
          }
          if (change.type == "removed") {
            console.log("removed task :", change.doc.data());
          }
          fetchTasks();
        });
      });
  }, []);

  const [loading, isLoading] = useState(true);

  const LoadingComponent = () => (
  
    <ActivityIndicator size='large' animating={true} color={Colors.purple500} />
    
  );

  //TODAY DATE DYNAMIC
  const today = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <View style={styles.container}>
      {/* statusbar */}
      <StatusBar style="light" />

      {/* header */}
      <View style={styles.header}>  
          {/* ROW */}
        <View style={{flexDirection:'row'}}>
          {/* COLUMN */}
        <View >

        <Text h2 h2Style={styles.title}>
          My Tasks <Emoji name='white_check_mark' style={{fontSize: 36}} />
        </Text>
         
        <Text style={styles.desc}>{`${days[today.getDay()]}`+', '+`${today.getDate()}`+' '+`${months[today.getMonth()]}`} <Emoji name='date' style={{fontSize: 16}} /></Text> 
        {/* COLUMN */}
        </View>
        <FAB
          icon={{ name: "add", color: "#9239b8" }}
          placement="right"
          
          size="large"
          color="white"
          onPress={() => navigation.navigate("Add")}
        />
        {/* ROW */}
          </View>
      {/* header */}
      </View>


      {/* lists of task */}
      <View style={styles.content}>
        {
          task.length === 0
          ?
          (
          <View>
            <Text style={{textAlign:'center'}} >Create a Task! <Emoji name="point_up_2" style={{fontSize: 36}} /></Text>
          <Text style={{textAlign:'center'}}>You can create a task by using button (+) <Emoji name="thumbsup" style={{fontSize: 36}} /></Text>
          <Text style={{textAlign:'center'}} >Here is so Empty <Emoji name="crying_cat_face" style={{fontSize: 36}} /> </Text>
           
            </View>
          )
          
          :
          (
            loading
            ? 
              <LoadingComponent />
              :
              <FlatList
            data={task}
            renderItem={({ item }) => (
             
              
              
                <ListItem
                  onPress={()=>{navigation.navigate("Details", { taskToUpdate: item })}}
                  key={item.id}
                  bottomDivider
                  > 
                  <CheckBox
                    checked={item.check}
                    onPress={() => checkBoxUpdate(item.id, item.check)}
                    />
                  
                  <ListItem.Content>
                    <ListItem.Title>{item.title.substring(0, 20)}</ListItem.Title>
                    <ListItem.Subtitle> 
                      {item.desc.substring(0, 27)+' '+'...'}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                  <Icon
                    name="delete"
                    color="red"
                    onPress={() => deleteTask(item.id)}
                    />
                </ListItem>
                   
             
            )}
          />
          )
        }

        
        
       
        
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
    flex: 0.25,
    backgroundColor: "#9239b8",
    width: "100%",
    
    justifyContent: "flex-end",
  },
  content: {
    flex: 0.75,
    width: "100%",
    justifyContent:'center'
  },
  
  title: {
    color: "white",
    marginBottom: "2.5%",
    marginLeft: "10%",
    fontWeight:'bold'
  },
  desc: {
    color: "white",
    fontWeight: "700",
    marginBottom: "15%",
    marginLeft: "10%",
  },
});
export default Tasks;
