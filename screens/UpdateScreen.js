import { View, StyleSheet, Keyboard,KeyboardAvoidingView,Platform,TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import {Text, Card } from "react-native-elements";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Button } from "react-native-paper";
import {FormBuilder} from 'react-native-paper-form-builder';
import {set, useForm} from 'react-hook-form';
import db from "../firebase";
import Emoji from 'react-native-emoji';

import { ActivityIndicator, Colors } from "react-native-paper";

const UpdateScreen = ({ navigation, route }) => {
  const [loading, isLoading] = useState(false);
  const LoadingComponent = () => (
    <ActivityIndicator size="large" animating={true} color={Colors.purple500} />
  );

  const { taskUpdateId,title,desc,check } = route.params;
  const taskId = taskUpdateId;

  const [task, setTask] = useState({
    title: title,
    desc: desc,
    check: check,
    type: "task",
  });

  const resetForm = () => {
    setTask({
      title: "",
      desc: "",
      check: false,
      type: "task",
    });
  };




  const UpdateTask = async (task) => {
    try {
      //Loading starts
      isLoading(true);
      await db.collection("tasks").doc(taskId).update(task);
      //Loading ends
      isLoading(false);
      resetForm();
      goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    navigation.navigate('Tasks');
  };

  const {control, setFocus, handleSubmit} = useForm({
    defaultValues: {
      title: task.title,
      desc: task.desc,
      check:task.check,
      type:'task'
    },

    mode: 'onChange',
  });

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? 'padding' : "height"}
      style={{flex:1}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      
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
            Update The Task <Emoji name="hourglass" style={{fontSize: 24}} />
          </Text>
        </View>
      </View>
      {/* content */}
      <View style={styles.content}>
        

        {/* modify part */}

        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              type: 'text',
              name: 'title',

              rules: {
                required: {
                  value: true,
                  message: 'Title is required',
                },
                minLength: {
                  value: 1,
                  message: 'Description should be at least 3 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Description can be max 20 characters',
                },
              },
              textInputProps: {
                label: 'Title',
                left: <TextInput.Icon name={'format-title'} />,
              },
             
            },
            {
              type: 'text',
              name: 'desc',
              rules: {
                required: {
                  value: true,
                  message: 'Description is required',
                },
                minLength: {
                  value: 5,
                  message: 'Description should be atleast 5 characters',
                },
                maxLength: {
                  value: 100,
                  message: 'Description can be max 100 characters',
                },
              },
              textInputProps: {
                label: 'Description',
                left: <TextInput.Icon name={'text'} />,
                multiline:true,
                maxLength:100,
                numberOfLines:8
                
              },
            },
          ]}
        />

        

        
        <Button loading={loading}  onPress={handleSubmit((data)=>{
          UpdateTask(data)
        })}mode={'contained'}>
          Update <Emoji name="hourglass" style={{fontSize: 16}} />
          </Button>

        
        {loading ? (
          <View style={{ marginTop: "5%" }}>
            <LoadingComponent />
            <Text style={{textAlign:'center'}}>Updating...</Text>
          </View>
        ) : null}
      </View>
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
});

export default UpdateScreen;
