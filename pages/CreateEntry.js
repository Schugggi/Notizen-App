import { StyleSheet, Text, View, Pressable, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import React, { useState } from 'react'
import {db} from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { setGlobalState, useGlobalState } from '../App'


export default function CreateEntry() {
    const navigation = useNavigation()
    
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")



    const SaveNote = () => {
        if(title.length >= 1 && content.length >= 1){
            WriteEntry(title, content)
            setGlobalState('key', key => key + 1)
            navigation.navigate("ToDo")
        }
    }

    WriteEntry = (title, content) => {
        db.collection("Todos").add({
            title: title,
            content: content,
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1, }}>
                <View style={{ alignItems: 'center' }}>
                    <Pressable style={{ backgroundColor: '#77cce1', alignItems: 'center', borderRadius: 5, marginTop: 10, paddingVertical: 8, width: '95%' }} onPress={SaveNote}>
                        <Text style={{ fontSize: 18, letterSpacing: 0.5, color: 'white' }}>speichern</Text>
                    </Pressable>
                </View>
                <View style={{marginLeft: 10,}}>
                    <Text style={styles.text}>Titel:</Text>
                    <TextInput style={{fontSize: 20, borderColor: 'black', borderWidth: 1, width: '95%', borderRadius: 4, padding: 5}} onChangeText={ e => setTitle(e)} value={title} placeholder="Titel"/>
                    <Text style={styles.text}>Text:</Text>
                    <TextInput multiline={true} style={{fontSize: 20, borderColor: 'black', borderWidth: 1, width: '95%', borderRadius: 4, padding: 5, paddingBottom: 500}} onChangeText={e => setContent(e)} value={content} placeholder="Inhalt"/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 20, 
        fontSize: 20, 
        marginBottom: 10
    }
})
