import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, Text, View, Pressable, StyleSheet, FlatList, } from 'react-native';
import { db } from '../firebase'
import { setGlobalState, useGlobalState } from '../App';


const DeleteEntry = () => {
    const navigation = useNavigation()


    const [itemId] = useGlobalState("itemId")
    const removeEntry = () => {
        db.collection("Todos").doc(itemId).delete().then(() => {
            setGlobalState("key", key => key + 1)
            navigation.navigate("ToDo")
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    return (
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Pressable style={{ backgroundColor: '#77cce1', alignItems: 'center', borderRadius: 5, marginTop: 10, paddingVertical: 8, paddingHorizontal: 140, }} onPress={removeEntry}>
                <Text style={{ fontSize: 18, letterSpacing: 0.5, color: 'white' }}>Löschen</Text>
            </Pressable>
        </View>
    )
}

export default DeleteEntry