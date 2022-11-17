import { Text, View, Pressable, StyleSheet, FlatList, } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { db } from '../firebase'
import { useEffect, useState } from 'react';
import { setGlobalState, useGlobalState } from '../App';



export default function ToDo() {
    const navigation = useNavigation()

    function newNote() {
        navigation.navigate("CreateEntry")
    }
    const [key] = useGlobalState("key")

    const [data, setData] = useState([])


    useEffect(() => {
        setData([])
        db.collection("Todos")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setData((current) => [
                        ...current,
                        {
                            id: doc.id,
                            title: doc.data("title").title,
                            content: doc.data("content").content,
                        }
                    ])
                })
            })
    }, [key])


    const deletePage = (itemId) => {
        navigation.navigate("DeleteEntry")
    }

    const renderItem = ({ item }) => (
        setGlobalState("itemId", item.id),
        <Pressable style={styles.container} onPress={deletePage}>
            <Text style={styles.listTitle}>{item.title}</Text>
            <Text style={styles.listContent}>{item.content}</Text>
        </Pressable>
    )


    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 0.5, alignItems: 'center', marginTop: 60, backgroundColor: '#77cce1' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>Notizen</Text>
            </View>

            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Pressable style={{ backgroundColor: '#77cce1', alignItems: 'center', borderRadius: 5, marginTop: 10, paddingVertical: 8, paddingHorizontal: 140, }} onPress={newNote}>
                    <Text style={{ fontSize: 18, letterSpacing: 0.5, color: 'white' }}>Neue Notiz</Text>
                </Pressable>
            </View>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listTitle: {
        alignSelf: 'left',
        marginLeft: 20,
        fontSize: 30,
        margin: 5

    },
    listContent: {
        marginLeft: 20,
        alignSelf: 'left',
        fontSize: 20,
    },
    container: {
        paddingTop: 10,
        paddingBottom: 10,
        width: '90%',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 10,
    }
})