import { View, StyleSheet, ActivityIndicator,Image,Keyboard,KeyboardAvoidingView,Platform,TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { Text} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome5';
import db from '../firebase';
import {FormBuilder} from 'react-native-paper-form-builder';
import {set, useForm} from 'react-hook-form';
import {Button,TextInput} from 'react-native-paper';
import Emoji from 'react-native-emoji';

const AddScreen = ({ navigation }) => {
  const [loading, isLoading] = useState(false);
  const LoadingComponent = () => (
    <ActivityIndicator size="large" animating={true} color={Colors.purple500} />
  );

  const createTask = async (task) => {

    try {
        //Loading starts
        isLoading(true);
        await db.collection("tasks").add(task);
        //Loading ends
         isLoading(false);
        
        
        goBack();
    } catch (error) {
        console.log(error);
    }
};

const goBack = () => {
  navigation.goBack()
}
  
  const {control, setFocus, handleSubmit} = useForm({
    defaultValues: {
      title: '',
      desc: '',
      check:false,
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
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
        <Icon name="arrow-left"
            size={36} color="white" style={{paddingLeft:'7%',paddingTop:'5%'}}  onPress={goBack} />
        <Text h4 h4Style={styles.title}>
          Add a Task
        </Text>
        </View>
      </View>

      {/* content */}
     <View style={styles.content}>
       <Image source={require('../assets/image.png')} style={{flex: 0.5,
    width: null,
    height: null,
    resizeMode: 'contain'}} />
      <Text style={{textAlign:'center',margin:10}} >You can start by adding some daily tasks!<Emoji name="coffee" style={{fontSize: 36}} /></Text>
      
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
                  value: 300,
                  message: 'Description can be max 300 characters',
                },
              },
              textInputProps: {
                label: 'Description',
                left: <TextInput.Icon name={'text'} />,
                multiline:true,
                maxLength:300,
                numberOfLines:8
                
              },
            },
          ]}
        />
       <Button
          loading={loading}
          mode={'contained'}
          onPress={handleSubmit((data)=>{
            createTask(data)
          })}> 
          Submit 
        </Button>
        

        

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
    alignItems:'flex-start',
    justifyContent:'center'
    
  },
  content: {
    flex: 0.85,
    width: "100%",
    paddingLeft:'12%',
    paddingTop:'5%',
    paddingRight:'12%',
    justifyContent:'flex-start',
    
  },
  title: {
    color: "white",
    paddingLeft:'5%',
    fontWeight:'300',
    paddingTop:'5%'

  },
});

export default AddScreen;
